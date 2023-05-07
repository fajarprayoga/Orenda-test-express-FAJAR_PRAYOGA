# Orenda-test-express-FAJAR_PRAYOGA

For documentation https://docs.google.com/document/d/1-b5j69040dMQrc8TdrvEiwzq8JPMZgbEDgZOhhkGrmY/edit?usp=sharing 

EXPRESS AND LOGIC TEST

logic tes

cd Logic-test

run node palindrome.js

cretae db name=orenda

1. run npx sequelize db:migrate
2. run npx sequelize db:seed:all
3. run npm start

access api
localhost:3000/jwt/get-token/customer@orenda.com
and save token 



acess api with token
in header postman you can add authorized = token

api list
customer
field
name (string)

email (email)

phone (number)

address (text)


localhost:3000/customer (get)
localhost:3000/customer (post)
localhost:3000/customer/:id
(put)
localhost:3000/customer/:id (delete)

product

field
name (string)

unit (string)

price (int)


localhost:3000/product (get)

localhost:3000/product (post)

localhost:3000/product/:id

(put)

localhost:3000/product/:id (delete)


order

field 
customerId (string)

prouducts (array) id from product

discount: int

localhost:3000/order/ (post)

localhost:3000/order/customer/:customerId (get)




          

            






