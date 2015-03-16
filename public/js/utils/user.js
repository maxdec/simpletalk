'use strict';

var EventEmitter = require('events').EventEmitter;
var objectAssign = require('object-assign');

function User(username, opts) {
  /* global AudioContext */
  EventEmitter.call(this);
  opts = opts || {};
  this._username = username;
  this._self = opts.self;
  this._mediaStream = opts.mediaStream;
  this._audio = opts.audio;
  this._call = opts.call;
  this._volume = 0;
  // this._processVolume();
  this._processFreqs();
}

User.prototype = objectAssign({}, EventEmitter.prototype);

User.prototype._processVolume = function () {
  var audioContext = new AudioContext();
  var analyser = audioContext.createAnalyser();
  var microphone = audioContext.createMediaStreamSource(this._mediaStream);
  this._processor = audioContext.createScriptProcessor(1024, 1, 1);

  analyser.smoothingTimeConstant = 0.5;
  analyser.fftSize = 512;

  microphone.connect(analyser);
  analyser.connect(this._processor);
  this._processor.connect(audioContext.destination);

  // RMS
  var array = new Uint8Array(analyser.frequencyBinCount);
  this._processor.onaudioprocess = function () {
    analyser.getByteFrequencyData(array);
    var values = 0;

    var length = array.length;
    if (length === 0) return;
    for (var i = 0; i < length; i++) {
      values += array[i] * array[i];
    }
    if (values / length <= 1) this._volume = 0;
    else this._volume = 20*Math.log(Math.sqrt(values / length));
    // this._volume = values / length;
    this.emit('volume', this._volume);
  }.bind(this);
};

User.prototype._processFreqs = function () {
  var audioContext = new AudioContext();
  var analyser = audioContext.createAnalyser();
  var microphone = audioContext.createMediaStreamSource(this._mediaStream);
  this._processor = audioContext.createScriptProcessor(1024, 1, 1);

  analyser.fftSize = 512;

  microphone.connect(analyser);
  analyser.connect(this._processor);
  this._processor.connect(audioContext.destination);

  var bufferLength = analyser.fftSize;
  var dataArray = new Uint8Array(bufferLength);
  var points;
  this._processor.onaudioprocess = function () {
    points = [];
    analyser.getByteTimeDomainData(dataArray);

    for (var x = 0; x < bufferLength; x++) {
      points[x] = dataArray[x] / 256.0;
    }

    this.emit('freqs', points);
  }.bind(this);
};

User.prototype.getUsername = function () {
  return this._username;
};

User.prototype.getMediaStream = function () {
  return this._mediaStream;
};

User.prototype.getVolume = function () {
  return this._volume;
};

User.prototype.isSelf = function () {
  return !!this._self;
};

User.prototype.toggleMute = function () {
  this._mediaStream.getAudioTracks()[0].enabled = !this._mediaStream.getAudioTracks()[0].enabled;

  if (this.isMuted()) {
    this._volume = 0;
    this._processor.onaudioprocess = null;
  } else {
    // this._processVolume();
    this._processFreqs();
  }
};

User.prototype.isMuted = function () {
  return !this._mediaStream.getAudioTracks()[0].enabled;
};

module.exports = User;
