ARG base_image=$base_image

FROM $base_image

RUN apk update && apk upgrade && \
    apk add --no-cache bash git openssh

ARG port=4000
ARG env="production"

WORKDIR /app

COPY package*.json ./

RUN mkdir ./projects

EXPOSE $port

RUN if [ $env = "development" ]; \
	then npm install;  \
	else npm install --only=production; \
	fi

COPY . .