FROM node:21.1-alpine3.18 AS build
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build --prod

FROM nginx:1.25-alpine3.18-slim
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/dist/pf2open /usr/share/nginx/html