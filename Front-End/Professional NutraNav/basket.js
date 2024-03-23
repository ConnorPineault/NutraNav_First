document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('search-form');
    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const searchResults = document.getElementById('search-results');
        const searchTerm = document.getElementById('search-input').value;

        // Simulate a search result and display with an "Add to Basket" button
        searchResults.innerHTML = `
            <div class="search-item">
                <p>Result for "${searchTerm}"</p>
                <button class="add-to-basket" data-item="${searchTerm}">Add to Basket</button>
            </div>
        `;

        attachAddToBasketListeners();
    });
});

function attachAddToBasketListeners() {
    // Attach event listeners to all "Add to Basket" buttons
    document.querySelectorAll('.add-to-basket').forEach(button => {
        button.addEventListener('click', function(e) {
            const itemName = e.target.getAttribute('data-item');
            addItemToBasket(itemName);
        });
    });
}

function addItemToBasket(itemName) {
    // Assuming you have a function to render items in the basket...
    const basket = document.querySelector('.basket-items');
    const newItem = document.createElement('div');
    newItem.classList.add('basket-item');
    newItem.innerHTML = `
        <span class="item-name">${itemName}</span>
        <span class="item-quantity">Qty: 1</span>
        <span class="item-price">$9.99</span>
        <button class="edit-item">Edit</button>
        <button class="remove-item">Remove</button>
    `;
    basket.appendChild(newItem);

    // Optionally, update basket total and other UI elements here
}
