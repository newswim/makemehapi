'use strict'

var Hapi = require('hapi');
var server = new Hapi.Server();

server.connection({
    host: 'localhost',
    port: Number(process.argv[2] || 8080)
});

function handler (request, reply) {
  
  reply('Hello hapi')
}

server.route({
  path: '/',
  method: 'GET',
  handler: handler
})

server.start(function () {
  console.log('Server running at:', server.info.uri)
})
