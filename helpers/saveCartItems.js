const saveCartItems = (products) => {
  // seu código aqui
  localStorage.setItem('cartItems', products);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
