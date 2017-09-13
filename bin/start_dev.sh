#!/usr/bin/env bash
export NODE_ENV=development
export PORT=3100

pm2 kill
pm2 start ./process.json