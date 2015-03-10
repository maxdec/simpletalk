'use strict';

var React = require('react/addons');
var PeerActions = require('../actions/PeerActions');
var SelfActions = require('../actions/SelfActions');
var UsersActions = require('../actions/UsersActions');
var PeerStore = require('../stores/PeerStore');
var SelfStore = require('../stores/SelfStore');
var UsersStore = require('../stores/UsersStore');
var UsernameForm = require('./UsernameForm.jsx');
var User = require('./User.jsx');
var UserList = require('./UserList.jsx');

var UserClass = require('../utils/user');

navigator.getUserMedia = navigator.getUserMedia ||
                         navigator.webkitGetUserMedia ||
                         navigator.mozGetUserMedia ||
                         navigator.msGetUserMedia;

module.exports = React.createClass({
  getInitialState: function () {
    return {
      users: UsersStore.get(),
      self: SelfStore.get()
    };
  },
  componentDidMount: function () {
    SelfStore.addChangeListener(this._onSelfChange);
    UsersStore.addChangeListener(this._onUsersChange);
    PeerStore.addPeerConnectedListener(this._onPeerConnected);
  },
  componentWillUnmount: function() {
    SelfStore.removeChangeListener(this._onSelfChange);
    UsersStore.removeChangeListener(this._onUsersChange);
    PeerStore.removePeerConnectedListener(this._onPeerConnected);
  },
  _onSelfChange: function () {
    this.setState({ self: SelfStore.get() });
  },
  _onUsersChange: function () {
    this.setState({ users: UsersStore.get() });
  },
  _onPeerConnected: function (user) {
    UsersActions.add(user);
  },
  _setUsername: function (username) {
    navigator.getUserMedia ({ video: false, audio: true },
      function success(localMediaStream) {
        var self = new UserClass(username, { self: true, mediaStream: localMediaStream });
        SelfActions.set(self);
        PeerActions.connect(self);
      }.bind(this),
      function error(err) {
        console.log(err);
      }
    );
  },
  _toggleMuteSelf: function () {
    SelfActions.toggleMute();
  },
  _toggleMutePeer: function (username) {
    UsersActions.toggleMute(username);
  },
  _renderContent: function () {
    if (!this.state.self) {
      return <UsernameForm onSubmitUsername={this._setUsername} />;
    } else {
      return <User user={this.state.self} toggleMute={this._toggleMuteSelf} />;
    }
  },
  render: function () {
    return (
      <div className="container">
        <div className="header">
          <nav>
            <ul className="nav nav-pills pull-right">
              <li role="presentation" className="active"><a href="#">Home</a></li>
              <li role="presentation"><a href="#">Settings</a></li>
            </ul>
          </nav>
          <h3>Simpletalk</h3>
        </div>

        <div className="row">
          <div className="col-sm-12">
            {this._renderContent()}
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12">
            <UserList users={this.state.users} toggleMute={this._toggleMutePeer} />
          </div>
        </div>

        <footer className="footer">
          <p>Made with love - @maxdec - 2015</p>
        </footer>

      </div>
    );
  }
});
