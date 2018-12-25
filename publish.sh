#!/bin/bash

FUNC_NAME=ticktick-lambda
ZIP_FILE=${FUNC_NAME}.zip
PROJECT=$(pwd)


rm -f $ZIP_FILE

echo "* Creating function zip file..."
cp -r src/ /tmp/src_tmp
cd /tmp/src_tmp && rm -rf node_modules
npm install --only=prod
zip -X -x coverage/* -x ticktick/test/* -x ticktick/test/ -x package-lock.json -r ${PROJECT}/${ZIP_FILE} *
cd $PROJECT && rm -rf /tmp/src_tmp

echo -e "\n* Pushing to AWS..."
aws lambda update-function-code --function-name $FUNC_NAME --zip-file fileb://${ZIP_FILE}

echo -e "\n* Done"
