import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import ViewAllUsers from './ViewAllUsers';
import { Formik, Form, Field, ErrorMessage } from 'formik';

function Admin() {

  const [showUsers, setShowUsers] = useState(false);
  const [showProducts, setShowProducts] = useState(false);

  const token = sessionStorage.getItem('access_token')
  // axios.defaults.headers.common['Authorization'] = `Bearer ${sessionStorage.getItem('access_token')}`;

  if (token === null || jwtDecode(token).privilege !== 1) {
    return( <div><br/>You are not authorised to view this page</div>)
  }

  function addProduct(data) {
    try {      
      axios.post(`http://localhost:5000/admin/products/addnew`, data).then((response) => {
        console.log(response);
        alert("Product added successfully");
      });
    } catch (error) {
      alert(error)
    }
  }

  const initialValues = {
    product_ID: "",
    product_name: "",
    product_description: "",
    price: "",
    stock: "",
    discount: ""
  }

  // Returns html showing all users in a database
  return (
    <div className="adminContainer">
      <br/>
      <button onClick={() => setShowUsers(true)}>View Users</button>
      <button onClick={() => setShowProducts(true)}>Add New Product</button>
      <br/>
      {showUsers && <ViewAllUsers/>}
      {showProducts && 
        <Formik onSubmit={addProduct} initialValues={initialValues}>
          <Form>
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
            <button type="submit">Add Product</button>
            <br/>
          </Form>
        </Formik>
      }
    </div>
  )
}

export default Admin;
