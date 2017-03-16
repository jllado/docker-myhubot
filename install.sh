#!/bin/sh
export HUBOT_SLACK_TOKEN=$1
export HUBOT_JENKINS_URL=$2
export HUBOT_JENKINS_AUTH=$3
export TRAVELC_USER=$4
export TRAVELC_PASS=$5
docker-compose up -d

