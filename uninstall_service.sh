#!/bin/sh
systemctl stop docker-myhubot.service
systemctl disable docker-myhubot.service
rm /etc/systemd/system/docker-myhubot.service 
