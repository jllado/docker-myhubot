#!/bin/sh
cp docker-myhubot.service /etc/systemd/system/
systemctl daemon-reload
systemctl enable docker-myhubot.service
systemctl start docker-myhubot.service
