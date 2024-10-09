// console.log('====================================');
// console.log("Connected");
// console.log('====================================');

const cartDataUrl = 'https://cdn.shopify.com/s/files/1/0883/2188/4479/files/apiCartData.json?v=1728384889';

document.addEventListener('DOMContentLoaded', () => {
  fetchCartData();
});

function fetchCartData() {
  fetch(cartDataUrl)
    .then(response => response.json())
    .then(data => populateCart(data))
    .catch(error => console.error('Error fetching cart data:', error));
}

function populateCart(data) {
  const cartItemsContainer = document.getElementById('cart-items');
  const subtotalElement = document.getElementById('subtotal');
  const totalElement = document.getElementById('total');
  
  let subtotal = 0;

  data.items.forEach(item => {
    const itemRow = document.createElement('tr');
    
    itemRow.innerHTML = `
        <td><img src="${item.image}" alt="${item.title}" style="width: 60px;"> ${item.title}</td>
        <td>Rs. ${item.presentment_price}</td>
        <td><input value="${item.quantity}" min="1" data-id="${item.id}" style="border: none; text-align: center;" readonly></td>
        <td>Rs. ${item.presentment_price * item.quantity}</td>
        <td><button class="remove-btn" data-id="${item.id}" style="border: none;background-color: transparent;cursor: pointer;"><img src="delete.png" alt="dlt-btn"></button></td>
    `;
    
    cartItemsContainer.appendChild(itemRow);
    subtotal += item.presentment_price * item.quantity;
  });

  subtotalElement.textContent = `Rs. ${subtotal.toFixed(2)}`;
  totalElement.textContent = `Rs. ${subtotal.toFixed(2)}`;

  document.querySelectorAll('.remove-btn').forEach(button => {
    button.addEventListener('click', (event) => {
      const id = event.target.getAttribute('data-id');
      removeItem(id);
    });
  });

  document.querySelectorAll('input[type="number"]').forEach(input => {
    input.addEventListener('change', (event) => {
      const id = event.target.getAttribute('data-id');
      const quantity = event.target.value;
      updateQuantity(id, quantity);
    });
  });
}

function removeItem(id) {
  console.log('Removing item:', id);
}

function updateQuantity(id, quantity) {
  console.log('Updating quantity for:', id, 'to', quantity);
}
