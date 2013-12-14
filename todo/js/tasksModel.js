/*
    TasksModel

    Model object representing a list of tasks
*/

var Tasks = {
	getTasks: function() {
		return this.tasks;
	},

	addTask: function(task) {
		this.tasks.push(task);
		this.trigger('change');
	},

	setDone: function(task, done) {
		if (task) {
			task.done = done;
			this.trigger('change');
		}
	},

	removeDone: function() {
		var undoneTasks = [];
		var idx;	//looping variable
		var task;	//current task
		for (idx = 0; idx < this.tasks.length; ++idx) {
			task = this.tasks[idx];
			if (!task.done)
				undoneTasks.push(task);
		}
		this.tasks = undoneTasks;
		this.trigger('change');
	}
};

function createTasks(config) {
	var tasksModel = Object.create(Tasks);
	apply(config, tasksModel);
	tasksModel = makeEventSource(tasksModel);
	return tasksModel;
}
