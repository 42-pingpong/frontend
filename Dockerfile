FROM node:18-alpine

WORKDIR /var/frontend

RUN apk add --no-cache dumb-init git tzdata curl && \
	cp /usr/share/zoneinfo/Asia/Seoul /etc/localtime && \
    echo "Asia/Seoul" > /etc/timezone

COPY react.sh /var/frontend/react.sh
RUN chmod +x /var/frontend/react.sh 

COPY package.json /var/frontend/package.json
RUN npm install

COPY .env /var/frontend/.env

ENTRYPOINT ["/usr/bin/dumb-init", "--"]

CMD ["/bin/ash", "/var/frontend/react.sh"]
EXPOSE ${REACT_PORT} 
