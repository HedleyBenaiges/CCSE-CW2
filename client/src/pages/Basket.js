import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import React, { useState, useEffect } from 'react';

function Basket() {

  function emptyBasket() {
    sessionStorage.removeItem("basket")
    window.location.reload()
  }
  function checkout() {
    let token = sessionStorage.getItem('access_token');
    if (token === null) {
      alert("Please log in to checkout")
    } else {
      alert("Checkout success")
      emptyBasket()
    }
  }

  var items = JSON.parse(sessionStorage.getItem("basket"))
  console.log(items)

  if (!items) {
    return (<p>Basket is Empty</p>)
  } else {
    return (
      <div>
        <h1>Basket</h1>
        { items.map((product, index) => {
          return(
            <p>{product}</p>
          );
        })}
        <button onClick={checkout}>Checkout</button>
        <button onClick={emptyBasket}>Empty Basket</button>
      </div>
    )
  }
}

export default Basket;
