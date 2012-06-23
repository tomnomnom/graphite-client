var net = require('net');

exports.connect = function(port, ip){
  port = port || 2003;
  ip = ip || '127.0.0.1';

  var client = null;
  var clientConnected = false;
  var buffer = [];

  var disconnect = function(){
    client.end();
    client.destroy();
    clientConnected = false;
  };

  var connect = function(){
    client = net.connect(port, ip);

    // On error, wait a bit and then try to connect again
    client.on('error', function(err){
      disconnect();
      setTimeout(connect, 5000);
    });

    client.on('connect', function(){
      clientConnected = true;
    });
  };

  var getTimestamp = function(){
    var ts = parseInt((new Date).getTime()/1000, 10)
    return ts;
  };

  var send = function(key, value, timestamp){
    if (!key){
      throw new Error('No key specified');
    }
    value = value || '0';
    timestamp = timestamp || getTimestamp();

    var line = key +' '+ value +' '+ timestamp +'\r\n';
    buffer.push(line);

    // If the client is connected, send all lines in the buffer
    if (clientConnected){
      // Work on a copy of the buffer so the real one can be emptied immediately
      var _buffer = buffer;
      buffer = [];
      _buffer.forEach(function(line){
        client.write(line);
      });
    }
  };

  connect();

  return {
    'send': send,
    'disconnect': disconnect
  };
};


