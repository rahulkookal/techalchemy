Tech Alchemy Assignment

Setting Up the environment (Ubuntu based Machines)

Clone the repository

run npm install

Setting up the Database - (Documentation is based on Postgres, Multple DB can be used since we are using sequelize as our ORM)
Add database configuration /config/config.json (This values are to be configured environment varaible and config.json should be git ignored. For demo purpose adding sample values as in my local)

  {
    "username": "postgres",
    "password": null,
    "database": "alc",
    "host": "127.0.0.1",
    "dialect": "postgres",
    "news_api_key" : "b36f50d8c84b49308dd3ee8da737f3da",
    "open_whether_api_key": "f335dbef861912e2df3eeed5337cb362",
    "secret_key": "b36f50d8c84b49308dd3ee8da737f3da"
  }
  
Run Migration to set up table, ie,
npx sequelize-cli db:migrate

Add third party API keys from respective providers(news and weather) and add it in /config/config.json

Running Server:
npm start

Test Case Run
npm test

API Documentation is added API.MD file

Notes:
Currently test cases are only written for /users routes.
