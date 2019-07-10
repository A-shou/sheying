#!/bin/sh
npm run build
rm -rf sheying.zip
zip -r sheying.zip dist
