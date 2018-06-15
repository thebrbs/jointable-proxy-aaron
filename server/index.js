const express = require('express');
const proxy = require('express-http-proxy');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.use(bodyParser.json());
app.use('/restaurant/:restaurantId', express.static(path.join(__dirname, '../public')));

app.use('/reservations', proxy('http://localhost:3001'));
app.use('/reviews', proxy('http://localhost:3002'));
app.use('/overviews', proxy('http://localhost:3003'));
app.use('/photos', proxy('http://localhost:3004'));
app.use('/menus', proxy('http://localhost:3005'));

const port = process.env.PORT || 3000;
app.listen(port, console.log(`Listening on ${port}`));
