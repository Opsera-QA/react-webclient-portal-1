#!/bin/bash
set -xe
nodeenv=${1:-kube-prod}
docker build -t opsera-reactapp:$nodeenv --build-arg build_env=$nodeenv  ../../
docker run --rm \
        440953937617.dkr.ecr.us-east-2.amazonaws.com/kubectl \
        aws ecr get-login-password \
        --region us-east-2 \
        | docker login --username AWS \
        --password-stdin 440953937617.dkr.ecr.us-east-2.amazonaws.com

date_tag=`date +%-d-%m-%Y-%T | sed 's/:/-/g'`
docker tag opsera-reactapp:$nodeenv 440953937617.dkr.ecr.us-east-2.amazonaws.com/opsera-reactapp:$nodeenv
docker tag opsera-reactapp:$nodeenv 440953937617.dkr.ecr.us-east-2.amazonaws.com/opsera-reactapp:$nodeenv-${date_tag}

docker push 440953937617.dkr.ecr.us-east-2.amazonaws.com/opsera-reactapp:$nodeenv
docker push 440953937617.dkr.ecr.us-east-2.amazonaws.com/opsera-reactapp:$nodeenv-${date_tag}


