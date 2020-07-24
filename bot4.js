var fs = require('fs');
var tmi = require("tmi.js");
var channelToJoin = "channel name";
var gameName = "game"

var config = {
    options: {
        debug: true
    },
    connection: {
        reconnect: true
    },
    identity: {
        username: "bot user here",
        password: "oauth:OAUTH KEY HERE"
    },
    channels: [channelToJoin]
};

var client = new tmi.client(config);
client.connect();

client.on("chat", (channel, user, message, self) => {
    if (message.startsWith("!add")) {
        let argument = message.substring(5)
        fs.appendFile('test.txt', argument + ", ", function (err) {
            if (err) throw err
            client.say(channel, "Game added!", 'utf8',);
        })

}

if (message.startsWith("!list")) {
    fs.readFile('./test.txt', 'utf8', function read(err, data) {
        if (err) {
            throw err;
        }
        const content = data;



        processFile(content)
    });

    function processFile(content) {
        client.say(channel, content, 'utf8')
    
    }}
    if (message.startsWith("!clear")) {
        fs.writeFile('test.txt',' ', function (err) {
            if (err) throw err;
            client.say(channel, "cleared!",);
        })
}
});