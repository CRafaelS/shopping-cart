function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function cartItemClickListener(event) {
  // coloque seu código aqui
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const init = async () => {
  const products = await fetchProducts('computardor');
  const result = products.results;
  const selectItem = document.querySelector('.items');
  
  result.forEach((item) => {
    const { id: sku, title: name, thumbnail: image } = item;
    const elementProduct = createProductItemElement({ sku, name, image });
    selectItem.appendChild(elementProduct);
  });
};

const selectProductItem = () => {
  const productItem = document.querySelectorAll('.item__add');
  const buyItem = document.querySelector('.cart__items');
  const takeProductItem = async (event) => {
    const productItemElement = event.target.parentElement.firstChild;
    const elementSelect = await fetchItem(productItemElement.innerText);
    const {id: sku, title: name, price: salePrice} = elementSelect;
    const itemSelected = createCartItemElement({ sku, name, salePrice });
    buyItem.appendChild(itemSelected);
  };

  productItem.forEach((element) => {
    element.addEventListener('click', takeProductItem);
  });
};

window.onload = async () => { 
  await init();
  selectProductItem();
 };
