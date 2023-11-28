FROM node:21

# Make the backend
WORKDIR /home/frontend
COPY ./frontend .
RUN npm install
EXPOSE 8080
CMD ["npm", "run", "serve"]
