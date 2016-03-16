const Hapi = require('hapi')
const Joi = require('joi')
const server = new Hapi.Server()

server.connection({
  host: 'localhost',
  port: Number(process.argv[2] || 8080)
});

const replySuccess = function (request, reply) {
  reply('login successful')
}

const loginSchema = Joi.object({
  isGuest : Joi.boolean(),
  username : Joi.string().when('isGuest', { is : false, then: Joi.required() }),
  accessToken : Joi.string().alphanum(),
  password : Joi.string().alphanum()
})
.without('password', 'accessToken')
.options({ allowUnknown : true })

server.route({
  method : 'POST',
  path : '/login',
  config : {
    handler : replySuccess,
    validate : {
      payload : loginSchema
    }
  }
})

server.start()
