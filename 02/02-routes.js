var Hapi = require('hapi')
var server = new Hapi.Server()
server.connection({
    host: 'localhost',
    port: Number(process.argv[2] || 8080)
})

function handler (request, reply) {
  reply('Hello ' + request.params.name)
}
server.route({
  method: 'GET',
  path: '/{name}',
  handler: handler
})

server.start()
