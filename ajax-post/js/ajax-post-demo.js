/* ajax-post-demo.js 
    JavaScript file for AJAX post demo

    URL for posting: https://courses.washington.edu/info343/ajax/sayhello/
*/

//htmlEncode()
// encodes the passed string of HTML so that it can
// be safely added to a page without being interpreted
// as HTML markup (with potentially harmful effects)
// source: http://stackoverflow.com/questions/1219860/html-encoding-in-javascript-jquery
// parameters:
//  - s (string) value to html-encode
//  - return value (string) encoded HTML value
//
function htmlEncode(s) {
    //create an in-memory div element
    var div = document.createElement('div');
    //append the string to encode as a text node
    div.appendChild(document.createTextNode(s));
    //return the innerHTML property (which will be encoded)
    return div.innerHTML;
} //htmlEncode()

// function to display any ajax errors we get
$(document).ajaxError(function(event, jqXHR, err){
    var msg = 'Problem with AJAX Request';
    if (jqXHR.responseJSON)
        msg += '\n' + jqXHR.responseJSON.error;
    else
        msg += '\n' + jqXHR.statusText;
    alert(msg);
});

$(function(){
    $('.send-server').click(function(){
        var postData = {};
        postData.first = $('.first').val();
        postData.last = $('.last').val();

        var postString = JSON.stringify(postData);

        $.post('https://courses.washington.edu/info343/ajax/sayhello/', postString, function(data){
            $('.response-message').html(htmlEncode(data.message));
        });
    });
});