/*
    Tasks Controller

    Controller that stiches together the TasksModel,
    TasksListView, and NewTaskView into a working application
*/

$(function(){
	var tasks = createTasks({
		tasks: [{title: 'My First Task', done: false}]
	});

	var tasksView = createTasksListView({
		model: tasks,
		template: $('.tasks-template'),
		container: $('.tasks-container')
	});

	var newTaskView = createNewTaskView({
		model: tasks,
		form: $('.new-task-form')
	});

	$('.btn-remove-done').click(function(){
		tasks.removeDone();
	});

});