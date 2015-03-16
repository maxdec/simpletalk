'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var UsersConstants = require('../constants/UsersConstants');
var EventEmitter = require('events').EventEmitter;
var objectAssign = require('object-assign');

var UsersStore = objectAssign({}, EventEmitter.prototype, {
  _users: {},

  get: function () {
    return Object.keys(this._users).map(function (key) { return this._users[key]; }.bind(this));
  },

  _add: function (user) {
    var username = user.getUsername();
    this._users[username] = user;
  },

  _remove: function (username) {
    delete this._users[username];
  },

  _listenToUser: function () {
    this.emitChange();
  },

  _toggleMute: function (username) {
    this._users[username].toggleMute();
  },

  emitChange: function () {
    this.emit('change');
  },

  addChangeListener: function(callback) {
    this.on('change', callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener('change', callback);
  }
});

UsersStore.dispatchToken = AppDispatcher.register(function (payload) {
  var action = payload.action;

  switch (action.actionType) {
    case UsersConstants.USERS_ADD:
      UsersStore._add(action.data);
      break;

    case UsersConstants.USERS_REMOVE:
      UsersStore._remove(action.data);
      break;

    case UsersConstants.USERS_MUTE_TOGGLED:
      UsersStore._toggleMute(action.data);
      break;

    default:
      return true;
  }

  UsersStore.emitChange();

  return true;
});

module.exports = UsersStore;
