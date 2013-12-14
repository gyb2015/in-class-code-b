/*
    classical.js

    Demo of how to implement a classical-ish OOP style in JavaScript.
    
    Classical OOP is like Java OOP--you define a series of classes,
    which represent new types. Each class extends some other base class,
    and the extended class has an "is-a" relationship with the base class.
    
    JavaScript doesn't really have types, nor does it really have classes
    in the classical sense, so the best you can really do is /approximate/
    classical OOP in JavaScript through some clever manipulations of function
    prototypes. There are several JavaScript libraries and frameworks that
    handle this trickery for you, and the one I will show you here is
    Prototype.js (http://prototypejs.org/learn/class-inheritance)
*/


var Person = Class.create({
    initialize: function(name, alive) {
        if (undefined == alive)
            alive = true;

        this.name = name;
        this.alive = alive;
    },

    introduce: function() {
        return 'Hello my name is ' + this.name + '.';
    },

    isAlive: function() {
        return this.alive;
    }
});

var InigoMontoya = Class.create(Person, {
    initialize: function($super, name, alive) {
        $super('Inigo Montonya', alive);
    },

    introduce: function($super) {
        return $super() + ' You killed my father. Prepare to die!';
    }
});


var andre = new Person('Andre the Giant', false);
var inigo = new InigoMontoya();



describePerson(andre);
describePerson(inigo);

addOutput('inigo instaceof Person = ' + (inigo instanceof Person));

