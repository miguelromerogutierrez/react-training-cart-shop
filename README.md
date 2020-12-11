# Cart Shop
This project uses create-react-app bootstrap you can check its [wiki](https://github.com/facebook/create-react-app).

## Setup
First install your node dependecies:
```bash
$ npm install
```

This projects contains a mock server that will help you to test your local environment. To run the mock server open a new terminal, go to the root directory project and execute:
```bash
$ npm run start-server
```
Test your server is up and running in the port 8080: http://localhost:8080/

Once your mock server is running in a new terminal run the next command to compile and run your react app:
```bash
$ npm run start
```
This command will open a new tab in your browser

## Mock server API
The mock server api has 4 endpoints these are:

```
GET /products
QUERIES:
- page: NUMBER
- items: NUMBER
- filter: STRING
- sort: ENUM[Prices | Raiting ]
RESPONSES
- SUCCESS: {
  pages: NUMBER,
  items: NUMBER,
  prevPage: NUMBER,
  nextPage: NUMBER,
  currentPage: NUMBER,
  products: ARRAY
}
- ERROR: {
  message: STRING
}
```

```
POST /order
BODY: {
  shippingData: {
    address: STRING,
    city: STRING,
    state: STRING,
    phoneNumber: STRING,
    fullName: STRING,
    zipCode: STRING
  },
  creditCardData: {
    creditCard: STRING,
    cvv: STRING,
    expDate: STRING,
    fullName: STRING
  }
}
RESPONSES
- SUCCESS: {
  message: STRING
}
- ERROR: {
  message: STRING
}
```

```
POST /validate/creditcard/{ccnumber} 
RESPONSES
- SUCCESS: {
  message: STRING
}
- ERROR: {
  message: STRING
}
```

```
POST /validate/zipcode/{zcnumber} 
RESPONSES
- SUCCESS: {
  message: STRING
}
- ERROR: {
  message: STRING
}
```