/*
    TaskView

    Prototypal-style factory function for creating a new template
    view for tasks. This adds an afterRender() implementation that
    registers a click event handler for the toggle-done check boxes.
    Our template adds an attribute to each checkbox called data-model-id
    that has a value equal to the current Task model object's id.
    We use that to find the related task in the task list and 
    toggle its done state.
*/

function createTaskView(config) {
    var view = createTemplateView(config);
    view.afterRender = function() {
        var self = this;
        this.container.find('.toggle-done').click(function(){
            var id = $(this).attr('data-model-id');
            self.model.get(id).toggleDone();
        });
    }
}