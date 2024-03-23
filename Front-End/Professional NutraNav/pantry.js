document.addEventListener('DOMContentLoaded', () => {
    populatePantryItems();
});

function populatePantryItems() {
    // Fetch items from backend or local storage
    const fridgeItems = []; // Example array, populate based on your data
    const pantryItems = []; // Example array, populate based on your data

    const fridgeContainer = document.querySelector('.fridge-items');
    const pantryContainer = document.querySelector('.pantry-items');

    // Populate fridge items
    fridgeItems.forEach(item => {
        const itemCard = createItemCard(item);
        fridgeContainer.appendChild(itemCard);
    });

    // Populate pantry items
    pantryItems.forEach(item => {
        const itemCard = createItemCard(item);
        pantryContainer.appendChild(itemCard);
    });
}

function createItemCard(item) {
    const card = document.createElement('div');
    card.className = 'item-card';
    card.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <p class="item-name">${item.name}</p>
        <p class="item-quantity">Quantity: ${item.quantity}</p>
    `;
    return card;
}
