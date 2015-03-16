'use strict';

var React = require('react/addons');
var cx = React.addons.classSet;
var Freqs = require('./Freqs.jsx');

module.exports = React.createClass({
  getInitialState: function () {
    return { freqs: [] };
  },
  componentDidMount: function () {
    this.props.user.addListener('MUTE_TOGGLED', this._userChanged);
    this.props.user.addListener('freqs', this._updateFreqs);
  },
  componentWillUnmount: function() {
    this.props.user.removeListener('MUTE_TOGGLED', this._userChanged);
    this.props.user.removeListener('freqs', this._updateFreqs);
  },
  _userChanged: function () {
    this.forceUpdate();
  },
  _updateFreqs: function (freqs) {
    this.setState({ freqs: freqs });
  },
  _toggleMute: function (event) {
    event.preventDefault();
    this.props.toggleMute(this.props.user.getUsername());
  },
  render: function () {
    var user = this.props.user;
    var btnClasses = cx({
      'btn': true,
      'btn-default': true,
      'active': user.isMuted()
    });
    var iconClasses = cx({
      'fa': true,
      'fa-fw': true,
      'fa-microphone': user.isSelf() && !user.isMuted(),
      'fa-microphone-slash': user.isSelf() && user.isMuted(),
      'fa-volume-up': !user.isSelf() && !user.isMuted(),
      'fa-volume-off': !user.isSelf() && user.isMuted(),
    });

    return (
      <h1>
        {user.getUsername()}
        &nbsp;
        <button className={btnClasses} onClick={this._toggleMute}>
          <i className={iconClasses}></i>
        </button>
        &nbsp;
        <Freqs freqs={this.state.freqs} />
      </h1>
    );
  }
});
