var Myo = require('myo');
var myMyo = Myo.create();
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
myMyo.on('fist', function(edge){
  myMyo.timer(edge, 500, function(){
    console.log('Gesture: Fist');
  })
});

myMyo.on('fingers_spread', function(edge){
  //Edge is true if it's the start of the pose, false if it's the end of the pose
  myMyo.timer(edge, 500, function(){
    var req = new XMLHttpRequest();
    var message = "Fingers Spread"
    req.open('GET', 'http://ebb489b9.ngrok.io/?message=' + message, true);
    req.send(null);
  })
});

myMyo.on('wave_in', function(edge){
  //Edge is true if it's the start of the pose, false if it's the end of the pose
  myMyo.timer(edge, 500, function(){
    var req = new XMLHttpRequest();
    var message = "Wave In"
    req.open('GET', 'http://ebb489b9.ngrok.io/?message=' + message, true);
    req.send(null);
  })
});

myMyo.on('wave_out', function(edge){
  //Edge is true if it's the start of the pose, false if it's the end of the pose
  myMyo.timer(edge, 500, function(){
    var req = new XMLHttpRequest();
    var message = "Wave Out"
    req.open('GET', 'http://ebb489b9.ngrok.io/?message=' + message, true);
    req.send(null);
  })
});

myMyo.on('thumb_to_pinky', function(edge){
  //Edge is true if it's the start of the pose, false if it's the end of the pose
  myMyo.timer(edge, 500, function(){
    var req = new XMLHttpRequest();
    var message = "Double Tap"
    req.open('GET', 'http://ebb489b9.ngrok.io/?message=' + message, true);
    req.send(null);
  })
});
