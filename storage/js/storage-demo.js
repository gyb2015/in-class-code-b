/* storage-demo.js
    script for local storage demo
*/

const BG_COLOR_KEY = 'bgcolor';

//on doc ready
$(function(){

<<<<<<< HEAD
	if(Modernizr.localstorage) {
=======
	if (Modernizr.localstorage) {
>>>>>>> b8b6606fc69e2ba4946bac266e5b2f062137c923
		var bgColor = localStorage.getItem(BG_COLOR_KEY);
		if (bgColor) {
			$('body').css('background-color', bgColor);
		}
	}
<<<<<<< HEAD
	$('.save-bg-color').click(function(){
		if (Modernizr.localstorage) {
			var bgColor = $('.bg-color-input').val(); 
=======

	$('.save-bg-color').click(function(){
		if (Modernizr.localstorage) {
			var bgColor = $('.bg-color-input').val();
>>>>>>> b8b6606fc69e2ba4946bac266e5b2f062137c923
			localStorage.setItem(BG_COLOR_KEY, bgColor);
			$('body').css('background-color', bgColor);
		}
	});

	$('.clear-bg-color').click(function(){
<<<<<<< HEAD
		if(Modernizr.localstorage) {
			localStorage.removeItem(BG_COLOR_KEY);
			window.location.reload();
		}
	})
=======
		if (Modernizr.localstorage) {
			localStorage.removeItem(BG_COLOR_KEY);
			window.location.reload();
		}
	});
>>>>>>> b8b6606fc69e2ba4946bac266e5b2f062137c923
});