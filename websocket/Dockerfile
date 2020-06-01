FROM node:14.3-alpine as base

RUN mkdir -p /home/node/app

WORKDIR /home/node/app

# Prevent the reinstallation of node modules at every changes in the source code
COPY package.json yarn.lock ./

RUN apk add --no-cache --virtual .gyp \
        python \
        make \
        g++ \
	&& yarn install \
	&& apk del .gyp

COPY . ./


FROM base as development

EXPOSE 25564
EXPOSE 25565

CMD yarn install && yarn start


FROM development as builder

RUN yarn build


FROM base as prod

COPY --from=builder /home/node/app/package.json ./
COPY --from=builder /home/node/app/lib ./lib

CMD node ./lib/index.js
