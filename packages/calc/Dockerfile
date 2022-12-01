FROM mhart/alpine-node:14

# Env

ARG env
ARG commit_short_sha
ARG pipeline_created_at

# Timezone

RUN apk update
RUN apk add --update tzdata && \
                     cp /usr/share/zoneinfo/UTC /etc/localtime && \
                     echo "UTC" > /etc/timezone

# Apk

RUN apk add --update --no-cache --virtual runtime-deps \
                                          nano \
                                          # postgresql-client \
                                          readline \
                                          bash \
                                          htop

WORKDIR /server

# Packages

COPY package.json ./
COPY package-lock.json ./
COPY lerna.json ./

RUN npm i -g npm

RUN HUSKY_SKIP_INSTALL=true HUSKY_SKIP_HOOKS=true npm ci

# Service files

COPY packages/calc ./packages/calc
COPY packages/shared ./packages/shared
COPY packages/tsconfig.json ./packages/tsconfig.json
COPY packages/tsconfig.build.json ./packages/tsconfig.build.json

RUN npm run calc:build

ENV NODE_ENV ${env}
ENV COMMIT_SHORT_SHA ${commit_short_sha}
ENV PIPELINE_CREATED_AT ${pipeline_created_at}

RUN touch build_info.txt
RUN echo "env: ${env}" >> build_info.txt
RUN echo "commit_short_sha: ${commit_short_sha}" >> build_info.txt
RUN echo "pipeline_created_at: ${pipeline_created_at}" >> build_info.txt

CMD npm run calc:start:build
