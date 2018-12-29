const express = require('express');
const bodyParser = require('body-parser');

const app = express();
/*app.use((request, response, next) => {
    console.log('In middleware');
    next(); // for next middleware below
});*/
app.use(bodyParser.urlencoded({extended: false}));
app.use('/add-product',(request, response, next) => {
    console.log('In following middleware');
    response.send('<form action="/product" method="POST"><input type="text" name="title"><button type="submit">Add product</button></form>')
});
app.use('/product', (request, response, next) => {
    console.log(request.body);
    response.redirect('/');
});
app.use('/',(request, response, next) => {
    console.log('In following middleware');
    response.send('<h1>Hello World</h1>')
});

/*
const server = http.createServer();
server.listen(3000);*/
app.listen(3000);