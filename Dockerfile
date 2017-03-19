FROM node:6.10.0-slim
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
ENV HUBOT_NAME kungfumasters_bot
ENV HUBOT_ADAPTER telegram
ENV HUBOT_DESCRIPTION Just a friendly robot
ENV TELEGRAM_TOKEN=xxxxxx:xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
ENV HUBOT_JENKINS_URL=http://localhost:8080/jenkins/
ENV HUBOT_JENKINS_AUTH=user:token
ENV TRAVELC_USER=user
ENV TRAVELC_PASS=pass
ENV MONGODB_URL=mongodb://myhubot_mongo_1/hubot-brain

# create hubot
RUN yo hubot --adapter ${HUBOT_ADAPTER} --owner ${HUBOT_OWNER} --name ${HUBOT_NAME} --description ${HUBOT_DESCRIPTION} --defaults --no-insight

COPY myhubot/package.json package.json
COPY myhubot/external-scripts.json external-scripts.json
ADD myhubot/domain domain
ADD myhubot/scripts scripts

ENTRYPOINT bin/hubot
