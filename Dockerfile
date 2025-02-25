FROM node
WORKDIR /application
COPY package.json .
RUN npm i -g pnpm --verbose
RUN pnpm install
EXPOSE 3000
CMD [ "npm","run","dev" ]
