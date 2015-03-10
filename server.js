'use strict';

var express = require('express');
var app = express();
var http = require('http').Server(app);
var ExpressPeerServer = require('peer').ExpressPeerServer;

var socket = require('./server/socket')(http);
var peerServer = new ExpressPeerServer(http, { debug: true });
app.use('/peerjs', peerServer);
require('./server/api')(app);

var config = require('./server/config');
http.listen(config.express.port, function () {
  console.log('✔ App listening on port', config.express.port);
});

var peers = [];
peerServer.on('connection', function (id) {
  socket.emit('peer:connection', id);
  peers.push(id);
});
peerServer.on('disconnect', function (id) {
  socket.emit('peer:disconnection', id);
  peers = peers.filter(function (peerId) { return peerId !== id; });
});
