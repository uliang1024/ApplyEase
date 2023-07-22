FROM node:18

WORKDIR /app

COPY . /app

RUN npm install --legacy-peer-deps

ENV PORT 8080

EXPOSE 8080

CMD ["npm", "run", "watch"]
