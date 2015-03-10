'use strict';

var React = require('react/addons');
var User = require('./User.jsx');

module.exports = React.createClass({
  render: function () {
    var users = this.props.users.map(function (user) {
      return (
        <User user={user} toggleMute={this.props.toggleMute} />
      );
    }.bind(this));

    return (
      <div>
        <h5 className="text-muted">Peers</h5>
        {users}
      </div>
    );
  }
});
