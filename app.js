var express = require('express');
var redis = require("redis");

var app = express();
var client = redis.createClient(process.env.REDIS_PORT || "6379", process.env.REDIS_HOST || "localhost");

app.get('/:namespace/keys/:pattern?', keys);
app.get('/:namespace/get/:key', get);
app.get('/:namespace/set/:key/:value', set)

function keys(req, res, next) {
  var ns = req.params.namespace;
  var pattern = req.params.pattern || "*";
  console.log('getting keys matching pattern ' + pattern);
  client.keys(ns+'.'+pattern, function(err, keys) {
    res.json(keys);
  });
}

function get(req, res, next) {
  var ns = req.params.namespace;
  var key = req.params.key;
  console.log('getting value of key ' + key);
  client.get(key, function(err, value) {
    res.json(value);
  });
}

function set(req, res, next) {
  var ns = req.params.namespace;
  var key = req.params.key;
  var value = req.params.value;
  console.log('setting value of key ' + key + ' to ' + value);
  client.set(ns+'.'+key, value, function(err, value) {
    res.json(value);
  });
}

app.listen(3000);
console.log('Express started on port 3000');