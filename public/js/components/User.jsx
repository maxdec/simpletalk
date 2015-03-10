'use strict';

var React = require('react/addons');
var cx = React.addons.classSet;

module.exports = React.createClass({
  componentDitMount: function () {
    this.props.user.addListener('MUTE_TOGGLED', this._userChanged);
  },
  componentWillUnmount: function() {
    this.props.user.removeListener('MUTE_TOGGLED', this._userChanged);
  },
  _userChanged: function () {

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
        <div className="progress volume">
          <div className="progress-bar progress-bar-success" style={{ width: user.getVolume() + '%' }}></div>
        </div>
      </h1>
    );
  }
});
