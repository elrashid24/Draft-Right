var path = require("path");
var express = require("express");
var app = express();
var PORT = 8080;

app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/"));
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname + "/src/index.html"));
});

var server = app.listen(PORT, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Listening at http://%s:%s", host, port);
});