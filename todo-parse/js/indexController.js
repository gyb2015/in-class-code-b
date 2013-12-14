
"use strict;"

//doc ready
$(function(){

    var tasksContainer = $('.tasks-container');

    //get the current Parse user
    var currentUser = Parse.User.current();

    //create a new TaskList (Parse collection)
    //and initialize it with a query that will get the 
    //list of tasks for the current user that are not already
    //marked as done
    var tasks = new TaskList();
    tasks.query = new Parse.Query(Task);
    tasks.query.equalTo('userid', currentUser.id);
    tasks.query.equalTo('done', false);

    //create a TaskView for the TaskList model
    //note that the 'template' config property here
    //is the HTML text of the template, not a jQuery
    //object for the template elements
    //that's because Mustache just wants the text
    var taskView = createTaskView({
        model: tasks,
        template: $('#task-item-template').html(),
        container: tasksContainer
    });

    //fetch the tasks for the current user
    //this is done asynchronously, and the model
    //will trigger an event when its done fetching
    //causing the TaskView to automatically render
    //unfortunately, Parse collections don't yet
    //trigger the 'request' event at the start of the
    //fetch, so we have to provide the visual feedback
    //here by adding the working class and removing
    //it again in the success handler
    tasksContainer.addClass('working');
    tasks.fetch({
        success: function() {
            tasksContainer.removeClass('working');
        },
        error: function(collection, error) {
            $('.error-message').html(error.description).fadeIn(300);
        }
    });

    //create the new task view, passing new task model
    //for this, we can just use our standard FormView
    var newTaskView = createFormView({
        model: new Task(),
        form: $('.new-task-form')
    });

    //when the new task view triggers its submit
    //event, save the new task to the Parse server
    //and when that completes, add it to the TaskList
    newTaskView.on('submit', function(){
        var newTask = newTaskView.model;

        //set the userid attribute to the current user's ID
        newTask.set('userid', currentUser.id);

        //set an ACL on this object so that only the current
        //user is allowed to read or modify it
        newTask.setACL(new Parse.ACL(currentUser));

        //save it
        var button = $(this);
        button.addClass('working');
        newTask.save({
            success: function() {
                //add to collection
                tasks.add(newTask);

                //reset view to a new model
                newTaskView.setModel(new Task());

                button.removeClass('working');
            }, //success()
            error: function(object, error) {
                $('.error-message').html(error.description).fadeIn(300);
            }
        });
    });

    //removing the done tasks now just requires
    //a refresh of the TaskList, as it will automatically
    //filter out tasks already marked as done
    $('.btn-remove-done').click(function(){
        tasksContainer.addClass('working');
        tasks.fetch({
            success: function(){
                tasksContainer.removeClass('working');
            }
        });
    });


    //handle the signout button
    $('.btn-signout').click(function(){
        Parse.User.logOut();
        window.location = 'signin.html';
    });

}); //doc ready()