'use strict';

var io;

module.exports = function (server) {
  if (!io && server) io = require('socket.io')(server);
  return io;
};
