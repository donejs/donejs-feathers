# donejs-feathers - Full-stack realtime

[![Build Status](https://travis-ci.org/feathersjs/donejs-feathers.svg?branch=master)](https://travis-ci.org/feathersjs/donejs-feathers)
[![npm version](https://badge.fury.io/js/donejs-feathers.svg)](http://badge.fury.io/js/donejs-feathers)

![Full-stack realtime with DoneJS & Feathers](https://cloud.githubusercontent.com/assets/128857/15908290/25e7760c-2d7e-11e6-8a9e-18421cd87154.png)

A generator to quickly add FeathersJS to your DoneJS project.

## Using the generator

To add this generator to your DoneJS application run

```
donejs add feathers
```

DoneJS and FeathersJS make for a killer full-stack solution for creating apps.  This generator creates all of the model files and utilities needed to get both working together quickly. The current `2.0` version only supports the basic Feathers setup. UI generation has been removed and will likely move to separate generators in the future.  

**This generator could potentially overwrite files in an existing application. It is meant to be used immediately after generating a new DoneJS application.**

Here's a summary of the files that will be added or modified in a DoneJS project.  To understand more about how these modules work together, check out the [`can-connect-feathers` documentation](https://canjs.com/doc/can-connect-feathers.html).
- `app.js` - a `session` property is added to the `AppViewModel` that reads from the `Session` model's `current` property.
- `models/algebra.js` - contains algebra for `can-connect` that enables support for the Feathers query syntax.
- `models/behaviors.js` - contains the minimum `can-connect` behaviors that are needed to work with Feathers and realtime data.  The Feathers behaviors are added in the individual Model files, like `user.js` and `session.js`.
- `models/feathers-client.js` - sets up the Feathers client with Socket.io and points it to the location of the Feathers server.  It also configures all of the npm-installed Feathers plugins.
- `models/session.js` - handles authentication.  It connects the `Session` model to the `can-connect-feathers/session/` behavior.  It also automatically populates the `user` data using the `User` model.
- `models/user.js` a basic User model.  It uses the `can-connect-feathers/service/` behavior to connect to the Feathers server.  The default user endpoint is `/users`, but can be modified here.

The following packages will be added to your project from npm:
- `can-connect-feathers`
- `feathers`
- `feathers-hooks`
- `feathers-socketio`
- `feathers-authentication-client`
- `steal-socket.io`
- `socket.io-client`


## Developing

To make changes to this generator clone the repository and install the dependencies

```
git clone git@github.com:feathersjs/donejs-feathers.git
cd donejs-feathers
npm install
```

Then you can run the tests with

```
npm test
```
