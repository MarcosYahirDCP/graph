FROM node:14
COPY . /app
WORKDIR /app
RUN npm install
EXPOSE 4000
CMD ["npm", "start"]
