require('http').createServer(function (req, res) {
    req.on('data', function(d) {
         console.log(d.toString('utf-8'));
    });
    req.on('end', function() {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('ok\n');
    });
}).listen(3001);