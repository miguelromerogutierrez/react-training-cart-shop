import axios from 'axios';

let client = axios.create({
  baseURL: 'http://localhost:8080/',
});

export const getProducts = (params) => client.get('/products', {params}).then(result => result.data);
export const postValidateZipcode = (zc) => client.post(`/validate/zipcode/${zc}`).then(result => result.data);
export const postValidateCreditcard = (cc) => client.post(`/validate/creditcard/${cc}`).then(result => result.data);
export const postOrder = (body) => client.post(`/order`, body).then(result => result.data);
