/*
    mixin.js

    Demo of how to use a mix-in (aka capability) OOP style.

    In JavaSript, each object instance can have a prototype
    object instance, but it can have only one of those at a
    time. Sometimes you want to add multiple capabilities to
    a given object instance at the same time. Fortunately,
    JavaScript makes it rather easy to simply add new properties
    and methods to an existing object, so you can write new
    augumentation functions that add a particular capability
    to an existing object.

    In our prototypal example, we were still trying to model
    a type hierarchy, but really what we are doing is adding
    two capabilities to our objects: the ability to have a 
    name and produce an introduction message; and the ability 
    to track an alive/dead state and report that. We can
    actually add these capabilities to any object for which
    it might make sense, wihtout having to setup an inheritance
    relationship.

    This style is especially effective for mix-in functionality
    such as the ability to raise events to a set of listener
    functions that other objects can register. An object that
    might want to do that doesn't need to inherit from an
    EventSource class--instead, we provide a function that
    adds this capability to any kind of object passed.
*/

function makeNamed(obj, name) {
    //add introduce() method
    //note that 'name' stays private
    //(code outside this function can't change it)
    obj.introduce = function() {
        return 'Hello my name is ' + name + '.';
    }

    return obj;
}

function makeVital(obj, alive) {
    //add isAlive() and kill() methods
    //note that 'alive' stays private
    //(code outside this function can't change it)
    obj.isAlive = function() {
        return alive;
    };

    obj.kill = function() {
        alive = false;
    };

    return obj;
}

function makeEventSource(obj) {
    var listeners = {};

    obj.on = function(eventName, callback) {
        var eventListeners = listeners[eventName];
        if (!eventListeners) {
            eventListeners = [];
            listeners[eventName] = eventListeners;
        }

        eventListeners.push(callback);
    };

    obj.trigger = function(eventName) {
        var idx;
        var eventListeners = listeners[eventName];
        if (eventListeners) {
            for (idx = 0; idx < eventListeners.length; ++idx) {
                eventListeners[idx]();
            }
        }
    }; //trigger

    return obj;
}

var es = {
    name: '',
    setName: function(name) {
        this.name = name;
        this.trigger('change');
    }
};

es = makeEventSource(es);
es.on('change', function(){
    addOutput('change event fired!');
});

es.setName('foo');

var andre = {
    species: 'human'
};

andre = makeNamed(andre, 'Andre the Giant');
andre = makeVital(andre, false);
describePerson(andre);

var billy = {
    species: 'goat'
};

billy = makeNamed(billy, 'Billy the Goat');
billy = makeVital(billy, true);
describePerson(billy);

billy.kill();
describePerson(billy);
