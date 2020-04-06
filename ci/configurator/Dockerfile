FROM node:alpine

WORKDIR /src

COPY files/src/package.json files/src/yarn.lock /src/

RUN yarn install

COPY files/ /

ENTRYPOINT [ "node" ]

CMD ["/src/index.js"]
