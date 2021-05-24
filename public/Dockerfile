FROM node:lts-alpine@sha256:3689ad4435a413342ccc352170ad0f77433b41173af7fe4c0076f0c9792642cb

ENV NODE_ENV production

WORKDIR /home/node/public

COPY --chown=node:node . /home/node/public

RUN npm ci --only=production

USER node

CMD ["node", "./src/index.js"]

EXPOSE 3000
