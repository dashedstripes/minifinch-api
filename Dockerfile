FROM node:7

RUN mkdir /code
WORKDIR /code

ADD package.json /code/package.json
RUN npm install

ADD . /code