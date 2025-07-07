FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN pnpm install

COPY . .

EXPOSE 3001

CMD ["node", "src/index.js"]