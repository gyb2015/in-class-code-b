
//various utility functions

function htmlEncode(s) {
    //create an in-memory div element
    var div = document.createElement('div');
    //append the string to encode as a text node
    div.appendChild(document.createTextNode(s));
    //return the innerHTML property (which will be encoded)
    return div.innerHTML;
} //htmlEncode()

function apply(source, target) {
    for (prop in source) {
        target[prop] = source[prop];
    }
} //apply()


function wrapSuper(superFn, context) {
    return function() {
        return superFn.apply(context, arguments);
    }    
} //wrapSuper()

