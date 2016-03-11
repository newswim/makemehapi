const Hapi = require('hapi')
const Inert = require('inert')
const Path = require('path')
const server = new Hapi.Server()
server.connection({
  host: 'localhost',
  port: Number(process.argv[2] || 8080)
})

server.register(Inert, function (err) {
  if (err) throw err;
});

server.route({
  method: 'GET',
  path: '/path/to/somewhere/{param}',
  handler: {
      directory: {
        path: Path.join(__dirname, 'public') }
  }

})

server.start()
