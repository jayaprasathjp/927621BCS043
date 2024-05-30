require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const app = express();
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);
app.use(cors());
app.use(bodyParser.json());
app.disable("x-powered-by");
app.use(morgan("dev"));

// const handleFetch=async ()=>{
//   const response= await axios.get(`http://20.244.56.144/test/companies/AMZ/categories/phone/products?top=5&minPrice=100&maxPrice=1000`, {
//     headers: {
//       'Authorization': `Bearer ${process.env.BEARER_TOKEN}`
//     }
//   });;
//   console.log(response.data);
// }
// handleFetch();

// app.get('/categories/:categoryname/products',(req, res)=>{
//   const categoryName=req.params.categoryname;
//   console.log(categoryName);

//   res.json(categoryName);

// })
let accessToken ;
async function refreshAccessToken(){
  accessToken = await fetch("http://20.244.56.144/test/auth",{
    method:"POST",
    
  });
}
const fetchProducts = async (company, category, top,minPrice, maxPrice) => {

  try {
      const response = await axios.get(`http://20.244.56.144/test/companies/${company}/categories/${category}/products?top=${top}&minPrice=${minPrice}&maxPrice=${maxPrice}`, {headers: {
                  'Authorization': `Bearer ${accessToken}`
                }
      });
      return response.data.map(product => ({
          ...product,
          uniqueId: uuidv4(),
          company,
      }));
      console.log(response.data);
  } catch (error) {
      console.error(`Error ${company}:`);
      return [];
  }
};

app.get('/categories/:categoryname/products', async (req, res) => {
  const { categoryname } = req.params;
  const { top,minPrice, maxPrice} = req.query;
  const companies = ['AMZ', 'BLA', 'CBY', 'DOM', 'EVG']; 


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

// app.get('/categories/:categoryname/products/:productid', async (req, res) => {
//   const { categoryname, productid } = req.params;

//   try {
//       let productDetails = null;
      
//       // Fetch all products in the category to find the product by uniqueId
//       const companies = ['AMZ', 'BLA', 'CBY', 'DOM', 'EVG'];
//       for (const company of companies) {
//           const products = await fetchProducts(company, categoryname);
//           productDetails = products.find(product => product.uniqueId === productid);
//           if (productDetails) {
//               break;
//           }
//       }

//       if (productDetails) {
//           res.json(productDetails);
//       } else {
//           res.status(404).json({ error: 'Product not found' });
//       }
//   } catch (error) {
//       console.error('Error fetching product details:', error);
//       res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

app.listen(process.env.PORT, () => {
  console.log(`Server started on http://localhost:${process.env.PORT}`);
});
