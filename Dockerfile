FROM node:10.16.3-alpine
ENV HOST 0.0.0.0
ENV PORT0 9991
##更新施时区
RUN apk --no-cache add tzdata &&  ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime && echo "Asia/Shanghai" > /etc/timezone 
RUN mkdir -p /app
COPY . /app
WORKDIR /app
EXPOSE 9991
ENV NODE_ENV=host
RUN npm config set registry https://registry.npm.taobao.org/
RUN npm install
CMD npm run build && npm run start
