var debug = require('debug')('travelapp:server');
var http = require('http');
var reload = require('reload');
var express = require('express');
var path = require('path');
var multer = require('multer');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const config = require('./config/database');
let Chat = require('./models/chat');


mongoose.connect(config.database);
let db = mongoose.connection;


// Check connection
db.once('open', function () {
    console.log('Connected to MongoDB');
});

// Check for DB errors
db.on('error', function (err) {
    console.log(err);
});


var app = express();
var server = http.createServer(app);
var io = require('socket.io')(server);

// view engine setup
app.use(express.static(path.join(__dirname, "public")));
app.use(multer({dest: './public/upload/temp'}).single('file'));
app.set('view engine', "ejs");
app.set('port', process.env.PORT || 3000);


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(express.static(__dirname + "/public"));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());


// Express Session Middleware
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}));

// Express Messages Middleware
app.use(require('connect-flash')());
app.use(function (req, res, next) {
    res.locals.messages = require('express-messages')(req, res);
    next();
});

// Express Validator Middleware
app.use(expressValidator({
    errorFormatter: function (param, msg, value) {
        var namespace = param.split('.')
            , root = namespace.shift()
            , formParam = root;

        while (namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param: formParam,
            msg: msg,
            value: value
        };
    }
}));

// Passport Config
require('./config/passport')(passport);
// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

app.get('*', function (req, res, next) {
    res.locals.user = req.user || null;
    next();
});


var index = require('./routes/index');
var users = require('./routes/users');
var admin = require('./routes/admin');
var staff = require('./routes/staff');
var user = require('./routes/appuser');
// Route Files
app.use("/", index);
app.use("/users", users);
app.use("/admin", admin);
app.use("/staff", staff);
app.use("/user", user);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });
// Set up connections


io.on('connection', function (socket) {

    app.locals.connectedUsers += 1;
    io.emit('updateLabel', {
        count: app.locals.connectedUsers,
        type: "Original Connection"
    });

    socket.on('disconnect', function () {
        app.locals.connectedUsers -= 1;
        io.emit('updateLabel', {
            count: app.locals.connectedUsers,
            type: "disconnect"
        });
    });

    socket.on('updateCounts', function () {
        io.emit('updateLabel', {
            count: app.locals.connectedUsers,
            type: "Update Counts"
        });
    });

    socket.on('message', function (data) {
        let newChat = new Chat({
            username: data.username,
            message: data.message
        });
        newChat.save(function (err) {
            if (err) {
                console.log(err);
                return;
            } else {
                console.log('success Admins added to database');
            }
        });
        io.emit('updateMessages', data);
    });
});

// Handle realods
reload(server, app);

// run server
server.listen(app.get('port'), function () {
    console.log("Web server listening on port " + app.get('port') + ' ENV: ' + process.env.NODE_ENV);
});

module.exports = app;
