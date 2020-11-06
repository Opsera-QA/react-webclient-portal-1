#!/bin/bash
set -xe
docker stop opsera-reactapp || true
docker rm opsera-reactapp || true
docker build -t opsera-reactapp:freetrial --build-arg build_env=freetrial  ..

#Push to AWS.
aws ecr get-login-password --region us-east-2 | docker login --username AWS --password-stdin 440953937617.dkr.ecr.us-east-2.amazonaws.com
docker tag opsera-reactapp:freetrial 440953937617.dkr.ecr.us-east-2.amazonaws.com/opsera-reactapp:freetrial
docker push 440953937617.dkr.ecr.us-east-2.amazonaws.com/opsera-reactapp:freetrial
