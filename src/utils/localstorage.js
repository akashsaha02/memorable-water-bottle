const getStoerdCart = () => {
    const storedCartString = localStorage.getItem('cart');
    if (storedCartString) {
        return JSON.parse(storedCartString);
    }
    return [];
}

const addToLS = id => {
    const cart = getStoerdCart();
    cart.push(id);
    // save to LS
    localStorage.setItem('cart', JSON.stringify(cart));
}

const removeFromLS = id => {
    let cart = getStoerdCart();
    cart = cart.filter(cartId => cartId !== id);
    // save to LS
    localStorage.setItem('cart', JSON.stringify(cart));
}

export { addToLS, getStoerdCart, removeFromLS }