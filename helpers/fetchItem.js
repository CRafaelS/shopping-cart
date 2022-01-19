const fetchItem = async (ItemID) => {
  // seu código aqui
  try {
    const url = `https://api.mercadolibre.com/items/${ItemID}`;
    const response = await fetch(url);
    const productsItems = await response.json();
    return productsItems; 
  } catch (error) {
    throw new Error('You must provide an url');
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
