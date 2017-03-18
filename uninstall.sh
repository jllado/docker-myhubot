#!/bin/sh
docker-compose -p myhubot down
if [ $(docker images -aq --filter reference=myhubot_hubot) ]; then
    docker rmi -f $(docker images -aq --filter reference=myhubot_hubot)
else
    echo Already removed!
fi


