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
        , class_name = false //contain the class to be created with Class.def
        , temp_class;
    
    /* Monkey Patching */
    Class = function(params){ 
        var init = false
            , temp_valueOf
            , F; 
        
        params = params || {};
        
        if (params.initialize){
            init = params.initialize;
        }
        if (params.valueOf) temp_valueOf = params.valueOf;
       
       params.initialize = function(){ //this is where the magic happens
            var args = arguments
                , temp_args;

                if (class_name){ // if Class.def is being used
                return {                
                    valueOf : function(){
                        var cls;
                        temp_args = {Extends:F};
                        $extend(temp_args,args[0] || {}); //this is so the Extend comes before the rest of the parameters

                        cls = window[class_name] = new Class(temp_args);
                        class_name = null;
                        return cls;
                    }                
                };           
            }else{ // normal Class instantiation
                if (init) init.apply(this,args); //call original initializer OR
                else if (this.parent) this.parent.apply(this,args); //call parent initializer 
            }           
        };
        
        temp_class = F= new oClass(params);
        
        F.valueOf = function(){ //used when base Classes are created
            if (class_name && temp_class){
                window[class_name] = temp_class; 
                temp_class = null;
                class_name = null;
            }else if (temp_valueOf) return temp_valueOf().bind(F); 
        }
        return F;
    }.extend(oClass);
    
    Class
    
   Class.def = function(name){
        class_name = name; //store the Class name for the initializer to construct a new Class
   };
   
})(this);