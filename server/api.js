'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var morganLog = require('morgan');
var favicon = require('serve-favicon');

module.exports = function (app) {
  app.use(express.static(__dirname + '/../public'));
  app.use(morganLog('dev'));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.set('views', __dirname + '/../public');
  app.set('view engine', 'ejs');
  app.engine('html', require('ejs').renderFile);
  app.use(favicon(__dirname + '/../public/favicon.png'));

  var allowedMethods = 'GET,PUT,POST,DELETE,OPTIONS';
  var allowedHeaders = 'Content-Length,Content-Type';
  var allowedHosts = ['http://mydomain.com'];
  function _allowCrossDomain(req, res, next) {
    if (allowedHosts.indexOf(req.headers.origin) !== -1) {
      res.header('Access-Control-Allow-Origin', req.headers.origin);
      res.header('Access-Control-Allow-Methods', allowedMethods);
      res.header('Access-Control-Allow-Headers', allowedHeaders);
      if ('OPTIONS' === req.method) return res.sendStatus(200);
    }
    next();
  }

  app.route('/hello/:name')
  .options(_allowCrossDomain)
  .get(function (req, res) {
    res.send('Hello ' + req.params.name);
  });
};
