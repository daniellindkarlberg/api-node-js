var express = require('express');
mongoose = require('mongoose');
var uri = 'mongodb://deltaplex:Dessertme35@ds060749.mlab.com:60749/danielsapi';
bodyParser = require('body-parser');
mongoose.Promise = global.Promise
mongoose.connect(uri);

var db = mongoose.connection;

var Student = require('./models/student');
var Teacher = require('./models/teacher');

var app = express();

var port = process.env.PORT || 3000;
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

studentRouter = require('./Routes/studentRoutes')(Student);
teacherRouter = require('./Routes/teacherRoutes')(Teacher);

app.use('/api/students', studentRouter);
app.use('/api/teachers', teacherRouter);



app.get('/', function (req, res) {
    res.send('welcome to my api');

});

app.listen(port, function () {

    console.log('Gulp is running my app on PORT: ' + port);

});
