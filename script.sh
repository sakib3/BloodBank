#!/bin/bash
#get process id of mongod
mongod_process_id=$(pgrep mongod)
if [[ -z $mongod_process_id ]]; then
    #mongod
    echo 'mongod'
fi

eval `cat ../bloodBankExportENV.sh`
# running test
npm test
#running server
#npm start
