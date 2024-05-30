import React, { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState([]);
  const [product, setProduct] = useState('');
  const [top, SetTop] = useState('');
  const [minPrice, SetMinPrice] = useState('');
  const [MaxPrice, setMaxPrice] = useState('');
  

  useEffect(() => {
    const handleFetch = async () => {
      const response = await fetch(
        `http://localhost:4000/categories/${product}/products?top=${top}&minPrice=${minPrice}&maxPrice=${MaxPrice}`
      );
      const data = await response.json();
      setData(data);
    };
    handleFetch();
  }, []);

  return (
    <div>
      <div className="flex ">
        <h2 className="text-2xl ml-20 font-extrabold tracking-tight text-indigo-600 m-10">
        E-Commerce
        </h2>
      </div>
      <h2 className="text-2xl ml-20 font-extrabold tracking-tight text-gray-900">
        Products
      </h2>
      <div className="flex justify-center items-center space-x-2 ">
     
        <input name="product"  onChange={(e)=>{setProduct(e.target.value)}} className="bg-gray-50 border h-10 w-36 border-gray-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 outline-none focus:border-indigo-500 block p-2.5 " placeholder="Product"/>
        <input name="top" onChange={(e)=>{SetTop(e.target.value)}} className="bg-gray-50 border h-10 w-36 border-gray-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 outline-none focus:border-indigo-500 block p-2.5 " placeholder="TOP"/>
        <input name="minPrice" onChange={(e)=>{SetMinPrice(e.target.value)}} className="bg-gray-50 border h-10 w-36 border-gray-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 outline-none focus:border-indigo-500 block p-2.5 " placeholder="Min Price"/>
        <input name="maxPrice" onChange={(e)=>{setMaxPrice(e.target.value)}}  className="bg-gray-50 border h-10 w-36 border-gray-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 outline-none focus:border-indigo-500 block p-2.5  " placeholder="Max Price"/>

      </div>
      <div className="flex justify-center m-8">
        <table className="text-sm text-left rtl:text-right text-gray-500  border-collapse border">
          <thead className="text-xs text-indigo-700 uppercase bg-indigo-50 rounded-md">
            <tr>
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                Product
              </th>
              <th scope="col" className="px-6 py-3">
                Company
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Rating
              </th>
              <th scope="col" className="px-6 py-3">
                Discount
              </th>
              <th scope="col" className="px-6 py-3">
                Availability
              </th>
            </tr>
          </thead>
           <tbody>
           {data.map((product, index) => (
                <tr key={index} className="bg-white border-b ">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                  >
                    {product.id}
                  </th>
                  <td
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                  >
                    {product.ProductName}
                  </td>
                  <td className="px-6 py-4">
                    {product.company}
                  </td>
                  <td className="px-6 py-4">{product.price}</td>
                  <td className="px-6 py-4">{product.rating}</td>
                  <td className="px-6 py-4">{product.discount}</td>
                  <td className="px-6 py-4">{product.availability}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}

export default App;
