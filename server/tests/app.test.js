const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
const eventHelper = require("./helpers/event-helper");
const eventFactory = require("./helpers/event-factory");
const app = require("../src/app");
const exec = require("child_process").exec;
const request = require('supertest');

const projectsPath = fs.existsSync("/.dockerenv")
  ? "/app/projects/"
  : `${process.env.PROJECT_PATH}`;

let server = null;

beforeAll((done) => {
  // ensure that the node env is test
  process.env.NODE_ENV = "test";

  // load environment variables from env file
  dotenv.config({
    path: path.join(__dirname, "../../.env.test"),
  });

  server = app.listen(process.env.PORT || 4000, () => {
    // global.server = `http://127.0.0.1:${server.address().port}`;
    global.API_URL = "http://localhost:4000";
    done();
  });
});

describe("/event", () => {
  describe("post", () => {
    describe("repo is not local", () => {
      it("clones a new copy of the repo and returns a 201", async (done) => {
        const event = eventFactory.createEvent("test-1");

        const { statusCode, body } = await request(app)
          .post(`${global.API_URL}/event`)
          .set(
            "x-hub-signature",
            "sha1=027242ab59cc2034825073faaff5fadf993bc536"
          )
          .send(event);

        expect(res.status).toBe(201);
        expect(fs.existsSync(`${projectsPath}/test-1`)).toBe(true);
        done();

        //   .catch((error) => done(error));
      });
    });

    // describe("repo is not local", () => {
    //   it("clones a new copy of the repo and returns a 201", (done) => {
    //     const event = eventFactory.createEvent("test-1");

    //     eventHelper
    //       .pushEvent(server, event)
    //       .then((res) => {
    //         expect(res.status).toBe(201);
    //         expect(fs.existsSync(`${projectsPath}/test-1`)).toBe(true);
    //         done();
    //       })
    //       .catch((error) => done(error));
    //   });
    // });
  });
});

// afterAll((done) => {
//   server.close();
//   console.log(`Cleaning up test repos in ${process.env.PROJECT_PATH}`);
// //   exec(`rm -rf /app/projects/test*`, execCallback);
//   done();
// });

// function execCallback(error, stdout, stderr) {
//   if (error) {
//     console.log(error);
//   }
//   if (stderr) {
//     console.log(stderr);
//   }
//   if (stdout) {
//     console.log(stdout);
//   }
// }
