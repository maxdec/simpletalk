'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var SelfConstants = require('../constants/SelfConstants');

module.exports = {
  set: function (user) {
    AppDispatcher.handleViewAction({
      actionType: SelfConstants.SELF_SET,
      data: user
    });
  },
  toggleMute: function () {
    AppDispatcher.handleViewAction({
      actionType: SelfConstants.SELF_MUTE_TOGGLED
    });
  }
};
