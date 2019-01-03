#!/bin/bash

FUNC_NAME=ticktick-lambda
ZIP_FILE=${FUNC_NAME}.zip
PROJECT=$(pwd)

create_function_zip() {
    echo "* Creating function zip file..."

    rm -f $ZIP_FILE
    cp -r src/ /tmp/src_tmp
    cd /tmp/src_tmp && rm -rf node_modules
    npm install --only=prod
    zip -X -x coverage/* -x ticktick/test/* -x ticktick/test/ -x package-lock.json -r ${PROJECT}/${ZIP_FILE} *
    cd $PROJECT && rm -rf /tmp/src_tmp
}

publish_function(){
    echo -e "\n* Publishing '$FUNC_NAME'..."
    aws lambda update-function-code --function-name $FUNC_NAME --zip-file fileb://${ZIP_FILE}
}


set -e
test -n "$1" && FUNC_NAME=$1

create_function_zip
publish_function

echo -e "\n* Done"
