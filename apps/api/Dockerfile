FROM node:18-alpine
RUN apk add --no-cache python3 make g++
WORKDIR /apps/api
COPY package*.json ./
COPY prisma ./prisma
RUN npm install
COPY . .
RUN npm run build
EXPOSE 10000
CMD ["npm", "start"]