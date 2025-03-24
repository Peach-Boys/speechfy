FROM node:18-alpine

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --no-frozen-lockfile

COPY . .

RUN pnpm build 

CMD ["pnpm", "start"]
