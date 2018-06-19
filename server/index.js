const express = require('express');
const proxy = require('express-http-proxy');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.use(bodyParser.json());
app.use('/restaurant/:restaurantId', express.static(path.join(__dirname, '../public')));

app.use('/reservations', proxy('http://cavareservations.us-west-2.elasticbeanstalk.com/'));
app.use('/overviews', proxy('http://cavatableoverviews-env.5sves92ky9.us-west-1.elasticbeanstalk.com/'));
app.use('/photos', proxy('CavatablePhotos-env-1.23pb2q7mim.us-east-2.elasticbeanstalk.com/'));
app.use('/menus', proxy('http://cavatablemenus-env.5sves92ky9.us-west-1.elasticbeanstalk.com/'));
app.use('/reviews', proxy('http://CavatableFec-env.psexkp69kr.us-west-1.elasticbeanstalk.com'));

const port = process.env.PORT || 3000;
app.listen(port, console.log(`Listening on ${port}`));
