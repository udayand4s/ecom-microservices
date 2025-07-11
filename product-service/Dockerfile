FROM node:18-alpine

RUN npm install -g pnpm

WORKDIR /app

COPY package.json pnpm-lock.yaml* ./

RUN pnpm install

COPY . .

EXPOSE 3000

RUN chmod +x src/index.js

CMD ["pnpm", "src/index.js"]
