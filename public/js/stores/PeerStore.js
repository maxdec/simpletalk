'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var PeerConstants = require('../constants/PeerConstants');
var EventEmitter = require('events').EventEmitter;
var objectAssign = require('object-assign');
var Peer = require('peerjs');
var User = require('../utils/user');
var SelfStore = require('./SelfStore');

var PeerStore = objectAssign({}, EventEmitter.prototype, {
  _peer: null,

  get: function () {
    return this._peer;
  },

  _connect: function (user) {
    console.log('Connecting with username', user.getUsername());
    this._peer = new Peer(user.getUsername(), {
      host: window.location.hostname,
      port: window.location.port || 80,
      path: '/peerjs'
    });

    this._peer.on('call', function (call) {
      call.answer(user.getMediaStream());
      call.on('stream', this._onStream(call));
    }.bind(this));
  },

  _callTo: function (username, self) {
    var call = this._peer.call(username, self.getMediaStream());
    call.on('stream', this._onStream(call));
  },

  _onStream: function (call) {
    return function (remoteMediaStream) {
      // this._registerPeer(call.peer, call, remoteMediaStream);
      var username = call.peer;
      var audio = new Audio();
      audio.src = window.URL.createObjectURL(remoteMediaStream);
      audio.play();
      this.emit('peer:connected', new User(username, { mediaStream: remoteMediaStream, audio: audio, call: call }));
    }.bind(this);
  },

  addPeerConnectedListener: function (callback) {
    this.addListener('peer:connected', callback);
  },

  removePeerDisconnectedListener: function (callback) {
    this._peer.removeListener('peer:connected', callback);
  }
});

PeerStore.dispatchToken = AppDispatcher.register(function (payload) {
  var action = payload.action;

  switch (action.actionType) {
    case PeerConstants.PEER_CONNECT:
      PeerStore._connect(action.data);
      break;

    case PeerConstants.PEER_CALL_TO:
      AppDispatcher.waitFor([SelfStore.dispatchToken]);
      PeerStore._callTo(action.data, SelfStore.get());
      break;

    default:
      return true;
  }

  return true;
});

module.exports = PeerStore;
