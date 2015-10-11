var Myo = require('myo');
var myMyo = Myo.create();
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var firstGesture = true;
var numbers = ["+17143069521","+15624587737","+15598022442","+15105658237","+19512640510"];
var number = "";
myMyo.on('fist', function(edge){
  myMyo.timer(edge, 500, function(){
    if(firstGesture == true)
    {
      number = numbers[0];
      firstGesture = false;
    }
    else
    {
      firstGesture = true;
      var req = new XMLHttpRequest();
      var message = "I'm on my way. Be there soon."
      req.open('GET', 'http://f14c04eb.ngrok.io/?message=' + message + '&number=' + number, true);
      req.send(null);
    }
  })
});

myMyo.on('fingers_spread', function(edge){
  //Edge is true if it's the start of the pose, false if it's the end of the pose
  myMyo.timer(edge, 500, function(){
    if(firstGesture == true)
    {
      number = numbers[1];
      firstGesture = false;
    }
    else
    {
      firstGesture = true;
      var req = new XMLHttpRequest();
      var message = "Sorry I can't come to the phone right now. I'm driving."
      req.open('GET', 'http://f14c04eb.ngrok.io/?message=' + message + '&number=' + number, true);
      req.send(null);
    }
  })
});

myMyo.on('wave_in', function(edge){
  //Edge is true if it's the start of the pose, false if it's the end of the pose
  myMyo.timer(edge, 500, function(){
    if(firstGesture == true)
    {
      number = numbers[2];
      firstGesture = false;
    }
    else
    {
      firstGesture = true;
      var req = new XMLHttpRequest();
      var message = "Sorry I'm busy. I'll call you back."
      req.open('GET', 'http://f14c04eb.ngrok.io/?message=' + message + '&number=' + number, true);
      req.send(null);
    }
  })
});

myMyo.on('wave_out', function(edge){
  //Edge is true if it's the start of the pose, false if it's the end of the pose
  myMyo.timer(edge, 500, function(){
    if(firstGesture == true)
    {
      number = numbers[3];
      firstGesture = false;
    }
    else
    {
      firstGesture = true;
      var req = new XMLHttpRequest();
      var message = "Just got in the car. Talk to you later."
      req.open('GET', 'http://f14c04eb.ngrok.io/?message=' + message + '&number=' + number, true);
      req.send(null);
    }
  })
});

myMyo.on('thumb_to_pinky', function(edge){
  //Edge is true if it's the start of the pose, false if it's the end of the pose
  myMyo.timer(edge, 500, function(){
    if(firstGesture == true)
    {
      number = numbers[4];
      firstGesture = false;
    }
    else
    {
      firstGesture = true;
      var req = new XMLHttpRequest();
      var message = "Gotta go. I'm on the road."
      req.open('GET', 'http://f14c04eb.ngrok.io/?message=' + message + '&number=' + number, true);
      req.send(null);
    }
  })
});