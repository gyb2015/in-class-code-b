//demo.js
/*
This is a comment block
and another line 
*/

function updateClock() {
	var clockElem = document.getElementById('clock');
	clockElem.innerHTML = new Date().toLocaleTimeString();
}

window.setInterval(updateClock, 1000);
