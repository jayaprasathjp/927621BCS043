require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const app = express();
app.use(cors());
app.use(bodyParser.json());
let accessToken ;
async function refreshAccessToken(){
  let res = await fetch("http://20.244.56.144/test/auth",{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({
      "companyName": "goMart",
      "clientID": "e9e2b380-36ad-4b2f-810d-eb26239d9210",
      "clientSecret": "kDBtXfUZrFNjRgkq",
      "ownerName": "Jayaprasath",
      "ownerEmail": "927621bcs043@mkce.ac.in",
      "rollNo": "927621BCS043"
  })
  });

  let data =  await res.json();


  accessToken = data.access_token;
}
const fetchProducts = async (company, category, top,minPrice, maxPrice) => {

  console.log(accessToken);
  try {
      if(!accessToken){
        throw new Error("access token not found");
      }
      const response = await axios.get(`http://20.244.56.144/test/companies/${company}/categories/${category}/products?top=${top}&minPrice=${minPrice}&maxPrice=${maxPrice}`, {headers: {
                  'Authorization': `Bearer ${accessToken}`
                }
      });
      return response.data.map(product => ({
          ...product,
          id: uuidv4(),
          company,
      }));
  } catch (error) {
      console.error(`Error ${company}:` );
      return [];
  }
};

app.get('/categories/:categoryname/products', async (req, res) => {
  const { categoryname } = req.params;
  const { top,minPrice, maxPrice} = req.query;
  const companies = ['AMZ', 'BLA', 'CBY', 'DOM', 'EVG']; 

  await refreshAccessToken()

  try {
      let allProducts = [];

      for (const company of companies) {
          const products = await fetchProducts(company, categoryname ,top,minPrice, maxPrice);
          allProducts = allProducts.concat(products);
      }

      return res.json(allProducts);
  } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server started on http://localhost:${process.env.PORT}`);
});
