#!/bin/bash
yarn build --prod
docker build -t stephanwels/game-of-three-client .
