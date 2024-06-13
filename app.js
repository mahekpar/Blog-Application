const express = require ('express');
const bodyParser = require('body-parser');
const app= express();
const PORT= 3000;

app.set('view engine','ejs');
app.use(bodyParser.urlencoded({urlencoded: true}));
app.use(express.static('public'));

let posts = [];

app.get('/',(req,res) => {
    res.render('index',{posts});
});

app.get('/post/new', (req,res)=>{
    res.render('new');
});

app.post('/post', (req,res)=>{
    const newPost = {id: Date.now(), title: req.body.title,content: req.body.content };
    posts.push(newPost);
    res.redirect('/');
});

app.get('/post/edit/:id', (req,res)=>{
    const post= posts.find(p => p.id == req.params.id);
    res.render('edit', {post});
});

app.post ('/post/edit/:id', (req,res) => {
    const post = posts.find(p=> p.id == req.params.id);
    post.title = req.body.title;
    post.content = req.body.content;
    res.redirect('/');
});

app.post('/post/delete/:id', (req, res) => {
    posts = posts.filter(p => p.id != req.params.id);
    res.redirect('/');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});