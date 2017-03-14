#!/bin/sh
docker build -t myhubot .
docker run -e HUBOT_SLACK_TOKEN=$1 -e HUBOT_JENKINS_URL=$2 -e HUBOT_JENKINS_AUTH=$3 -e TRAVELC_USER=$4 -e TRAVELC_PASS=$5 --name=myhubot -d myhubot

