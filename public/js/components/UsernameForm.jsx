'use strict';

var React = require('react/addons');

module.exports = React.createClass({
  _onSubmit: function (event) {
    event.preventDefault();
    var username = this.refs.username.getDOMNode().value;
    this.props.onSubmitUsername(username);
  },
  render: function () {
    return (
      <form className="form-inline" onSubmit={this._onSubmit}>
        <div className="form-group">
          <label>Username</label>
          &nbsp;
          <input type="text" ref="username" className="form-control" placeholder="Bobby Brown" />
        </div>
        &nbsp;
        <button type="submit" className="btn btn-default">Save</button>
      </form>
    );
  }
});
