#!/bin/bash
set -xe
aws --profile opsera-sys ecr get-login-password --region us-east-2 | docker login --username AWS --password-stdin 440953937617.dkr.ecr.us-east-2.amazonaws.com
docker build -t opsera-reactapp:kube-generic --build-arg build_env=kube-generic  ../../

date_tag=`date +%-d-%m-%Y-%T | sed 's/:/-/g'`
docker tag opsera-reactapp:kube-dev 440953937617.dkr.ecr.us-east-2.amazonaws.com/opsera-reactapp:kube-dev
docker tag opsera-reactapp:kube-dev 440953937617.dkr.ecr.us-east-2.amazonaws.com/opsera-reactapp:kube-dev-${date_tag}

docker push 440953937617.dkr.ecr.us-east-2.amazonaws.com/opsera-reactapp:kube-dev
docker push 440953937617.dkr.ecr.us-east-2.amazonaws.com/opsera-reactapp:kube-dev-${date_tag}
