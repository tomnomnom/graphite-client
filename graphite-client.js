var net = require('net');

exports.connect = function(port, ip){
  port = port || 2003;
  ip = ip || '127.0.0.1';

  var client = net.connect(port, ip);

  var getTimestamp = function(){
    var ts = parseInt((new Date).getTime()/1000, 10)
    return ts;
  };

  var disconnect = function(){
    client.end();
  };

  var send = function(key, value, timestamp){
    if (!key){
      throw new Error('No key specified');
    }
    value = value || '0';
    timestamp = timestamp || getTimestamp();

    client.write(key +' '+ value +' '+ timestamp +'\r\n');
  };

  return {
    'send': send,
    'disconnect': disconnect
  };
};


