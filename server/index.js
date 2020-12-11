const express = require('express');
const app = express();
const port = 8080;
var cors = require('cors');

const axios = require('axios');
const mockProducts = require('./mock-products');

app.use(cors());

app.get('/products', (req, res) => {
  axios.get('https://picsum.photos/v2/list')
    .then(results => {
      let result = mockProducts;
      let imgData = results.data;

      let page = Math.min(req.query.page || 1, 2);
      let items = Math.min(req.query.items || 10);

      if (req.query.filter && req.query.filter === 'basics') {
        result = result.filter(_product => _product.basics);
      }
      
      if (req.query.sort) {
        result = result.sort(sortFns[`sort${req.query.sort}`]);
      }

      let pages = result.length / items > 1 ? 2 : 1;
      let start = (page - 1) * items;
      let end = Math.min(items * page, result.length);
      result = mockProducts
        .slice(start, end)
        .map((_product, index) => ({ ..._product, img: imgData[index].download_url }));

      res.json({
        pages,
        items,
        prevPage: Math.max(page - 1, 1),
        nextPage: Math.min(page + 1, 2),
        currentPage: page,
        products: result
      });
    })
    .catch(err => {
      console.log(err);
      res.json({message: 'CANNOT_RETURN_ELEMENTS'})
    });
});

app.post('/validate/zipcode/:zc', (req, res) => {
  let zipcode = req.params.zc;
  if (zipcode.length === 5 && zipcode.length !== '99999') {
    return res.status(200).json({
      message: 'success'
    });
  }
  return res.status(400).json({
    message: 'INVALID_ZIP_CODE'
  });
});

app.post('/validate/creditcard/:cc', (req, res) => {
  let ccnumber = req.params.cc;
  if (ccnumber.length === 16 && /^4772[0-9]{12}$/.test(ccnumber)) {
    return res.status(200).json({
      message: 'success'
    });
  }
  return res.status(400).json({
    message: 'INVALID_CREDIT_CARD'
  });
});

app.post('/order', (req, res) => {
  let data = req.body;

  if (validateCardData(data.creditCardData) && validateShipping(data.shippingData)) {
    return res.status(200).json({ message: 'success' });
  }

  return res.status(400).json({ message: 'WRONG_DATA' });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

const sortFns = {
  sortPrices: function sortPrices(_productA, _productB) {
    return parseFloat(_productB.price) - parseFloat(_productA.price);
  },
  sortRating: function sortRating(_productA, _productB) {
    return (parseFloat(_productB.rate) * 10) - (parseFloat(_productA.rate) * 10);
  }
};

function validateShipping(shippingData) {
  return shippingData.address && shippingData.city && shippingData.state && shippingData.phoneNumber && shippingData.fullName && shippingData.zipCode;
}

function validateCardData(creditcardData) {
  return creditcardData.creditCard && creditcardData.cvv && creditcardData.expDate && creditcardData.fullName;
}