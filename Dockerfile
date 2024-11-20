FROM node:20.17.0-alpine3.19

WORKDIR /app
COPY . .

# Delete the existing 'dist' folder if it exists
RUN rm -rf frontend/dist

RUN npm run build
EXPOSE 5001

CMD ["npm", "start"]
