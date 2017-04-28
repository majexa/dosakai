const port = 3001;
const fs = require('fs');
const root = fs.realpathSync(__dirname + '/../');

require('http').createServer(function(req, res) {
  req.on('data', function(d) {
    fs.writeFileSync( //
      root + '/features/list/test.feature', //
      d.toString('utf-8') //
    );
    require('child_process').exec( //
      'nodejs ' + //
      root + '/node_modules/.bin/cucumber.js '+ //
      root + '/features/list/test.feature --no-warnings', //
      function(stdout, err) {
        if (err) {
          res.writeHead(400, {'Content-Type': 'text/plain'});
          res.end(err);
          //console.log(err);
          return;
        }
        //console.log(stdout);
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end(stdout);

      });
  });
  req.on('end', function() {
  });
}).listen(port);
console.log('Dosakai server listening on ' + port);
