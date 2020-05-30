#!/usr/bin/env bash

services=("api:api-streaming." "mercure:mercure-streaming." "vulcain:vulcain-streaming.")
folder="StreamingAppLiveMercure"
text="version: '3.4'
services:"

for k in "${services[@]}" ; do
    key=${k%%:*}
    value=${k#*:}
    text+="
  $key-$folder:
    labels:
      - traefik.http.routers.$key-$folder.entrypoints=web-secure
      - traefik.http.routers.$key-$folder.rule=Host(\`${value}\${DOMAIN}\`)
      - traefik.http.routers.$key-$folder.tls=true
      - traefik.http.routers.$key-$folder.tls.domains[0].main=\${DOMAIN}
      - traefik.http.routers.$key-$folder.tls.domains[0].sans=*.\${DOMAIN}
      - traefik.http.routers.$key-$folder.tls.certresolver=sample
"
done

echo "$text" > ./docker-compose.override.yml
