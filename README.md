Class.def
========
This is an extendtion to Class that allows extending Classes in a ruby like syntax. This implementation was inspired by the very cool Def.js lib.


## How to use

### Simple Use

To create a new Class from scratch, we can use both the default Class construction method, or like this:

    #JS
    new Class.def("Preson") << new Class({
        initialize : function(name){
            this.name = name;
            console.log('My Name Is '+name+' And I Am '+this.power+' strong!');
        }
       ,power : 1
    });

To extend a Class (this can be done with any Class):

    #JS
    new Class.def('Ninja') << new Person({
        power :20
    });
    
    new Person('Bob'); //My Name is Bob And I Am 1 strong!
    new Ninja('Lee'); //My Name Is Lee and i am 20 strong!
    
*NOTE: It is very important that you use the `new` operator on both, or the execution order will get break*

This should work on any instance of Class, no matter how it was defiened.

## Limitations:
  1. You must make sure you use the new operator for both the `Class.def` and the inherited Class.
  2. Make sure you never call Class.def without using the full syntax (`<< new Class`). Doing so might make the following Class instantiation fail.
  3. I have obviosly not tested this too much, so use with caution.

## Notes On version 1.1
  1. You can now only create Classes using the << operator (well, actually, any numeric operator will do). 
  2. You can no longer create Classes via passing a second argument. This is to make sure the syntax is used correctly.
 

    