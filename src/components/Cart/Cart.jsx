import PropTypes from 'prop-types';
import { removeFromLS, updateLS } from '../../utils/localstorage';

const Cart = ({ cart, setCart }) => {
  const handleRemove = (id) => {
    const updatedCart = cart.map(item => {
      if (item.id === id) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    }).filter(item => item.quantity > 0);

    setCart(updatedCart);
    updateLS(updatedCart);
  };

  return (
    <div className='border p-2 rounded-lg'>
      <h3 className="font-semibold text-xl text-center">Cart: {cart.length}</h3>
      {cart.map((product) => (
        <div key={product.id} className="flex flex-col md:flex-row gap-2 justify-between border rounded-lg p-4 my-2 bg-green-300">
          <h3 className="text-lg font-medium flex gap-2 items-center">
            <img src={product.img} className='w-5 md:w-10 rounded border' alt="" />
            {product.name} (x{product.quantity})
          </h3>
          <button className="bg-blue-500 px-4 py-1 rounded text-white" onClick={() => handleRemove(product.id)}>Remove</button>
        </div>
      ))}
    </div>
  );
};

Cart.propTypes = {
  cart: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
  })).isRequired,
  setCart: PropTypes.func.isRequired,
};

export default Cart;