# graphite-client

A really simple plain-text graphite client module.

## Example usage

Install with:
  
    npm install https://github.com/TomNomNom/graphite-client/tarball/master

Example code:    

    var graphite = require('graphite-client');

    var client = graphite.connect(2003, '127.0.0.1');

    setInterval(function(){
        var rand = Math.floor(Math.random()*100);
        client.send('test.random', rand);
    }, 10000);

