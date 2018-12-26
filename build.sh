#!/bin/bash
yarn build --prod
docker build . -t  docker.io/stephanwels/game-of-three-client