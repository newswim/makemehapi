"use strict"
const Inert = require('inert')
const Hapi = require('hapi')
const server = new Hapi.Server()

// Hapi plugins need to be registered . .
                // i get the feeling this is something like Express' Middleware
server.register(Inert, function (err) {
  if (err) throw err;
});

// setting up the server
server.connection({
  host: 'localhost',
  port: Number(process.argv[2] || 8080)
})

let handler = {
  file: "index.html" // Path.join(__dirname, "index.html")
}

server.route({
  method: 'GET',
  path: '/',
  handler: handler    // should probably name this something less generic
})

/* "You can declare handlers as objects instead of functions."
 *
The object must contain one of the following:
- file (requires inert plugin)
- directory (requires inert plugin)
- proxy (requires h2o2 plugin)
- view (requires vision plugin)
*/

server.start()
