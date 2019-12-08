FROM node:alpine

WORKDIR /src

COPY files/src/package*.json ./

RUN yarn install

COPY files/ /

ENTRYPOINT [ "yarn" ]

CMD [ "run", "start" ]
