/*
---
description: A modification of Class that allows ruby like extention syntax

license: MIT-style

authors:
- Arieh Glazer

requires:
- core/1.2.4 : [Core,Class]

provides: [Class.def]

...
*/
/*!
Copyright (c) 2010 Arieh Glazer

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE 
*/
(function(window,undef){
    var oClass = Class //used for monkey patching the Class constructor
        , class_name = false; //contain the class to be created with Class.def
    
    /* Monkey Patching */
    Class = function(params){ 
        var init = false
            , F; 
        
        params = params || {};
        
        if (params.initialize){
            init = params.initialize;
        }
       
       
       params.initialize = function(){ //this is where the magic happens
            var args = arguments
                , temp_args;
            
            if (class_name){ // if Class.def is being used
                
                temp_args = {Extends:F};
                $extend(temp_args,args[0] || {}); //this is so the Extend comes before the rest of the parameters

                window[class_name] = new Class(temp_args);

                class_name = false;  

                return window[class_name];
            }           
            
            if (init) init.apply(this,args); //call original initializer OR
            else if (this.parent) this.parent.apply(this,args); //call parent initializer 
        };
        
        F= new oClass(params);
        return F;
    }.extend(oClass);
    
    
   Class.def = function(name,args){
        if (args){ //if args are present simply create a new Class
            window[name] = new Class(args);
            return window[name];
        }
        //assume using << syntax
        class_name = name; //store the Class name for the initializer to construct a new Class
   };
   
})(this);