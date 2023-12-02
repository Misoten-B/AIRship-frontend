FROM node:20 AS builder

ARG API_KEY
ARG AUTH_DOMAIN
ARG PROJECT_ID
ARG STORAGE_BUCKET
ARG MESSAGING_SENDER_ID
ARG APP_ID
ARG MEASUREMENT_ID

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run apigen && npm run build

FROM node:20 AS worker
WORKDIR /app
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000

CMD ["node_modules/next/dist/bin/next", "start"]
