const listOl = document.querySelector('.cart__items');
const clearBtn = document.querySelector('.empty-cart');

// Requisito 6 com ajuda do Guthias
const clearCart = () => {
  Array.from(listOl.childNodes).forEach((element) => element.remove());
};

clearBtn.addEventListener('click', clearCart);
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
  event.target.remove();
  saveCartItems(listOl.innerHTML);
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

// Requisito 2 concluído com a ajuda do Léo Oliveira.
const takeProductItem = async (event) => {
  const productItemElement = event.target.parentElement;
  const productId = getSkuFromProductItem(productItemElement);
  const elementSelect = await fetchItem(productId);
  const { id: sku, title: name, price: salePrice } = elementSelect;
  const itemSelected = createCartItemElement({ sku, name, salePrice });
  listOl.appendChild(itemSelected);
  saveCartItems(listOl.innerHTML);
};

const selectProductItem = () => {
  const productItem = document.querySelectorAll('.item__add');
  productItem.forEach((element) => {
    element.addEventListener('click', takeProductItem);
  });
};

const init = async () => {
  const products = await fetchProducts('computador');
  const result = products.results;
  const selectItem = document.querySelector('.items');
  
  result.forEach((item) => {
    const { id: sku, title: name, thumbnail: image } = item;
    const elementProduct = createProductItemElement({ sku, name, image });
    selectItem.appendChild(elementProduct);
  });
  selectProductItem();
  listOl.innerHTML = getSavedCartItems();
};
listOl.addEventListener('click', cartItemClickListener);

window.onload = async () => { 
  await init();
 };
