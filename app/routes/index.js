"use strict"

const express = require('express');
const router = require('express-promise-router')();

module.exports = (controller) => {
  router.get('/', function (req, res, next) {
    res.json(
      {
        title: 'Welcome to Algorithms backend',
        task: {
          api: 'GET /get-frequent-words',
          description: `Fetch data from http://terriblytinytales.com/test.txt and perform opertations`
        }
      });
  });
  router.get('/get-frequent-words', controller.getFrequentWords);
  return router;
}


