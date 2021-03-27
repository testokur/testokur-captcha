FROM node:erbium-alpine AS dev
WORKDIR /app
COPY . /app/

# STAGE: Builder
FROM node:erbium AS builder
WORKDIR /app
COPY --from=dev /app /app
RUN yarn && yarn build

# STAGE: Prod Dependencies Builder
FROM node:erbium-alpine AS prod-dependencies
WORKDIR /app
COPY ["package.json", "yarn.lock", "./"]
RUN yarn install --prod


# STAGE: Prod Deploy Ready Image
FROM node:erbium AS prod
RUN apt-get update \
  && apt-get install -y --no-install-recommends graphicsmagick \
  && apt-get autoremove -y \
  && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*
EXPOSE 8080
WORKDIR /app
COPY --from=builder /app/dist /app/dist
COPY --from=prod-dependencies /app/node_modules /app/node_modules
RUN mkdir Images
CMD [ "node", "dist/index.js" ]