
# Blaster

[![Build Status](https://travis-ci.org/unclebean/blaster.svg?branch=poc-koa)](https://travis-ci.org/unclebean/blaster/branches#)
[![Gitter](https://img.shields.io/gitter/room/gitterHQ/gitter.svg)](https://gitter.im/blaster-record-replay) 

**Blaster is a tool of record & replay RESTful services for front-end projects, build with typescript**

## Dev

Install dependencies

    npm install

Compile Blaster

    npm run compile

Run dev scripts

    npm run test / test:watch / lint / lint:watch

Link npm package to local

    npm link

Run Blaster

	blaster

## TODO & feature list

| Feature                                         | Status     | Owner     |
| ----------------------------------------------- |:----------:| ---------:|
| yaml server configuration handler               | TODO       |   Hou     |
| start **http/https** server                     | TODO       |           |
| setup NeDB                                      | TODO       |   Jeff    |
| record get/post request to local database       | TODO       |           |
| replay response from local database             | TODO       |           |
| edit response data                              | TODO       |           |
| create new endpoint & record in local database  | TODO       |           |
| multiple real backend support                   | TODO       |           |
| whitelist endpoint support                      | TODO       |           |
