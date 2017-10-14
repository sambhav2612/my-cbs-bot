// we need restify and botbuilder from the start
// these packages have classes inside them
"use strict";
var restify = require("restify");
var builder = require("botbuilder");

// now, create a server and listen on any port from 1-65535, which hasn't been hold by any other application
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 4567, function() {
	console.log('%s listening to %s', server.name, server.url		);
});

// create a ChatConnector
var connector = new builder.ChatConnector();

// create a UniversalBot
var bot = new builder.UniversalBot();

// *************** receive part ***************
// get message and send to ChatConnector
// listening to root address, sends it to rest connector
server.post("/", connector.listen());

// bot will read the message from server and respond accordingly
bot.dialog("/", function(session) {
	var msg = session.message.text.toLowerCase();	// get the message stored in this particular session

	if (msg.indexOf("sscbs") > -1) {	// indexOf matches the string after searching it in the complete string and returns 0 if it was found else -1
		if (msg.indexOf("address") > -1) {
			session.send("SSCBS is located at PSP Area IV, Dr. KN Katju Marg, Sector-16, Rohini, Delhi-110089");
		} else {
			session.send("I did not understood your query :(");
		}							
	} else {
		session.send("I did not understood what you just typed :(");
	}
});