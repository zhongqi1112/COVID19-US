#!/usr/bin/env bash

# build deploy package
npm run build

# copy cname file
cp ./docs/CNAME ./dist

# renew deployment folder
rm -rf ./docs
mv ./dist ./docs
