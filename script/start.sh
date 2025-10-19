#!/usr/bin/env sh

pm2 start ./dist/main.js --name name;
pm2 logs;
