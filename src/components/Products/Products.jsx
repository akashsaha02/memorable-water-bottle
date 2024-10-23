import PropTypes from 'prop-types';
import { useEffect, useState } from "react";
import Bottles from "../Bottles/Bottles";
import Cart from "../Cart/Cart";
import { addToLS, getStoerdCart } from "../../utils/localstorage";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchAndLoadCart = async () => {
      try {
        const response = await fetch('bottles.json');
        const productsData = await response.json();
        setProducts(productsData);

        const storedCart = getStoerdCart();
        const newCart = storedCart.map(storedItem => {
          const product = productsData.find(product => product.id === storedItem.id);
          return product ? { ...product, quantity: storedItem.quantity } : null;
        }).filter(Boolean);
        setCart(newCart);
      } catch (error) {
        console.error('Error fetching products or loading cart:', error);
      }
    };

    fetchAndLoadCart();
  }, []);

  const handleCart = (product) => {
    const existingProduct = cart.find(item => item.id === product.id);
    if (existingProduct) {
      setCart(cart.map(item => 
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    addToLS(product);
  };

  return (
    <div>
      <Cart cart={cart} setCart={setCart} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-10">
        {products.map((product) => (
          <Bottles key={product.id} product={product} handleCart={handleCart} />
        ))}
      </div>
    </div>
  );
};

Products.propTypes = {
  cart: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    quantity: PropTypes.number,
  })),
  setCart: PropTypes.func,
};

export default Products;