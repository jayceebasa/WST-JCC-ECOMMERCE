function updateQuantity(change, btn) {
  const section = btn.closest(".quantity-section");
  const quantityElement = section.querySelector(".quantity");
  let quantity = parseInt(quantityElement.textContent);
  quantity = Math.max(1, quantity + change);
  quantityElement.textContent = quantity;
  updateBilling();
}

function deleteItem(btn) {
  const card = btn.closest(".product-card");
  card.remove();
  updateBilling();
}

function updateBilling() {
  const productCards = document.querySelectorAll('.product-card');
  let subtotal = 0;
  
  // Clear and rebuild items breakdown
  const itemsBreakdown = document.getElementById('items-breakdown');
  itemsBreakdown.innerHTML = '';

  productCards.forEach((card, index) => {
    const titleElement = card.querySelector('.product-title');
    const priceText = card.querySelector('.product-price').textContent;
    const colorText = card.querySelector('.product-color').textContent;
    const sizeElement = card.querySelector('select');
    const quantityElement = card.querySelector('.quantity');
    
    const title = titleElement.textContent;
    const price = parseFloat(priceText.replace('Price: ₱', '').replace(',', ''));
    const color = colorText.replace('Color: ', '');
    const size = sizeElement.value;
    const quantity = parseInt(quantityElement.textContent);
    const itemTotal = price * quantity;
    
    subtotal += itemTotal;

    // Create item breakdown element
    const itemDiv = document.createElement('div');
    itemDiv.className = 'item-breakdown';
    itemDiv.innerHTML = `
      <div class="item-row">
        <span class="item-name">${title}</span>
        <span>₱${itemTotal.toLocaleString('en-PH', {minimumFractionDigits: 2})}</span>
      </div>
      <div class="item-row">
        <span class="item-details">${color}, ${size} × ${quantity}</span>
        <span class="item-details">₱${price.toLocaleString('en-PH', {minimumFractionDigits: 2})} each</span>
      </div>
    `;
    itemsBreakdown.appendChild(itemDiv);
  });

  const shipping = subtotal > 0 ? 150 : 0;
  const total = subtotal + shipping;

  document.getElementById('subtotal').textContent = `₱${subtotal.toLocaleString('en-PH', {minimumFractionDigits: 2})}`;
  document.getElementById('shipping').textContent = `₱${shipping.toLocaleString('en-PH', {minimumFractionDigits: 2})}`;
  document.getElementById('total').textContent = `₱${total.toLocaleString('en-PH', {minimumFractionDigits: 2})}`;
}

function processPurchase() {
  const total = document.getElementById('total').textContent;
  alert(`Thank you for your purchase! Your order total is ${total}. Redirecting to payment...`);
  // Here you would typically redirect to a payment processor
  // window.location.href = '/checkout';
}

// Initialize billing on page load
document.addEventListener('DOMContentLoaded', function() {
  updateBilling();
});
