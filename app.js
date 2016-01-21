//custom server ftw 

var express = require('express');
var data = require('./lib/data.js');

var app = express();
app.use(express.static('public'));

app.get('/', function(req, res){
    console.log('Request to Index')
    res.status(200).send('index.html');
});

app.get('/posts', function(req, res){
    console.log('Request to posts')
    data.posts.getAll().then(function(ress){
        res.send(ress);
    });
});

app.get('/posts/:id', function(req, res){
    var id = req.params.id;
    console.log('Request posts at %s', id);
    data.posts.getOne(id).then(function(post){
        res.send(post)
    }, function(err){
        res.status(400).sent('Cannot find post');
    })
});

app.post('api/users/login', function(req, res){
    console.log('Request to Index')
    res.send('index.html');
});

app.post('api/users/logout', function(req, res){
    console.log('Request to Index')
    res.send('index.html');
});

app.post('api/users/register', function(req, res){
    console.log('Request to Index')
    res.send('index.html');
});

app.post('api/comment/add', function(req, res){

})



var server = app.listen(process.env.PORT || 5000, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('S&D @ TSA is listening at http://%s:%s', host, port);
});
