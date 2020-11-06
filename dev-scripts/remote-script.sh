#!/bin/bash
set -xe;
docker ps -a
docker stop opsera-reactapp || true
docker rm opsera-reactapp || true
docker image prune -a -f
aws ecr get-login-password --region us-east-2 | docker login --username AWS --password-stdin 440953937617.dkr.ecr.us-east-2.amazonaws.com
docker pull 440953937617.dkr.ecr.us-east-2.amazonaws.com/opsera-reactapp:freetrial
docker run \
    --name opsera-reactapp \
    --restart unless-stopped \
    -p 8000:80 \
    -d 440953937617.dkr.ecr.us-east-2.amazonaws.com/opsera-reactapp:freetrial
docker ps -a
echo "Successfully deployed reactapp"
