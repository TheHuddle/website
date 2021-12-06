FROM node:14.15.5 as build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY \
    angular.json \
    karma.conf.js \
    nginx.conf \
    package.json \
    package-lock.json \
    tsconfig.app.json \
    tsconfig.json \
    tsconfig.spec.json \
    tslint.json \
    ./
COPY src ./src
RUN npm run build

FROM nginx:alpine as the-huddle-website
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist/the-huddle /usr/share/nginx/html
