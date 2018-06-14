const express = require('express');
const proxy = require('express-http-proxy');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.use(bodyParser.json());
app.use('/', express.static(path.join(__dirname, '../public')));

app.use('/photos/photoBundle.js', proxy('http://localhost:3004'));


const port = process.env.PORT || 3000;
app.listen(port, console.log(`Listening on ${port}`));
