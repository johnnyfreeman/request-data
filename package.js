Package.describe({
  summary: 'Request Data'
});

Npm.depends({
  'connect': '2.7.10'
});

var everywhere = ['server', 'client'];

Package.on_use(function (api){
  api.use(['webapp'], 'server');
  api.add_files('request-data.js', everywhere);
  api.export('RequestData', everywhere);
});