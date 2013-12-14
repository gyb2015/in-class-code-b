/*
    Task model class

    This defines the model class for a Task, which has an extra
    method called toggleDone(), which toggles the 'done' attribute.
    
    Use Parse.Obect.extend() to define a new model class, passing
    the class name as the first parameter, and an obect with 
    any additional properties or methods as the second parameter.
    This returns a constructor function that you can use with the
    new keyword, like so:
        var t = new Task();

    Parse models then store a set of 'attributes', which you can 
    set using the model's set() method, like so:
        t.set('title', 'Get Milk');
        t.set('done', false);

    There's also a corresponding get() method to get the current
    value of an attribute:
        var title = t.get('title');

    This get()/set() approach is used so that Parse knows when
    you've change a property of the model. That way it can trigger
    change events, and track the object's dirty state for persistance.
*/
var Task = Parse.Object.extend('Task', {
    defaults: function() {
        return {
            title: '',
            done: false
        };
    },

    toggleDone: function() {
        this.save({done: !(this.get('done'))});
    }
});
