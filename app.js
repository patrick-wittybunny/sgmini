var finalhandler = require('finalhandler')
var http = require('http')
var serveIndex = require('serve-index')
var serveStatic = require('serve-static')

// Serve directory indexes for public/ftp folder (with icons)
var index = serveIndex('public/', {
    'icons': true
})

// Serve up public/ftp folder files
var serve = serveStatic('public/')

// Create server
var server = http.createServer(function onRequest(req, res) {
    var done = finalhandler(req, res)
    serve(req, res, function onNext(err) {
        if (err) return done(err)
        index(req, res, done)
    })
})

// Listen
server.listen(process.env.port)


// var express = require('express')
// var serveIndex = require('serve-index')

// var app = express()

// // Serve URLs like /ftp/thing as public/ftp/thing
// // The express.static serves the file contents
// // The serveIndex is this module serving the directory
// app.use('/', express.static('/'), serveIndex('/public/', {
//     'icons': true
// }))





// // Listen
// // app.listen(3000)
// app.listen(process.env.PORT);