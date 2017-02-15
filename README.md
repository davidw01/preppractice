# Creating an HTTP server in JavaScript

In this assignment, you will create a small HTTP server:
a piece of JavaScript code that listens for HTTP requests
and creates HTTP responses. The assignment is designed to
give you some exercise in the following concepts:
* setting up a JavaScript project from scratch;
* using environment variables;
* writing JavaScript callback functions;
* deploying an application so that it is visible on the internet.

## Getting started

You should have received a "GitHub Classroom" invitation to start this
assignment through our class website. When you accept that, it will create
a clone of the repo that includes this README. Indeed, you are likely
reading this README in your own clone right now.

You'll likely want to find a mac or linux machine on which to complete this assignment.
(If you cannot, you prefer a different operating system, or your require counsel
in this regard, please contact the teaching staff. Many students use Cloud9,
Digital Ocean, AWS EC2.

**Unlike previous assignments, you will need to deploy this application somewhere.** I recommend [Heroku](https://devcenter.heroku.com/articles/deploying-nodejs), [Google Cloud Platform](https://cloud.google.com/nodejs/getting-started/hello-world) or [DigitalOcean](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-16-04). When you submit this assignment, you will need to submit a URL where your app is running. And, that app will need to be running when I do the grading.

As usual, there is a program that will do the grading in an automated fashion. The code for that program is here: [https://github.com/yale-cpsc-213/servers](https://github.com/yale-cpsc-213/servers) and you can find static binaries for Mac and Linux platforms at the following URLs:
* Mac [https://kljensen.s3.amazonaws.com/public/cpsc213servers/mac/cpsc213servers](https://kljensen.s3.amazonaws.com/public/cpsc213servers/mac/cpsc213servers)
* Linux [https://kljensen.s3.amazonaws.com/public/cpsc213servers/linux/cpsc213servers](https://kljensen.s3.amazonaws.com/public/cpsc213servers/linux/cpsc213servers)

To run the code, you'd so something like the following
```
$ ./cpsc213servers  test 'http://localhost:8000'
❌ FAIL - Your website is up (requesting /)
❌ FAIL - Some parts are protected
❌ FAIL - Strings API can convert to uppercase
❌ FAIL - Strings API can reverse strings
❌ FAIL - Strings API can concatenate
```

When you are passing all the tests, it will look like this:
```
$ ./cpsc213servers  test 'http://localhost:8000'
✅ PASS - Your website is up (requesting /)
✅ PASS - Some parts are protected
✅ PASS - Strings API can convert to uppercase
✅ PASS - Strings API can reverse strings
✅ PASS - Strings API can concatenate
```

Of course, your URL would not be "http://localhost:8000" except when you're working on your homework. When you submit, you will need to have it running, viewable on the internet. E.g., my homework is at 'https://arcane-plains-83078.herokuapp.com/'.

Each of these five tests are described below. And, if you have detailed questions you can peak at the [grading code](https://github.com/yale-cpsc-213/servers). Also, my completed homework assignment is deployed at [https://arcane-plains-83078.herokuapp.com](https://arcane-plains-83078.herokuapp.com). You can play with that app to see how yours should behave.

## What to use

You should use [npm](https://www.npmjs.com) or
[yarn](https://yarnpkg.com) to track your dependencies. You should use [Express](https://yarnpkg.com) or
[Hapi](https://hapijs.com) to write your server. There
is no need to use a database for this assignment.

## Some advice

* Everything you need to do this assignment is in the links above. 80% of what you need will be in the Hapi and Express documentation. I suggest starting with their "hello world" examples and working from there.
* If you recall back to the MVC-architecture readings, you should know that you're mostly working on the "controller" layer in this assignment. If you start with the "hello world" example from hapi or express, can you add a controller to pass the first few tests?
* Look at other people's starter apps for your platform of choice. E.g. if you're using express and heroku, google for "express and heroku" starter code.
* You might enjoy using [nodemon](https://github.com/remy/nodemon) to automatically reload your code when you edit it.
* In the following assignments, we'll be using these kinds of apps and making them more complicated. I will give you increasing amounts of guidance on how to structure your app. For now, there is benefit in figuring it out yourself.
* I will make a video Monday to help.

## Submitting

When you submit this assignment, you will need to do two things
* push your code to GitHub (as usual) and
* submit the URL pointing to your running application on the internet.

## The tests

* __Your website is up__

  It should return HTTP status 200 when an HTTP GET request to the `/` path is received. The body of the response Creating be anything you want: "woot", "ftw", whatever.

  ```
  curl -I 'https://arcane-plains-83078.herokuapp.com'
  HTTP/1.1 200 OK
  Server: Cowboy
  Connection: keep-alive
  Content-Type: text/html; charset=utf-8
  Cache-Control: no-cache
  Content-Length: 11
  Vary: accept-encoding
  Date: Sun, 29 Jan 2017 14:25:09 GMT
  Via: 1.1 vegur
  ```

* __Some parts are protected__

  It should return [HTTP status 401](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes)
  when an HTTP GET request to the `/protected` path is received. E.g.

  ```
  curl -I 'https://arcane-plains-83078.herokuapp.com/protected'
  HTTP/1.1 401 Unauthorized
  Server: Cowboy
  Connection: keep-alive
  Content-Type: text/html; charset=utf-8
  Cache-Control: no-cache
  Content-Length: 9
  Vary: accept-encoding
  Date: Sun, 29 Jan 2017 14:25:54 GMT
  Via: 1.1 vegur
  ```

* __Strings API can convert to uppercase__

  In the next few questions, we'll be working on a little
  API that transforms strings in various ways. The first
  part requires that you write an API at `/strings/upper`
  that accepts GET requests and expects a query parameter
  `value`. The HTTP response body should be the value of
  the `value` parameter, transformed to uppercase. E.g. see [https://arcane-plains-83078.herokuapp.com/strings/upper?value=woot](https://arcane-plains-83078.herokuapp.com/strings/upper?value=woot)

  ```
  curl https://arcane-plains-83078.herokuapp.com/strings/upper?value=woot
  WOOT
  ```

* __Strings API can can reverse strings__

  The second
  part requires that you write an API at `/strings/reverse`
  that accepts GET requests and expects a query parameter
  `value`. The HTTP response body should be the value of
  the `value` parameter, reversed. E.g. see [https://arcane-plains-83078.herokuapp.com/strings/reverse?value=woot](https://arcane-plains-83078.herokuapp.com/strings/reverse?value=woot)

  ```
  curl https://arcane-plains-83078.herokuapp.com/strings/upper?value=woot
  toow
  ```

* __Strings API can can concatenate strings__

  The second
  part requires that you write an API at `/strings/concatenate`
  that accepts GET requests and expects query parameters
  `value` and `times`. The HTTP response body should be the value of
  the `value` parameter repeated `times` times. E.g. see [https://arcane-plains-83078.herokuapp.com/strings/concatenate?value=woot&times=5](https://arcane-plains-83078.herokuapp.com/strings/concatenate?value=woot&times=5)

  ```
  curl 'https://arcane-plains-83078.herokuapp.com/strings/concatenate?value=woot&times=5'
  wootwootwootwootwoot
  ```
# prep2
