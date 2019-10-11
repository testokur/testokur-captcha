FROM hahoo/node-gm:latest
RUN apt-get update \
  && apt-get install -y --no-install-recommends graphicsmagick \
  && apt-get autoremove -y \
  && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
RUN npm ci --only=production
COPY . .

EXPOSE 8080
RUN mkdir Images
CMD [ "node", "server.js" ]
