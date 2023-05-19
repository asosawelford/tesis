const cookieParser = require('cookie-parser');
const multer = require('multer');
const logger = require('morgan');
const bodyParser = require('body-parser');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    const fileNameArr = file.originalname.split('.');
    cb(null, `${Date.now()}.${fileNameArr[fileNameArr.length - 1]}`);
  },
});
const upload = multer({ storage });
const path = require('path');
const express = require('express');
const port = process.env.PORT || 3000;

const app = express();
// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public/assets'));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
  });

app.use(express.static('uploads'));


app.use(express.static("public"));
app.use(express.json({ limit: "1mb" }));



app.listen(3000, '0.0.0.0', function() {
  console.log('Listening to port:  ' + 3000);
});

module.exports = app;


