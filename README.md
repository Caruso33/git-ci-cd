# Git-CI/CD

Fork of https://github.com/ian-antking/raspberry-ci

A simple express app for setting up continuous integration in a raspberry-pi project.

## Getting Set Up

Clone this repo onto your server and install:

```
git clone https://github.com/Caruso33/git-ci-cd
cd git-ci-cd
npm install
```

The express app requires a `.env` folder in the root of the repo:

```
touch .env
```

Edit the file so that it contains the following key/value pairs.

```
PORT=<PORT_NUMBER>
PROJECT_PATH=/Users/<YOUR_USER_NAME>/<PROJECTS_DIRECTORY>
SECRET=<SECRET_STRING>
GITHUB_USER=<USERNAME_OF_PROJECTS_OWNER>
GIT_SERVER=<GITHUB_SERVER_URL>
BASE_IMAGE=<e.g.: node:lts-alpine3.9 *OR* balenalib/raspberry-pi-alpine-node>
```

The project path must point to the directory where you store your projects (e.g. /Users/pi/Projects).

The server will also need a way to be accessible from the internet, this can be down with port-forwarding, ngrok or localtunnel.

## Usage

Run the app:

`development` > `make dev`

`production` > `make prod`

`test` > `make test`

POST requests to `/event` will trigger the app to perform a `git pull` for the repo specified in `PROJECT_PATH`.

This can be combined with a github webhook so that any push events to your repo will cause that code to be integrated into your server.

## create a secret - node repl

```
const crypto = require('crypto')
crypto.randomBytes(32).toString('hex')
```
