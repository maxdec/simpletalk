'use strict';

var React = require('react/addons');

module.exports = React.createClass({
  getDefaultProps: function () {
    return {
      height: 35,
      width: 100,
      bgcolor: '#000',
      color: '#0F0',
      freqs: []
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
    this._drawFreqs();
  },

  _clear: function () {
    this._context.clearRect(0, 0, this.props.width, this.props.height);
    this._drawBackground();
  },

  _drawBackground: function () {
    this._context.fillStyle = '#fff'; //'rgb(200, 200, 200)';
    this._context.fillRect(0, 0, this.props.width, this.props.height);
  },

  _drawFreqs: function () {
    if (this.props.freqs.length === 0) return;

    this._context.lineWidth = 2;
    this._context.strokeStyle = 'rgb(0, 0, 0)';

    this._context.beginPath();
    var sliceWidth = this.props.width * 1.0 / this.props.freqs.length;

    var x = 0, y = this.props.height * this.props.freqs[0];

    // Do i = 0
    this._context.moveTo(x, y);
    // Then skip it (i >= 1)
    for (var i = 1; i < this.props.freqs.length; i++) {
      y = this.props.height * this.props.freqs[i];
      this._context.lineTo(x, y);
      x += sliceWidth;
    }

    this._context.lineTo(this.props.width, this.props.height / 2);
    this._context.stroke();
  },

  render: function () {
    return <canvas className="freqs" width={this.props.width} height={this.props.height}></canvas>;
  }
});
