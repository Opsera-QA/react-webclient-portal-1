#!/bin/bash
set -xe
docker stop opsera-reactapp || true
docker rm opsera-reactapp || true

#freetrial
docker build -t opsera-reactapp:freetrial --build-arg build_env=freetrial  ..
docker run -p 8000:80 --name opsera-reactapp --restart unless-stopped -d opsera-reactapp:freetrial
docker ps -a
docker port opsera-reactapp
docker logs -f opsera-reactapp


