/**
 *  Node Muse
 *  Web Gui example
 *
 *  This example starts a http server at port 8080
 *  ---------------------------------------------------
 *  @package    node-muse
 *  @author     Jimmy Aupperlee <j.aup.gt@gmail.com>
 *  @license    GPLv3
 *  @version    1.0.0
 *  @since      File available since Release 0.1.0
 */

'use strict';

/*
 |--------------------------------------------------------------------------
 | Required modules
 |--------------------------------------------------------------------------
 */
var checker = false;
var initial;
var fin;
var acc;
var express = require('express'),
    path = require('path');

/*
 |--------------------------------------------------------------------------
 | The 'constructor'
 |--------------------------------------------------------------------------
 |
 | Instantiate some variables and use the options object to merge the
 | default options above with the parameters in the 'constructor'
 |
 */
var webClass = function(muse) {

    // Set the muse as a 'class' variable
    this.app = null;
    this.io = null;
    this.muse = muse;
    this.museDataPathsRequested = {};
};

/*
 |--------------------------------------------------------------------------
 | Initialize
 |--------------------------------------------------------------------------
 |
 | Start the html and socket server
 |
 */

webClass.prototype.init = function(config) {

    var self = this;

    // Insert the server objects into the 'class' variables
    this.app = express();
    this.server  = require('http').Server(this.app);
    this.io   = require('socket.io')(this.server);

    // Set the client path
    this.app.use(express.static( path.resolve( __dirname + '/../client' ) ) );

    // this.app.get('/', function (req, res) {
    //     res.sendfile( 'index.html');
    // });

    this.io.on('connection', function (socket) {

        // Let the client know, he's welcome
        socket.emit('connected', {
            "connected": self.muse.connected,
            "config": self.muse.config
        });

        self.museDataPathsRequested[socket.id] = { 
            "socket" : socket,
            "paths" : {}
        }

        // Send an array containing all paths the client wishes to receive
        socket.on('setPaths', function(data){
            self.refreshListeners(socket.id, data);
        });

        socket.on('disconnect', function(){
            self.refreshListeners(socket.id, []);
        });
    });

    // To keep it clean, it's in a seperate function
    this.setDefaultListeners();

    // Start the server, it's okay
    this.server.listen(config.port);
    console.log("HTTP server started and available on port: " + config.port);
};

/*
 |--------------------------------------------------------------------------
 | Set default listeners
 |-------------------------------------------------------------------------
 */

webClass.prototype.setDefaultListeners = function() {

    var self = this;
    var Plotly = require('plotly')('fc1698','tmqhgf3m7q');
    var Signal = require('random-signal')

    var data = [
      {
        'x':[],
        'y':[],
        mode: "lines+markers", 
        marker: {color: "rgba(31, 119, 180, 0.96)"}, 
        line: {color: "rgba(31, 119, 180, 0.31)"}, 
        stream: {
          token: "taxck1xfky", 
          maxpoints: 100
        }, 
        type: "scatter"
      }
    ];
    var graphOptions = {
        "filename": "streamSimpleSensor"
      , "fileopt": "overwrite"
      , "layout": {
          "title": "Accelerometer Readings"
      }
      , "world_readable": true
    }
    Plotly.plot(data, graphOptions, function (err, msg) {
        console.log(msg);
        var plotlystream = Plotly.stream("taxck1xfky", function () {})
        var signalstream = Signal({tdelta: 100}) //


        plotlystream.on("error", function (err) {
            signalstream.destroy()
        })

        // Okay - stream to our plot!
        signalstream.pipe(plotlystream)
    });



    this.muse.on('connected', function(){
        self.io.emit('muse_connected', {
            "connected": self.muse.connected,
            "config": self.muse.config
        });
    });

    this.muse.on('uncertain', function(){
        self.io.emit('muse_uncertain');
    })

    this.muse.on('disconnected', function(){
        self.io.emit('muse_disconnected');
    });

    this.muse.on('/muse/acc', function(oscData){
        var ts = new Date();
        var error;
        // try {
            if (checker == false) {
                initial = oscData.values[2]; 
                checker = true;
                return;
            }
            if (checker == true) {
                fin = oscData.values[2]; 
                var delta = Math.abs(fin - initial);
                acc = 2*delta/(0.25^2);
                checker = false;
            }

            

            // var now = new Date();
            // var delta = now - ts;
            // if (delta < 1000) return;
            // ts = now;

            if (acc > 50){
                var figlet = require('figlet');
 
                figlet('WAKE UP!!', function(err, data) {
                    if (err) {
                        console.log('Something went wrong...');
                        console.dir(err);
                        return;
                    }
                    console.log(data)
                });
            }
            console.log(acc.toPrecision(3));
        // } catch (_error) {
        //     error = _error;
        //     return console.log("invalid OSC packet", error.message);
        // }
        // console.log("listening with acc");
});
};

/*
 |--------------------------------------------------------------------------
 | Refresh listeners
 |-------------------------------------------------------------------------
 |
 | We simply remove all the listeners currently available and add the new
 | ones as requested
 |
 */

 webClass.prototype.refreshListeners = function(id, arr) {

    var self = this;

    // Loop through to delete
    if(self.museDataPathsRequested[id]) {
        for(var x in self.museDataPathsRequested[id]["paths"]) {
            self.muse.removeListener(x, self.museDataPathsRequested[id]["paths"][x]);
        }
    }

    // If it got disconnected or doesn't want data anymore, then we can
    // stop here and remove the connection
    if(arr.length == 0) {
        delete self.museDataPathsRequested[id];
        return false;
    }

    self.museDataPathsRequested[id]["paths"] = {};

    // Now add the new ones
    for(var path in arr) {
        self.museDataPathsRequested[id]["paths"][arr[path]] = (function() {
            return function(object) {
                self.museDataPathsRequested[id]["socket"].emit(object.path, object);
            }
        })();
        // Set the listener in the muse class
        self.muse.on(arr[path], self.museDataPathsRequested[id]["paths"][arr[path]]);
    }
 };

// Export the module!
module.exports = webClass;