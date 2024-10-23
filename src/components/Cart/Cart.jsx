import { removeFromLS } from '../../utils/localstorage';
import PropTypes from 'prop-types';
const Cart = ({cart, setCart}) => {
  const handleRemove = (id) => {
    setCart(cart.filter((item) => item.id !== id));
    removeFromLS(id);
  }

  return (
    <div className='border p-2 rounded-lg'>
      <h3 className="font-semibold text-xl text-center">Cart: {cart.length}</h3>
      {
        cart.map((product) => (
          <div key={product.id} className="flex flex-col md:flex-row gap-2 justify-between border rounded-lg p-4 my-2 bg-green-300">
            <h3 className="text-lg font-medium flex gap-2 items-center"><img src={product.img} className='w-5 md:w-10 rounded border' alt="" />{product.name}</h3>
            <button className="bg-blue-500 px-4 py-1 rounded text-white" onClick={() => handleRemove(product.id)}>Remove</button>
          </div>
        ))
      }
    </div>
  )
};

Cart.propTypes = {
    cart: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      img: PropTypes.string.isRequired,
    })).isRequired,
    setCart: PropTypes.func.isRequired,
  };

export default Cart