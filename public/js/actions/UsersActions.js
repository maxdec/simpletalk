'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var UsersConstants = require('../constants/UsersConstants');

module.exports = {
  add: function (user) {
    AppDispatcher.handleViewAction({
      actionType: UsersConstants.USERS_ADD,
      data: user
    });
  },
  remove: function (username) {
    AppDispatcher.handleViewAction({
      actionType: UsersConstants.USERS_REMOVE,
      data: username
    });
  },
  toggleMute: function (username) {
    AppDispatcher.handleViewAction({
      actionType: UsersConstants.USERS_MUTE_TOGGLED,
      data: username
    });
  }
};
