//custom server ftw 
'use strict'

var express = require('express');
var data = require('./lib/data.js');
var bodyParser = require('body-parser')

var app = express();
app.use(express.static('public'));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    console.log('Request to Index')
    res.status(200).send('index.html');
});

app.get('/posts', (req, res) => {
    console.log('Request to posts')
    data.posts.getAll().then((posts) => {
        res.send(posts);
    });
});

app.get('/posts/:id', (req, res) => {
    var id = req.params.id;
    console.log('Request posts at %s', id);
    data.posts.getOne(id).then((post) => {
        res.send(post)
    }, (err) => {
        res.status(400).send('Cannot find post');
    })
});
app.get('/api/recent-comments', (req, res) => {
    data.comments.getRecent().then((recentComments) => {
        res.status(200).send(recentComments)
    })
});
app.get('/api/recent-posts', (req, res) => {
    data.posts.getRecent().then((recentPosts) => {
        res.status(200).send(recentPosts)
    })
});

app.post('/api/user/login', (req, res) => {
    console.log(req.body + "from app login")
    data.user.login(req.body)
});

app.post('/api/user/logout', (req, res) => {
    data.user.logout(req.body)
});

app.post('/api/user/register', (req, res) => {
    data.user.register(req.body).then((res) => {
        console.log(res)
    })
});

app.post('/api/comment/add', (req, res) => {

})



var server = app.listen(process.env.PORT || 5000, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('S&D @ TSA is listening at http://%s:%s', host, port);
});
