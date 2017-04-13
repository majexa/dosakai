FROM node:boron

RUN mkdir -p /usr/src/test
WORKDIR /usr/src/test

COPY package.json /usr/src/test
RUN npm install
RUN npm install --global babel-cli
COPY . /usr/src/test

