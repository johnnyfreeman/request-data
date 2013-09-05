// local store used for 
// building request data
var GET = {}, POST = {};

// Server only
if (Meteor.isServer) {
  var connect = Npm.require('connect');

  WebApp.connectHandlers
    // parse the POST data
    .use(connect.bodyParser())
    // parse the GET data
    .use(connect.query())
    // intercept data and send continue
    .use(function(req, res, next) {
      POST = req.body;
      GET = req.query;
      return next();
    });
}

if (Meteor.isClient) {
  // form GET object
  var query       = window.location.search;
  var queryString = query.slice(1, query.length);
  var kvPairs = queryString.replace(/\+/g, " ").split("&");

  for (var i=0; i<kvPairs.length; i++) {
    var kv = kvPairs[i].split("=");
    var k  = decodeURIComponent(kv[0]);
    var v  = decodeURIComponent(kv[1]);
    
    GET[k] = v;
  }

  // POST data not available on the client
}

// Namespace for our request data methods 
// on both the server and the client
RequestData = {};

// Getter for GET data
RequestData.get = function (key) {
  if (!GET.hasOwnProperty(key)) {
    throw new Meteor.Error(404, 'GET param not found');
  }

  return GET[key];
};

// Getter for POST data
RequestData.post = function (key) {
  if (!POST.hasOwnProperty(key)) {
    throw new Meteor.Error(404, 'POST param not found');
  }

  return POST[key];
};
