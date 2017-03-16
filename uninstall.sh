#!/bin/sh
if [ $(docker ps -aq --filter name=dockermyhubot_hubot_1) ]; then
    docker stop $(docker ps -aq --filter name=dockermyhubot_hubot_1)
    docker rm -f $(docker ps -aq --filter name=dockermyhubot_hubot_1)
fi
if [ $(docker ps -aq --filter name=dockermyhubot_mongo_1) ]; then
    docker stop $(docker ps -aq --filter name=dockermyhubot_mongo_1)
    docker rm -f $(docker ps -aq --filter name=dockermyhubot_mongo_1)
fi
if [ $(docker images -aq --filter reference=dockermyhubot_hubot) ]; then
    docker rmi -f $(docker images -aq --filter reference=dockermyhubot_hubot)
else
    echo Already removed!
fi


