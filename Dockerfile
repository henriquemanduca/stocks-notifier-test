FROM buildkite/puppeteer

WORKDIR /app

ENV NODE_ENV=production

COPY package.json /app

RUN npm install

COPY ./dist /app

CMD ["node", "server.js"]
