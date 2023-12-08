FROM node:21

# Make the backend
WORKDIR /home/backend
COPY ./imagecontent .
RUN npm install
EXPOSE 8080
CMD ["npm", "run", "serve"]
