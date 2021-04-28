User Module

User - register sample

curl --location --request POST 'http://localhost:3000/users/register' \
--header 'co;' \
--header 'Content-Type: application/json' \
--data-raw '{
    "first_name": "rahul",
    "last_name": "kodoth", 
    "email": "rahulkkodoth@gmail.com", 
    "password": "admin123"
}'

User - Login

curl --location --request POST 'http://localhost:3000/users/login' \
--header 'co;' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "rahulkkodoth@gmail.com", 
    "password": "admin123"
}'

User - Logout 
curl --location --request POST 'http://localhost:3000/users/logout' \
--header 'co;' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNAay5jb20iLCJpYXQiOjE2MTk2MzQwNDR9.BrafWE9jfNJ5IAeH1zGTK2zWW8VHbbaDjrB1e7z0kaw' \
--data-raw ''

News
curl --location --request GET 'http://localhost:3000/news?from_date=2021-04-01&to_date=2021-04-20&page=1&domains=bbc.co.uk&sources=bbc-news,the-verge&query=bit%20coin' \
--header 'co;' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJhaHVsa2tvZG90aEBnbWFpbC5jb20iLCJpYXQiOjE2MTk2MzYzOTl9.2I9_uoicY6ImB0Db5VP96CTCjDElpxCtnZWy793J_Qk'

Weather

curl --location --request GET 'localhost:3000/weather'
