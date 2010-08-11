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
    var old = Class, temp, defing = false;
    
    Class = function(params){
        var init = false, t_valueOf = null, F, $this = this;
        params = params || {};
        if (params.initialize){
            init = params.initialize;
        }
       
       params.initialize = function(){
            var args = arguments, t_args;
            if (defing){
                t_args = {Extends:F}
                Object.extend(t_args,args[0] || {});
                window[temp] = new Class(t_args);
                defing = false;  
                return;
            }           
            
            if (init) init.apply(this,args);
            else if (this.parent) this.parent.apply(this,args);
        };
        
        F= new old(params);
        return F;
    }.extend(old);
    
    
   Class.def = function(name,args){
        if (args){
            return window[name] = new Class(args);
        }
        defing = true;
        temp = name;
   };
})(this);