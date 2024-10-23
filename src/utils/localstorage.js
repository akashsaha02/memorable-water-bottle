const getStoerdCart = () => {
    const storedCartString = localStorage.getItem('cart');
    if (storedCartString) {
        return JSON.parse(storedCartString);
    }
    return [];
}

const addToLS = (product) => {
    const cart = getStoerdCart();
    const existingProduct = cart.find(item => item.id === product.id);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ id: product.id, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
}

const removeFromLS = id => {
    let cart = getStoerdCart();
    cart = cart.filter(cartItem => cartItem.id !== id);
    localStorage.setItem('cart', JSON.stringify(cart));
}

const updateLS = (cart) => {
    localStorage.setItem('cart', JSON.stringify(cart));
}

export { addToLS, getStoerdCart, removeFromLS, updateLS }