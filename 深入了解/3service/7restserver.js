var express = require('express');
var path = require('path');
var app = express();

app.use(express.static(__dirname));
app.use(require('body-parser').json());

app.get('/',function (req, res) {
    res.sendFile(path.resolve('7ngresource.html'));
});

var books = [{id:1,name:'node.js'}];

app.route('/book').get(function (req, res) {
    // var data = {book:books};
    res.send(books);
}).post(function (req, res) {
    var book = req.body;
    book.id = books[books.length-1].id+1;
    books.push(book);
    res.send(book);
});

app.route('/book/:id').delete(function (req, res) {
    books = books.filter(function (book) {
        return book.id != req.params.id;
    })
    res.send({});
})
app.listen(8003)