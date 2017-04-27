FROM phusion/baseimage

RUN apt-get update -y
RUN apt-get install -y build-essential chrpath libssl-dev libxft-dev
RUN apt-get install libfreetype6 libfreetype6-dev
RUN apt-get install libfontconfig1 libfontconfig1-dev
RUN apt-get install -y wget

RUN export PHANTOM_JS="phantomjs-1.9.8-linux-x86_64" && \
  wget https://bitbucket.org/ariya/phantomjs/downloads/$PHANTOM_JS.tar.bz2 && \
  tar xvjf $PHANTOM_JS.tar.bz2

RUN mv phantomjs-1.9.8-linux-x86_64 /usr/local/share
RUN ln -sf /usr/local/share/phantomjs-1.9.8-linux-x86_64/bin/phantomjs /usr/local/bin

RUN apt-get install -y mc

# install nodejs
RUN curl -sL https://deb.nodesource.com/setup_7.x | bash -
RUN apt-get install -y nodejs

ADD startup/phantomjs.sh /etc/service/phantomjs/run
RUN chmod +x /etc/service/phantomjs/run

COPY ./server /etc/service/dosakai/server
ADD startup/dosakai.sh /etc/service/dosakai/run
RUN chmod +x /etc/service/dosakai/run

# FROM node:boron

# install from base image
# run phantom
# test phantom
# install node:boron

#RUN mkdir -p /usr/src/test
#WORKDIR /usr/src/test
#
#COPY package.json /usr/src/test
#RUN npm install
#RUN npm install --global babel-cli
#COPY . /usr/src/test
