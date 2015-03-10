'use strict';

var socket = require('./socket');
var SelfStore = require('../stores/SelfStore');
var PeerActions = require('../actions/PeerActions');
var UsersActions = require('../actions/UsersActions');

var TOPICS = {
  PEER_CONNECTED: 'peer:connection',
  PEER_DISCONNECTED: 'peer:disconnection'
};

socket.on('connect', function () {
  socket.on(TOPICS.PEER_CONNECTED, function (username) {
    if (!SelfStore.get()) return;
    if (username === SelfStore.get().getUsername()) return;
    PeerActions.callTo(username);
    console.log('User connected', username);
  });

  socket.on(TOPICS.PEER_DISCONNECTED, function (username) {
    if (!SelfStore.get()) return;
    if (username === SelfStore.get().getUsername()) return;
    UsersActions.remove(username);
    console.log('User disconnected', username);
  });
});
