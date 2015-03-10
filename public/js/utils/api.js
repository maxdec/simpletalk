'use strict';

module.exports = function (method, url, data, callback) {
  if (!callback) {
    callback = data;
    data = null;
  }

  $.ajax({
    url: url,
    data: data,
    type: method,
    success: function (data) {
      callback(null, data);
    },
    error: function (xhr, status, err) {
      callback(err);
    }
  });
};
