#!/bin/sh
docker build -t myhubot .
docker run -e HUBOT_SLACK_TOKEN=$1 -e HUBOT_JENKINS_URL=$2 -e HUBOT_JENKINS_AUTH=$3 --name=myhubot -d myhubot

