// Generated by CoffeeScript 1.4.0
(function() {
  var Palabra, app, express, http, io, onlinecount, palabras, rand, server;

  express = require('express');

  http = require('http');

  Palabra = require('./palabra')();

  app = express();

  app.configure(function() {
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express["static"](__dirname + '/public'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    return app.use(app.router);
  });

  app.configure('development', function() {
    return app.use(express.errorHandler());
  });

  rand = require('./rand');

  palabras = [new Palabra("amor", rand(), rand()), new Palabra("fluye", rand(), rand()), new Palabra("al", rand(), rand()), new Palabra("quietud", rand(), rand()), new Palabra("la", rand(), rand()), new Palabra("vida", rand(), rand()), new Palabra("feedback", rand(), rand()), new Palabra("somos", rand(), rand()), new Palabra("noche", rand(), rand()), new Palabra("veces", rand(), rand()), new Palabra("es", rand(), rand()), new Palabra("inerte", rand(), rand()), new Palabra("el", rand(), rand()), new Palabra("mañana", rand(), rand()), new Palabra("miedo", rand(), rand()), new Palabra("día", rand(), rand()), new Palabra("el", rand(), rand()), new Palabra("que", rand(), rand()), new Palabra("siempre", rand(), rand()), new Palabra("s", rand(), rand()), new Palabra("contigo", rand(), rand()), new Palabra("arándanos", rand(), rand()), new Palabra("tu", rand(), rand()), new Palabra("viaje", rand(), rand()), new Palabra("va", rand(), rand()), new Palabra("a", rand(), rand()), new Palabra("como", rand(), rand()), new Palabra("tiene", rand(), rand()), new Palabra("a", rand(), rand()), new Palabra("más", rand(), rand()), new Palabra("y", rand(), rand()), new Palabra("música", rand(), rand()), new Palabra("si", rand(), rand()), new Palabra("soy", rand(), rand()), new Palabra("no", rand(), rand()), new Palabra("hay", rand(), rand()), new Palabra("los", rand(), rand()), new Palabra("frío", rand(), rand()), new Palabra("de", rand(), rand()), new Palabra("del", rand(), rand()), new Palabra("eres", rand(), rand()), new Palabra("la", rand(), rand()), new Palabra("cualquier", rand(), rand()), new Palabra("hacer", rand(), rand()), new Palabra("el", rand(), rand()), new Palabra("volver", rand(), rand()), new Palabra("ahora", rand(), rand()), new Palabra("aquí", rand(), rand()), new Palabra("aire", rand(), rand()), new Palabra("en", rand(), rand()), new Palabra("de", rand(), rand()), new Palabra("sin", rand(), rand()), new Palabra("mi", rand(), rand()), new Palabra("corazón", rand(), rand()), new Palabra("con", rand(), rand()), new Palabra("del", rand(), rand()), new Palabra("valiente", rand(), rand()), new Palabra("sin", rand(), rand()), new Palabra("árbol", rand(), rand()), new Palabra("es", rand(), rand()), new Palabra("cada", rand(), rand()), new Palabra("un", rand(), rand()), new Palabra("y", rand(), rand()), new Palabra("mundo", rand(), rand())];

  app.get('/', function(req, res) {
    return res.render('index', {
      palabras: palabras
    });
  });

  app.get('/acerca', function(req, res) {
    return res.render('acerca', {
      slug: "acerca"
    });
  });

  server = app.listen(18118);

  io = require('socket.io').listen(server);

  io.set('log level', 1);

  onlinecount = 0;

  io.sockets.on('connection', function(socket) {
    onlinecount++;
    socket.emit('onlinecount', onlinecount);
    socket.broadcast.emit('onlinecount', onlinecount);
    socket.on('mover', function(d) {
      palabras[d.data.id].x = d.data.pos.left;
      palabras[d.data.id].y = d.data.pos.top;
      return socket.broadcast.emit('mover', {
        data: palabras[d.data.id],
        id: d.data.id
      });
    });
    return socket.on('disconnect', function() {
      onlinecount--;
      return socket.broadcast.emit('onlinecount', onlinecount);
    });
  });

  console.log("Servidor escuchando en el puerto 18118");

}).call(this);
