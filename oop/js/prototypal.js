/*
    prototypal.js

    Demo of how to use JavaScript's native prototypal OOP style.
    In JavaScript, every object instance has a 'prototype', which
    is another object instance that it inherits from. Fully embracing
    this reality means that you don't define classes that inherit
    from each other, you create object instances that inherit from
    other object instances. Instead of using 'new' with a constructor
    function, you create a factory function that is called in the 
    normal way. Factory functions can alter an object once created
    to override methods or set default values.
*/

function createPerson(name, alive) {
    //default alive to true if not provided
    if (undefined == alive)
        alive = true;

    //return a new object with methods that
    //utilize the function parameters, which
    //will remain totally private to this object
    //(code outside this function can't change them)
    return {
        introduce: function() {
            return 'Hello my name is ' + name + '.';
        },

        isAlive: function() {
            return alive;
        }        
    }
}

function createInigo(alive) {
    var i = createPerson('Inigo Montoya', alive);
    i.country = 'Spain';

    //override introduce()
    var superIntro = wrapSuper(i.introduce, i);
    i.introduce = function() {
        return superIntro() + ' You killed my father. Prepare to die!';
    };

    return i;
}


var andre = createPerson('Andre the Giant', false);
var inigo = createInigo(true);
var john = createPerson('John');

andre.name = 'Something else';

describePerson(andre);
describePerson(inigo);
describePerson(john);
