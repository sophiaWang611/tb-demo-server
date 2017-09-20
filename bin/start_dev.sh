#!/usr/bin/env bash
export NODE_ENV=development
export PORT=3100

node build/build.js

pm2 kill
pm2 start ./process.json
