import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';


function Product() {

  const [product, setProduct] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  let { id } = useParams();


  function addToBasket() {
    // Stores basket items in sessionStorage as an array of "id"s
    var storedItems = JSON.parse(sessionStorage.getItem("basket"))
    if (!storedItems) { 
      // Initialises an array
      sessionStorage.setItem("basket", JSON.stringify([id]))
    } else {
      // Push only works if an array already exists
      storedItems.push(id)
      sessionStorage.setItem("basket", JSON.stringify(storedItems))
    }
  };

  function updateProduct(data) {
    try {      
      axios.post(`http://localhost:5000/admin/products/update`, data).then((response) => {
        console.log(response);
        alert("Product updated successfully");
      });
    } catch (error) {
      alert(error)
    }
  }

  function deleteProduct() {
    try {      
      // const data = JSON.stringify({ product_id: id });
      const data = {product_id: id};
      axios.post(`http://localhost:5000/admin/products/delete`, data).then((response) => {
        console.log(response);
        alert("Product deleted successfully");
        return(<div>Product Deleted</div>)
      });
    } catch (error) {
      alert(error)
    }
  }

  // Gets one product from database
  useEffect(() => {
    axios.get(`http://localhost:5000/products/${id}`).then((res) => {
      setProduct(res.data);
      setLoading(false);
    });
  }, []);
  // Array means will run each time a dependency value is changed
  // Empty array means will run only once (when component is mounted)

  useEffect( () => {
    const token = sessionStorage.getItem('access_token');
    if (token !== null && jwtDecode(token).privilege === 1) {
      setIsAdmin(true);
    }
  })

  if (loading) {
    // Maybe not the best way, 
    // but this makes sure that the product is fetched before rendering
    // as setting values directly in the form makes it unchangeable
    return <div>Loading...</div>
  }
  if (!product) {
    return <div>Product not found</div>
  }

  const initialValues = {
    product_id: product.product_id,
    product_name: product.product_name,
    product_description: product.product_description,
    price: product.price,
    stock: product.stock,
    discount: product.discount
  };

  // Returns html showing all products in a database
  if (!product) {
    return null;
  }
  return (
    <div className="productContainer">
      <div>
        <h1>{product.product_name} </h1>
        <hr/>
        <div>{product.product_description} </div>
        <div>ID: {product.product_id} </div>

        {product.discount > 0 &&
          <div>
            <div className="discount">{product.discount}% OFF </div>
            <s className="price"> Was: £{(product.price/100).toFixed(2)} </s>
            <div className="discountedPrice">Now: £{( (product.price/100) - (product.discount*(product.price/100)) /100 ).toFixed(2) } </div>
          </div>
        }
        {product.discount === 0 &&
            <div className="Price"> Price: £{( (product.price/100) - (product.discount*(product.price/100)) /100 ).toFixed(2) }</div> 
        }
        <div className="stock"> Stock: {product.stock} </div>
        <br></br>

        <button onClick={addToBasket}>Add to basket</button>
        <br/>
        <br/>
        { isAdmin && 
          <div>
            <h1>Admin Features</h1>
            <hr/><br/>
            <Formik onSubmit={updateProduct} initialValues={initialValues}>
              <Form>
                <label>ID: </label>
                <Field id="inpID" name="product_ID" value={product.product_id} disabled={true}/>
                <br/><br/>
                <label>Name: </label>
                <ErrorMessage name="product_name"/>
                <br/>
                <Field id="inpName" name="product_name"/>
                <br/><br/>

                <label>Description: </label>
                <ErrorMessage name="product_description" component="span"/>
                <br/>
                <Field id="inpDescription" component="textarea" rows="6" name="product_description"/>
                <br/>

                <br/>
                <label>Price (in pence): </label>
                <ErrorMessage name="price" component="span"/>
                <br/>
                <Field id="inpPrice" name="price"/>
                <br/>

                <br/>
                <label>Stock: </label>
                <ErrorMessage name="stock" component="span"/>
                <br/>
                <Field id="inpStock" name="stock"/>
                <br/>

                <br/>
                <label>Discount (in %)</label>
                <ErrorMessage name="discount" component="span"/>
                <br/>
                <Field id="inpDiscount" name="discount"/>
                <br/>

                <br/>
                <button type="submit">Update Product</button>
                <br/>
              </Form>
            </Formik>
            <br/>
            <button onClick={deleteProduct}> Delete Product </button>
          </div>}
      </div>
    </div>
  );
}

export default Product;
