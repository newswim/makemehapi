const Hapi = require('hapi')
const Joi = require('joi')
const server = new Hapi.Server()

server.connection({
  host: 'localhost',
  port: Number(process.argv[2] || 8080)
});

server.route({
  method: 'GET',
  path: '/chickens/{breed}',
  handler: handler: function(request, reply) {
    reply("The breed you requested was: " + request.params.breed)
  },
  config: {
    validate: {
      params: {
        breed: Joi.any().optional()
        }
      }
    }
  }
})

server.start(function () {});
