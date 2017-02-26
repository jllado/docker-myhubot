#!/bin/sh
docker build -t myhubot .
docker run -e HUBOT_SLACK_TOKEN=xoxb-XXXXXXXXXXXXXX-XXXXXXXXXXXXXXXXXX -e HUBOT_JENKINS_URL=http://localhost:8080/jenkins/ -e HUBOT_JENKINS_AUTH=user:token --name=myhubot -d myhubot

