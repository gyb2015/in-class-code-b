// addOutput()
// appends a new line to our output div containing
// whatever was passed as message
//
function addOutput(message) {
    var p = $j(document.createElement('p'));
    p.html(message);
    $j('.output').append(p);
}

// describePerson()
// appends a new output message that describes a 
// given person, or any object that has methods: 
// - introduce()
// - isAlive()
//
function describePerson(person) {
    addOutput(person.introduce() + ' I am ' + (person.isAlive() ? 'alive' : 'dead') + '.');
} //describePerson()

// wrapSuper()
// can be used to wrap a super-class function when
// overriding it when using the prototypal OOP style
// usage:
//      var superFn = mysubclass.method;
//      mysubclass.method = function() {
//          var superRet = superFn();
//          ...rest of override code...
//      }
//
function wrapSuper(superFn, context) {
    return function() {
        return superFn.apply(context, arguments);
    }    
}
