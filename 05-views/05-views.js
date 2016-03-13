const Hapi = require('hapi')
const Vision = require('vision')
const Path = require('path')
const server = new Hapi.Server()

server.register(Vision, function (err) {
  if (err) throw err;
});

server.connection({
    host: 'localhost',
    port: Number(process.argv[2] || 8080)
});

server.views({
    engines: {
        html: require('handlebars')
    },
    path: Path.join(__dirname, 'templates')
});

server.route({
  method: 'GET',
  path: '/',
  handler: {
      view: "index.html"
  }
})

server.start()
