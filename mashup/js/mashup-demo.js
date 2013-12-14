/* mashup-demo.js
    JavaScript file for our mashups demo

    URL for Seattle 911 Fire Dispatches:  http://data.seattle.gov/resource/kzjm-xkqj.json

    UW Lat/Lng is 47.6559/-122.3031
*/

$(function(){
	$.getJSON('http://data.seattle.gov/resource/kzjm-xkqj.json', plotIncidents);

}); //on doc ready

function plotIncidents(incidents) {
	var idx;		//loop counter
	var incident;	//current incident
	var map;		//Google map
	var marker;		//marker being added to map

	map = new google.maps.Map($('.map-container')[0], {
		center: new google.maps.LatLng(47.6559, -122.3031),
		zoom: 15,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		streetViewControl: false
	});

	for (idx = 0; idx < incidents.length; ++idx) {
		incident = incidents[idx];

		if (incident.latitude && incident.longitude) {
			marker = new google.maps.Marker({
				map: map,
				position: new google.maps.LatLng(incident.latitude, incident.longitude),
				title: incident.type
			});
		} // if has lat/lng
	} //for each incident
} //plotIncidents()
