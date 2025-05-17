import './Store.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

function Store() {

  const [productList, setProductList] = useState([]);

  // Gets all products from database
  useEffect(() => {
    axios.get(`http://localhost:5000/products`).then((res) => {
      setProductList(res.data);
    });
  }, []);
  // Array means will run each time a dependency value is changed
  // Empty array means will run only once (when component is mounted)

  function searchProducts(data) {
    axios.post(`http://localhost:5000/products/search`, data).then((res) => {
      setProductList(res.data);
    });
  }

  const initialValues = {
    product_name: ""
  }

  // Returns html showing all products in a database
  return (
    <div className="page">
      <br/>
      <Formik onSubmit={searchProducts} initialValues={initialValues}>
        <Form>
          <label>Search: </label>
          <Field id="product_name" name="product_name" placeholder="Product Name"/>
          <button type="submit">Search</button>
        </Form>
      </Formik>

      <div className="productContainer">
        { !productList && <div>No Products Found</div> }
        { productList.map((product, index) => {
          return (
            <div className="product" onClick={() => window.location.href=`/products/${product.product_id}`}>
              <div className="name"> {product.product_name} </div>
              {product.discount > 0 &&
                <div>
                  <div className="discount">{product.discount}% OFF </div>
                  <s className="price"> Was: £{(product.price/100).toFixed(2)} </s>
                  <div className="discountedPrice">Now: £{( (product.price/100) - (product.discount*(product.price/100)) /100 ).toFixed(2) } </div>
                </div>
              }
              {product.discount == 0 &&
                  <div className="Price"> Price: £{( (product.price/100) - (product.discount*(product.price/100)) /100 ).toFixed(2) }</div> 
              }
              <div className="stock"> Stock: {product.stock} </div>
              <br></br>
              <div className="description"> {product.product_description} </div>
            </div>
          );
        })}
      </div>
    </div>
  )
}

export default Store;
