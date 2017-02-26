FROM node:4.8.0-slim
MAINTAINER jllado

ENV HUBOT_HOME /hubot_home

# Install some dependencies
RUN npm install -g coffee-script yo generator-hubot

# make user for bot
# yo requires uid/gid 501
RUN groupadd -g 501 hubot && \
  useradd -d "$HUBOT_HOME" -m -u 501 -g 501 hubot

USER hubot
WORKDIR $HUBOT_HOME

# optionally override variables with docker run -e HUBOT_...
# Modify ./ENV file to override these options
ENV HUBOT_OWNER hubot
ENV HUBOT_NAME hubot
ENV HUBOT_ADAPTER slack
ENV HUBOT_DESCRIPTION Just a friendly robot
ENV HUBOT_SLACK_TOKEN=xoxb-XXXXXXXXXXX-XXXXXXXXXXXXXXXXXXXXXXXX
ENV HUBOT_JENKINS_URL=http://localhost:8080/jenkins/
ENV HUBOT_JENKINS_AUTH=user:token

# create hubot
RUN yo hubot --adapter ${HUBOT_ADAPTER} --owner ${HUBOT_OWNER} --name ${HUBOT_NAME} --description ${HUBOT_DESCRIPTION} --defaults --no-insight

# install some predefined plugins
RUN npm install hubot-jenkins-enhanced

COPY external-scripts.json external-scripts.json

# Override adapter with --env-file ENV
RUN export HUBOT_SLACK_TOKEN=${HUBOT_SLACK_TOKEN}
ENTRYPOINT bin/hubot
