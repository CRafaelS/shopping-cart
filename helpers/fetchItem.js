const fetchItem = async (ItemID) => {
  // seu código aqui
  const url = `https://api.mercadolibre.com/items/${ItemID}`;
  const response = await fetch(url);
  const productsItems = await response.json();
  return productsItems;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
