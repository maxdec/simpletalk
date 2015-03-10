'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var SelfConstants = require('../constants/SelfConstants');
var EventEmitter = require('events').EventEmitter;
var objectAssign = require('object-assign');

var SelfStore = objectAssign({}, EventEmitter.prototype, {
  _user: null,

  get: function () {
    return this._user;
  },

  _set: function (user) {
    this._user = user;
    this._user.addListener('volume', function () {
      this.emitChange();
    }.bind(this));
  },

  _toggleMute: function () {
    this._user.toggleMute();
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

SelfStore.dispatchToken = AppDispatcher.register(function (payload) {
  var action = payload.action;

  switch (action.actionType) {
    case SelfConstants.SELF_SET:
      SelfStore._set(action.data);
      break;

    case SelfConstants.SELF_MUTE_TOGGLED:
      SelfStore._toggleMute(action.data);
      break;

    default:
      return true;
  }

  SelfStore.emitChange();

  return true;
});

module.exports = SelfStore;
