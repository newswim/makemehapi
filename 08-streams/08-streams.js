const Hapi   = require('hapi')
const fs     = require('fs')
const rot13  = require("rot13-transform");
const server = new Hapi.Server()

server.connection({
  host: 'localhost',
  port: Number(process.argv[2] || 8080)
})

const rotFile = function (request, reply) {
  reply(fs.createReadStream('./public/file.txt').pipe(rot13()))
}

server.route({
  method: 'GET',
  path: '/',
  handler: rotFile
})

server.start()
