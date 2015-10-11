var config = require('./config.sample.json')
var url = require('url');

var TwilioAccountSID = config["TWILIO_ACCOUNT_SID"]
var TwilioAuthToken = config["TWILIO_TOKEN"]
var number = config["TWILIO_NUMBER"]

var client = require('twilio')(TwilioAccountSID, TwilioAuthToken);

var expressPort = config["PORT"];
var express = require('express');
var app = express();


// uber.products.list({ latitude: 43.472547, longitude: -80.539878 }, function (err, res) {
//   if (err) console.error(err);
//   else console.log(res);
// });
app.set('port', process.env.PORT || 8001);

function sendMessage(toNum, bodyText){ 

	console.log("Sending to", toNum, ":", bodyText)

	client.messages.create({
		body: bodyText,
		to: toNum,
		from: number,
		}, function(err, message) {
			if(err){
				console.log(err)
			}
			else{
				// console.log(message)
			}
	});
}

app.get('/', function (req, res) {
	var url_parts = url.parse(req.url, true);
	var message = url_parts.query.message;
	var number = url_parts.query.number;

    sendMessage(number, message);
	
});


var server = app.listen(app.get('port'), function() {
  console.log('Our app is running on port %d', server.address().port);
});