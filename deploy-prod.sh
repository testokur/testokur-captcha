#!/bin/bash
docker pull nazmialtun/testokur-captcha:latest
docker stop testokur-captcha && docker rm --force testokur-captcha
docker run -d  \
	--name testokur-captcha \
	--restart=always  \
	--network=testokur \
  --env-file /home/env/captcha.env \
	--network-alias=testokur-captcha \
	nazmialtun/testokur-captcha:latest
echo Y | docker system prune
