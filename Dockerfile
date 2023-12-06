FROM node:21

# Make the backend
WORKDIR /home/frontend
COPY ./frontend .
RUN npm install
EXPOSE 8082
CMD ["npm", "run", "serve"]
