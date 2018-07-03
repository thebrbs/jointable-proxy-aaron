const express = require('express')
const morgan = require('morgan');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));

const clientBundles = './public/services';
const serverBundles = './templates/services';
const serviceConfig = require('./service-config.json');
const services = require('./loader.js')(clientBundles, serverBundles, serviceConfig);

const React = require('react');
const { renderToString } = require('react-dom/server');
const Layout = require('./templates/layout');
const App = require('./templates/app');
const Scripts = require('./templates/scripts');

const renderComponents = (components, props = {}) => {
  return Object.keys(components).map(item => {
    let component = React.createElement(components[item], props);
    return renderToString(component);
  });
};

app.get('/restaurant/:restaurantId', function(req, res) {
  let components = renderComponents(services, {restId: req.params.restaurantId});
  res.end(Layout(
    'JoinTable',
    App(...components),
    Scripts(Object.keys(services))
  ));
});

app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});


// const express = require('express');
// const proxy = require('express-http-proxy');
// const bodyParser = require('body-parser');
// const path = require('path');

// const app = express();

// app.use(bodyParser.json());
// app.use('/restaurant/:restaurantId', express.static(path.join(__dirname, '../public')));

// app.use('/reservations', proxy('http://cavareservations.us-west-2.elasticbeanstalk.com/'));
// app.use('/overviews', proxy('http://cavatableoverviews-env.5sves92ky9.us-west-1.elasticbeanstalk.com/'));
// app.use('/photos', proxy('CavatablePhotos-env-1.23pb2q7mim.us-east-2.elasticbeanstalk.com/'));
// app.use('/menus', proxy('http://cavatablemenus-env.5sves92ky9.us-west-1.elasticbeanstalk.com/'));
// app.use('/reviews', proxy('http://CavatableFec-env.psexkp69kr.us-west-1.elasticbeanstalk.com'));
