#!/bin/bash
set -e



# Get current script directory.
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" >/dev/null 2>&1 && pwd)"
cd "$DIR" || exit

rm -rf /dist
rm -rf /build/dist
cd ..
npm install
npm run build
cd build
cp -rf ../dist dist
docker build -t huanghao/arcus-admin:0.0.1 .
docker run -d -p 7001:7001 huanghao/arcus-admin:0.0.1
rm -rf dist






