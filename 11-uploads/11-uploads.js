"use strict"

const Hapi = require('hapi')
const Joi = require('joi')
const fs = require('fs')

const server = new Hapi.Server()

server.connection({
  host : 'localhost',
  port : Number(process.argv[2] || 8080)
})

server.route({
  method : 'POST',
  path : '/upload',
  config : {
    payload : {
        output : 'stream',
        parse : true,
        allow: 'multipart/form-data'
    },
    handler : function (request, reply) {
      var body = ''
      request.payload.file.on('data', function (data) {
        // add to and set the data to body
        body += data
      })

      request.payload.file.on('end', function () {
        let file = {
          description : request.payload.description,
          file : {
            data : body,
            filename : request.payload.file.hapi.filename,
            headers : request.payload.file.hapi.headers
          }
        };
        reply( JSON.stringify(file) )

      })

    }
  }
})

server.start((err) => {

  if (err) {
    throw err;
  }

  console.log('Server running at:', server.info.uri);
});
