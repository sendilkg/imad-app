var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var crypto = require('crypto');
var bodyParser = require('body-parser');
var session = require('express-session');

var config = {
    user: 'sendilcareer',
    password: process.env.DB_PASSWORD,
    database: 'sendilcareer',
    host: 'db.imad.hasura-app.io',
    port: 5432
};

var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(session({
    secret: 'some-random-secret-value',
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 30} 
}));
/*var articles = {
    'article-one': {
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
    },
    'article-two': {
        title: 'Article Two | Sendil',
        heading: 'Article Two',
        date: 'August 28, 2017',
        content:` 
        <p> this is my article one.this is my article one.this is my article one.this is my article one.this is my article one.this is my article one.this is my article one.this is my article one.this is my article one.this is my article one.this is my article one.this is my article one.this is my article one.this is my article one.
        </p>
        `
    },
    'article-three': {
        title: 'Article Three | Sendil',
        heading: 'Article Three',
        date: 'Januaryt 28, 2017',
        content:` 
        <p> this is my article one.this is my article one.this is my article one.this is my article one.this is my article one.this is my article one.this is my 
        </p>`
    }
};*/
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
            <link href="/ui/style.css" rel="stylesheet" />
            <script type="text/javascript" src="/ui/main.js"></script>
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
                    ${date.toDateString()}
                </div>
                <div>
                   ${content}        
                </div>
                <hr/>
                Post Your comments here:
                <br>
                <input type="text" id="comment">
                </input>
                <input type="button" id="postbtn" value="Post"></input>
                <br>
                <br>
                <ul id="commentlist">
                </ul>
            </div>
        </body>
    </html>
    `;
    return(htmlTemplate);
};

counter = 0;
app.get('/counter', function(req,res){
   counter = counter + 1;
   res.send(counter.toString());
});

function hash(input, salt)
{
    var hashed = crypto.pbkdf2Sync(input, salt, 10000, 512, 'sha512');
    return["pbkdf2","10000",salt,hashed.toString('hex')].join('$');
}
app.get('/hash/:input', function(req, res){
    
    var hashedString = hash(req.params.input, 'This-is-a-random-string');
    res.send(hashedString);
});

var pool = new Pool(config);
app.get('/test-db', function(req, res){
    
    pool.query('SELECT * FROM test', function(err, result){
        if(err){
             res.status(500).send(err.toString());
        }
       else{
           res.send(JSON.stringify(result.rows));
       }
    })
    
});

app.post('/create-user', function(req, res){
    
    var username = req.body.username;
    var password = req.body.password;
    
    var salt = crypto.randomBytes(128).toString('hex');
    var dbString = hash(password,salt);
    pool.query('INSERT INTO users (username,password) VALUES ($1,$2)',[username,dbString],function(err, result){
        if(err){
             res.status(500).send(err.toString());
        }
        else{
           res.send("User Successfully Added: "+ username);
       }        
    });
    
});

app.post('/login', function(req, res){
    
    var username = req.body.username;
    var password = req.body.password;
    
    pool.query('SELECT * FROM users WHERE username=$1',[username],function(err, result){
        if(err){
             res.status(500).send(err.toString());
        }
        else{
            
            if(result.rows.length === 0){
                res.status(403).send("username/password is invalid!");
            }
            else{
                var dbString = result.rows[0].password;
                var salt = dbString.split('$')[2];
                var hassedPassword = hash(password, salt);
                if(hassedPassword === dbString){
                    //set the session
                    req.session.auth = {userId: result.rows[0].id};
                    
                     res.send("Username/password matched");
                }
                else{
                    res.status(403).send("username/password is invalid!");
                }
                
            }
       }        
    });
    
});

app.get('/check-login', function(req, res){
    if(req.session && req.session.auth && req.session.auth.userId){
        res.send('you are logged in: '+ req.session.auth.userId.toString());
    }
    else
    {
        res.send('you are not logged in');
    }
    
});
app.get('/logout', function(req, res){
    delete req.session.auth;
     res.send('you are logged out');
});

app.get('/articles/:articleFiled', function(req,res){
    
    pool.query("SELECT * FROM articles WHERE title=$1" ,[req.params.articleFiled], function(err, result){
        if(err){
            res.status(500).send(err.toString());
        }
        else{
            if(result.rows.length === 0 ){
                 res.status(404).send("Article not found");
            }
            else{
                var articleData = result.rows[0];
                 res.send(displayHtml(articleData));
            }
        }
    });
   
});

var names = [];
app.get('/submit-name', function(req, res){
    var name = req.query.name;
    names.push(name);
    res.send(JSON.stringify(names));
    
});

var posts = [];
app.get('/post-comment', function(req, res){
    var post = req.query.comment;
    posts.push(post);
    res.send(JSON.stringify(posts));
    
});

app.get('/:articleFiled', function(req,res){
    var articleName = req.params.articleFiled;
    res.send(displayHtml(articles[articleName]));
});





app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});
app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
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
