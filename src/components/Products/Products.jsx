import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import Bottles from "../Bottles/Bottles";
import Cart from "../Cart/Cart";
import { addToLS, getStoerdCart } from "../../utils/localstorage";

const Products = () => {

  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  // useEffect(() => {
  //   fetch('bottles.json')
  //     .then(response => response.json())
  //     .then(data => setProducts(data));

  // }, []);

  // // load cart from LS
  // useEffect(() => {
  //   if (products.length) {
  //     const storedCart = getStoerdCart();
  //     const newCart = [];
  //     // setCart(cart);
  //     for (const id of storedCart) {
  //       const product = products.find((product) => product.id === id);
  //       newCart.push(product);
  //     }
  //     setCart(newCart);
  //   }
  // }, [products]);

  useEffect(() => {
    const fetchAndLoadCart = async () => {
      try {
        const response = await fetch('bottles.json');
        const productsData = await response.json();
        setProducts(productsData);

        const storedCart = getStoerdCart();
        const newCart = storedCart.map(id => productsData.find(product => product.id === id)).filter(Boolean);
        setCart(newCart);
      } catch (error) {
        console.error('Error fetching products or loading cart:', error);
      }
    };

    fetchAndLoadCart();
  }, []);

  const handleCart = (product) => {
    setCart([...cart, product]);
    addToLS(product.id);
  }
  console.log(cart);


  return (
    <div>

      <Cart cart={cart} setCart={setCart} />


      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-10">
        {products.map((product) => (
          <Bottles key={product.id} product={product} handleCart={handleCart} />
        ))}

      </div>
    </div>
  )
};

Products.propTypes = {
  cart: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
  })),
  setCart: PropTypes.func,
};


export default Products
