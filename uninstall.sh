#!/bin/sh
docker-compose down
if [ $(docker images -aq --filter reference=dockermyhubot_hubot) ]; then
    docker rmi -f $(docker images -aq --filter reference=dockermyhubot_hubot)
else
    echo Already removed!
fi


