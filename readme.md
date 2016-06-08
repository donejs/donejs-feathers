# donejs-feathers

[![Build Status](https://travis-ci.org/feathersjs/donejs-feathers.svg?branch=master)](https://travis-ci.org/feathersjs/donejs-feathers)
[![npm version](https://badge.fury.io/js/donejs-feathers.svg)](http://badge.fury.io/js/donejs-feathers)

A generator to quickly add FeathersJS to your DoneJS project.

## Using the generator

To add this generator to your DoneJS application run

```
donejs add feathers
```

DoneJS and FeathersJS make for a killer full-stack solution for creating apps.  This generator will help you get both working together quickly.  You can either generate a basic Feathers connection, or you can opt to generate a full site template with an included CSS framework.

## Basic Feathers connection
The `Basic feathers connection` option will use the [can-connect-feathers](https://github.com/feathersjs/can-connect-feathers) package to generate a connection.  You can then use the DoneJS generator to create supermodels to work with it.  See the [can-connect-feathers documentation](https://github.com/feathersjs/can-connect-feathers) to see how easy it is to make a can-connect supermodel work with `can-connect-feathers`.

After specifying the connection options, you'll have the opportunity to create a few more files that are pre-configured to work with SSR.

## Full Site Layout

Choose the `Full site layout` option to create a basic application with a popular CSS framework.  The generated site will be fully functional with [JavaScript Web Token](https://jwt.io/)-based authentication and Server-Side Rendering fully functional.  The site includes a home page with docs, a signup/login page and a pretty-much blank `dashboard` page as a placeholder for the app.

For the full-site solution, the following CSS frameworks are supported:

 * Bootstrap 3 - [getbootstrap.com](http://getbootstrap.com/)
 * Foundation - [foundation.zurb.com](http://foundation.zurb.com/)
 * Pure - [purecss.io](http://purecss.io)


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
