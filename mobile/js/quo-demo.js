function log(message) {
    $$('.log').append('<p>' + message + '</p>');
}

$$('.clear').tap(function(){
    $$('.log').empty();
});

$$('body').tap(function(){
    log('tap');
});

$$('body').hold(function(){
    log('hold');
});

$$('body').swipeLeft(function(){
    log('swipeLeft');
});

$$('body').swipeRight(function(){
    log('swipeRight');
});

$$('body').swipeUp(function(){
    log('swipeUp');
});

$$('body').swipeDown(function(){
    log('swipeDown');
});

$$('body').pinchIn(function(){
    log('pinchIn');
});

$$('body').pinchOut(function(){
    log('pinchOut');
});

$$('body').rotateRight(function(){
    log('rotateRight');
});

$$('body').rotateLeft(function(){
    log('rotateLeft');
});
