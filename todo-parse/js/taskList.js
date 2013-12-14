/*
    TaskList collection

    This defines a new Parse collection for Task models.
    Use Parse.Collection.extend() to define a new collection,
    and specify the model type as a property of the object
    you pass for the first parameter. This returns a constructor
    function that you can use with the new keyword:
        var tasks = new TaskList();

    Parse collections have lots of built-in methods. See their
    documentation at https://parse.com/docs/js_guide#collections
*/

var TaskList = Parse.Collection.extend({
    model: Task
});
