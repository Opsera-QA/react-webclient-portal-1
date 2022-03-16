#!/bin/bash
set -xe
docker stop opsera-reactapp || true
docker rm opsera-reactapp || true

#kube-generic
docker build -t opsera-reactapp:kube-generic --build-arg build_env=kube-generic  ..
docker run -p 8000:80 --name opsera-reactapp --restart unless-stopped -d opsera-reactapp:kube-generic
docker ps -a
docker port opsera-reactapp
docker logs -f opsera-reactapp