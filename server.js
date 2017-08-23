var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

var articleOne = {
    title: 'Article One | Sendil',
    heading: 'Article One',
    date: 'August 23, 2017',
    content:` 
    <p> this is my article one.this is my article one.this is my article one.this is my article one.this is my article one.this is my article one.this is my article one.this is my article one.this is my article one.this is my article one.this is my article one.this is my article one.this is my article one.this is my article one.
    </p>
    <p> this is my article one.this is my article one.this is my article one.this is my article one.this is my article one.this is my article one.this is my article one.this is my article one.this is my article one.this is my article one.this is my article one.this is my article one.this is my article one.this is my article one.
    </p>
    <p> this is my article one.this is my article one.this is my article one.this is my article one.this is my article one.this is my article one.this is my article one.this is my article one.this is my article one.this is my article one.this is my article one.this is my article one.this is my article one.this is my article one.
    </p>
    `
    
};
var articleThree = {
    title: 'Article Three | Sendil',
    heading: 'Article Three',
    date: 'Januaryt 28, 2017',
    content:` 
    <p> this is my article one.this is my article one.this is my article one.this is my article one.this is my article one.this is my article one.this is my article one.this is my article one.this is my article one.this is my article one.this is my article one.this is my article one.this is my article one.this is my article one.
    </p>
    <p> this is my article one.this is my article one.this is my article one.this is my article one.this is my article one.this is my article one.this is my article one.this is my article one.this is my article one.this is my article one.this is my article one.this is my article one.this is my article one.this is my article one.
    </p>
    <p> this is my article one.this is my article one.this is my article one.this is my article one.this is my article one.this is my article one.this is my article one.this is my article one.this is my article one.this is my article one.this is my article one.this is my article one.this is my article one.this is my article one.
    </p>
    `
    
};
var articleOne = {
    title: 'Article One | Sendil',
    heading: 'Article One',
    date: 'August 23, 2017',
    content:` 
    <p> this is my article one.this is my article one.this is my article one.this is my article one.this is my article one.this is my article one.this is my article one.this is my article one.this is my article one.this is my article one.this is my article one.this is my article one.this is my article one.this is my article one.
    </p>
    <p> this is my article one.this is my article one.this is my article one.this is my article one.this is my article one.this is my article one.this is my article one.this is my article one.this is my article one.this is my article one.this is my article one.this is my article one.this is my article one.this is my article one.
    </p>
    <p> this is my article one.this is my article one.this is my article one.this is my article one.this is my article one.this is my article one.this is my article one.this is my article one.this is my article one.this is my article one.this is my article one.this is my article one.this is my article one.this is my article one.
    </p>
    `
    
};
var displayHtml= function(data){
    var title = data.title;
    var heading = data.heading;
    var date= data.date;
    var content = data.content;
    var htmlTemplate = `
    <html>
        <head>
            <title>
                ${title}
            </title>
            <meta name="viewport" content="width=device-width, initial-sacle=1" />
            <link href="ui/style.css" rel="stylesheet" />
        </head>
        <body>
            <div class="container">
                <div>
                    <a href='\'> Home</a>
                </div>
                <hr>
                <h3> 
                    ${heading}
                </h3>
                <div>
                    ${date}
                </div>
                <div>
                   ${content}        
                </div>
            </div>
        </body>
    </html>
    `;
    return(htmlTemplate);
};


app.get('/article-one', function(req,res){
   res.send(displayHtml(articleOne));
});

app.get('/article-two', function(req,res){
     res.send(displayHtml(articleTwo));
});

app.get('/article-three', function(req,res){
     res.send(displayHtml(articleThree));
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
