"use strict"

const Hapi = require('hapi')
const Joi  = require('joi')
const Boom = require('boom')

const server = new Hapi.Server()

server.connection({
  host : 'localhost',
  port : Number(process.argv[2] || 8080)
})

server.state( 'session', {
  path     : '/',
  encoding : 'base64json',
  domain   : 'localhost',
       ttl : 10

})

server.route({
  path : '/set-cookie',
  method : 'GET',
  handler : function (request, reply) {
    return reply({
      message : 'Good job!'
    }).state('session', { key: 'makemehapi' })
  },
  config: {
        state: {
            parse: true,
            failAction: 'log'
        }
    }

})

server.route({
  path: '/check-cookie',
  method: 'GET',
  handler: function (request, reply) {
    let session = request.state.session;
    let result;

    if (session) {
      result = { user : 'hapi' }
    } else {
      result = Boom.unauthorized('Missing authentication')
    }
    reply(result)
  }
})


server.start(function () {
  console.log('Server running at:', server.info.uri)
})
