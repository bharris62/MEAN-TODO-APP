var express = require('express');
var app = express();
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

//config

mongoose.connect('Nothing To See Here');

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'applciaiton.vnd.api+json'}));
app.use(methodOverride());

var Todo = mongoose.model('Todo', {
  text : String
});

//api
app.get('/api/todos', function(req, res){
  Todo.find(function(err,todos){
    if(err)
      res.send(err)
    res.json(todos);
  });
});

app.post('/api/todos', function(req,res){
  Todo.create({
    text: req.body.text,
    done: false
  }, function(err,todo){
    if(err)
      res.send(err)

    Todo.find(function(err,todos){
      if(err)
        res.send(err)
      res.json(todos);
    });
  });
});

app.delete('api/todos/:todo_id', function(req,res){
  Todo.remove({
    _id : req.params.todo_id
  }, function(err,todo){
    if(err)
      res.send(err);

    Todo.find(function(err,todos){
      if(err)
        res.send(err)
      res.json(todos);
    });
  });
});

app.get('*', function(req,res){
  res.sendfile('./public/index.html');
});
//listener
app.listen(8080);
console.log('App Listening on Port 8080');
