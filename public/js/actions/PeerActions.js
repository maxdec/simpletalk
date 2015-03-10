'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var PeerConstants = require('../constants/PeerConstants');

module.exports = {
  connect: function (username) {
    AppDispatcher.handleViewAction({
      actionType: PeerConstants.PEER_CONNECT,
      data: username
    });
  },
  callTo: function (username) {
    AppDispatcher.handleViewAction({
      actionType: PeerConstants.PEER_CALL_TO,
      data: username
    });
  },
  disconnectFrom: function (username) {
    AppDispatcher.handleViewAction({
      actionType: PeerConstants.PEER_DISCONNECT_FROM,
      data: username
    });
  }
};
