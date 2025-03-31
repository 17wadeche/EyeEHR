FROM node:18-alpine
WORKDIR /apps
COPY . .
RUN npm install && npm run build
EXPOSE 3001
CMD ["npm", "start"]