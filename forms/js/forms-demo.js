// forms-demo.js
// script for in-class HTML forms demo
//

//doc ready function
$(function(){
	var option;
	var idx;
	var state;
	var select = $('select[name="state"]');
	for(idx = 0; idx < states.length; ++idx) {
		state = states[idx];
		option = $(document.createElement('option'));
		option.attr('value', state.abbreviation);
		option.html(state.name);
		select.append(option);
	}

	$('.signup-form').submit(function(){

		var form = $(this);
		var select = form.find('select[name="state"]');
		var value = select.val();
		var valid = (null != value && value.length > 0);
		if(!valid) {
			alert("Please select a state!");			
		}
		return valid;
	});
});
