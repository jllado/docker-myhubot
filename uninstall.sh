#!/bin/sh
if [ $(docker ps -aq --filter ancestor=myhubot) ]; then
    docker stop $(docker ps -aq --filter ancestor=myhubot)
    docker rm -f $(docker ps -aq --filter ancestor=myhubot)
fi
if [ $(docker images -aq --filter reference=myhubot) ]; then
    docker rmi -f $(docker images -aq --filter reference=myhubot)
else
    echo Already removed!
fi


