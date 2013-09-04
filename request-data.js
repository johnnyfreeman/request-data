// Namespace for our request data methods 
// on both the server and the client
RequestData = {};

// Getter for GET data
RequestData.get = function(key, callback) {
  return Meteor.call('requestDataGet', key, callback);
};

// Getter for POST data
RequestData.post = function(key, callback) {
  return Meteor.call('requestDataPost', key, callback);
};

// Server only
if (Meteor.isServer) {
  var connect = Npm.require('connect');
  var GET = {}, POST = {};

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

  Meteor.methods({
    requestDataGet: function (key) {
      if (!GET.hasOwnProperty(key)) {
        throw new Meteor.Error(404, 'GET param not found');
      }

      return GET[key];
    },

    requestDataPost: function (key) {
      if (!POST.hasOwnProperty(key)) {
        throw new Meteor.Error(404, 'POST param not found');
      }

      return POST[key];
    }
  });
}