#!/bin/sh
cd myhubot
npm install
mocha --compilers "coffee:coffee-script/register" tests/daily_bookings-test.js
