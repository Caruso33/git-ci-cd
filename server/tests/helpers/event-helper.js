const request = require('supertest');

exports.pushEvent = (app, data) => new Promise((resolve, reject) => {
  request(app)
  .post(`${global.API_URL}/event`)
  .set('x-hub-signature', 'sha1=027242ab59cc2034825073faaff5fadf993bc536')
  .send(data)
  .end((error, response) => {
    if (error) {
      reject(error);
    } else {
      console.log(response)
      resolve(response);
    }
  });
})