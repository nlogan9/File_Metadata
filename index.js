var express = require('express');
var cors = require('cors');
require('dotenv').config()
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }).single('upfile');

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: err });
    }
    if (!req.file) {
      return res.status(400).json({ error: 'Please send file' });
    }
    console.log(req.file);
    //console.log(req.body);
    res.json({ name: req.file.originalname, type: req.file.mimetype, size: req.file.size });
  });
});


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
