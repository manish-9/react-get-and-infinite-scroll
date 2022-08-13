import React, { useEffect, useState } from "react";
import axios from "axios";
// import InfiniteScroll from "react-infinite-scroll-component";

function App2() {
  const [products, setProducts] = useState([]);
  let nextFive = 10;

  // method for api call to get products data..
  const getProducts = async () => {
    axios
      .get(`https://dummyjson.com/products?limit=${nextFive}`)
      .then((res) => {
        let i = 0;
        const newProducts = [];
        res.data.products.forEach((product) => {
          newProducts[i] = product;   // storing individual product data in newProducts array

          i++;

//           console.log(`i = ${i}`);
        });
        setProducts((oldProducts) => [...oldProducts, ...newProducts]);
      });
  };

  // event Handler for handling scroll event..
  const scrollHandler = (scrollEvent) => {
    // console.log("scroll top: ", scrollEvent.target.documentElement.scrollTop);
    // console.log("scroll Height: ", scrollEvent.target.documentElement.scrollHeight);
    // console.log("Window", window.innerHeight);

    //in if condition, we are adding 1 to the sum of scrollTop and window.innerHeight because sometimes the value of sum are little bit
    // different from the actual scrollHeight..so we are adding 1 to balance out the offset
    if (
      scrollEvent.target.documentElement.scrollTop + window.innerHeight + 1 >=
      scrollEvent.target.documentElement.scrollHeight
    ) {
      nextFive = 5;   // to load next five products after scrolling to the bottom of the current product list
      getProducts();  // making rest api call for getting next five product details
    }
  };

  useEffect(() => {
    getProducts();

    // to handle users scroll event for loading new content upon reaching the bottom of scroll
    window.addEventListener("scroll", scrollHandler);
  }, []);

  return (
    <div className="container">
      {products.map((product, index) => (
        <div className="row productDiv" key={index}>
          <span>
            <img className="productImg" src={product.thumbnail} />
            <br />
            {product.title}
          </span>
        </div>
      ))}
    </div>
  );
}

export default App2;
