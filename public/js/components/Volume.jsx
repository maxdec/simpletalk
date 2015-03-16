'use strict';

var React = require('react/addons');

module.exports = React.createClass({
  propTypes: {
    volume: React.PropTypes.number
  },

  getDefaultProps: function () {
    return {
      height: 35,
      width: 100,
      bgcolor: '#000',
      color: '#0F0',
      volume: 0
    };
  },

  componentDidMount: function () {
    if (!this._canvas) this._setupCanvas();
    this._draw();
  },

  componentDidUpdate: function () {
    this._clear();
    this._draw();
  },

  _setupCanvas: function () {
    this._canvas  = this.getDOMNode();
    this._context = this._canvas.getContext('2d');
  },

  _draw: function () {
    this._clear();
    this._drawBackground();
    this._drawVolume();
  },

  _clear: function () {
    this._context.clearRect(0, 0, this.props.width, this.props.height);
    this._drawBackground();
  },

  _drawBackground: function () {
    this._context.fillStyle = '#FFF';
    this._context.fillRect(0, 0, this.props.width, this.props.height);
  },

  _drawVolume: function () {
    this._context.fillStyle = '#00FF00';
    this._context.fillRect(0, 0, this.props.volume, this.props.height);
  },

  render: function () {
    return <canvas className="volume" width={this.props.width} height={this.props.height}></canvas>;
  }
});
