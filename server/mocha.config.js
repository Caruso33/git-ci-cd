const chai = require('chai');
const chaiHttp = require('chai-http');
const dotenv = require('dotenv');
const path = require('path');
const app = require('./src/app');

let server = null;

before((done) => {
  // ensure that the node env is test
  process.env.NODE_ENV = 'test';

  // load environment variables from env file
  dotenv.config({
    path: path.join(__dirname, '.env.test'),
  });

  // use chaiHttp
  chai.use(chaiHttp);

  // add test globals
  global.chai = chai;
  global.expect = chai.expect;

  server = app.listen(process.env.PORT || 4000, () => {
    global.server = `http://127.0.0.1:${server.address().port}`;
    done();
  })
});

after((done) => {
  server.close();
  done();
});