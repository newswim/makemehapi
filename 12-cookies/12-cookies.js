"use strict"

const Hapi = require('hapi')
const Joi = require('joi')
const fs = require('fs')

const server = new Hapi.Server()

server.connection({
  host : 'localhost',
  port : Number(process.argv[2] || 8080)
})

server.state( 'session' {
  encoding : 'base64json',
  ttl : 10,
  domain : 'localhost'
})

// https://github.com/hapijs/hapi/blob/master/API.md#serverstatename-options
function setCookie (request, reply) {
  let session = request.state.session;

  
}

server.route({
  path : '/set-cookie',
  method : 'GET',

})
