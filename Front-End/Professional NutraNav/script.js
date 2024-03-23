document.addEventListener('DOMContentLoaded', function() {
    // Reference main content, navbar, footer, and splash screen elements
    const elementsToHide = [document.getElementById('main-content'), document.getElementById('navbar'), document.getElementById('site-footer')];
    const splashScreen = document.getElementById('splash-screen');

    function toggleVisibility(show) {
        const displayStyleMain = show ? 'block' : 'none'; // Use 'block' for main content and footer
        const displayStyleNavbar = show ? 'flex' : 'none'; // Use 'flex' for navbar to maintain its layout
    
        // Apply display styles accordingly
        document.getElementById('main-content').style.display = displayStyleMain;
        document.getElementById('site-footer').style.display = displayStyleMain;
        document.getElementById('navbar').style.display = displayStyleNavbar; // Ensure navbar keeps flex layout
    
        document.body.classList.toggle('no-scroll', !show); // Toggle no-scroll class on body
    }

    // Function to hide the splash screen and show the main content, navbar, and footer
    function showMainContent() {
        splashScreen.style.display = 'none'; // Hide splash screen
        toggleVisibility(true); // Show main content, navbar, and footer
    }

    // Initially hide the main content, navbar, and footer, and disable scrolling
    toggleVisibility(false);

    // Check for 'skipSplash' parameter in the URL
    const queryParams = new URLSearchParams(window.location.search);
    const skipSplash = queryParams.get('skipSplash');

    if(skipSplash === "true") {
        // If 'skipSplash' parameter is true, immediately show main content
        showMainContent();
    } else {
        // Otherwise, wait for 4 seconds before showing main content
        setTimeout(showMainContent, 4000);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('search-form');
    searchForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const searchTerm = document.getElementById('search-input').value;
        fetchGroceries(searchTerm);
    });
});

// Fetch groceries from the backend and update the UI with the results
function fetchGroceries(searchTerm) {
    const apiUrl = `http://127.0.0.1:5000/search?product=${encodeURIComponent(searchTerm)}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data); // This will log the data to the console for debugging
            displaySearchResults(data); // Call this function once with the data
        })
        .catch(error => console.error('Error fetching data:', error));
}


// Function to display search results
function displaySearchResults(results) {
    const searchResults = document.getElementById('search-results');
    searchResults.innerHTML = ''; // Clear previous results

    Object.entries(results).forEach(([store, { price, unit }]) => {
        const resultElement = document.createElement('p');
        resultElement.textContent = `${store}: $${price} per ${unit}`;
        searchResults.appendChild(resultElement);
    });

    // Handle the case when no results are found
    if (Object.keys(results).length === 0) {
        searchResults.innerHTML = '<p>No results found. Try another search.</p>';
    }
}

// Frdge and Pantry

// Example items for fridge and pantry with quantities and expiry dates
const fridgeItems = [
    { name: 'Apples', quantity: 5, expiry: 'Apr 10' },
    { name: 'Eggs', quantity: 12, expiry: 'Apr 20' },
    { name: 'Milk', quantity: 1, expiry: 'Apr 05' },
    { name: 'Yogurt', quantity: 4, expiry: 'Apr 15' }
];

const pantryItems = [
    { name: 'Beans', quantity: 2, expiry: 'Dec 2023' },
    { name: 'Pasta', quantity: 3, expiry: 'Jan 2024' },
    { name: 'Rice', quantity: 1, expiry: 'Mar 2024' },
    { name: 'Tomato Sauce', quantity: 2, expiry: 'Jun 2023' }
];

// Function to add items to the DOM
function populateItems(itemArray, elementSelector) {
    const element = document.querySelector(elementSelector);
    itemArray.sort((a, b) => a.name.localeCompare(b.name)).forEach(item => {
        const listItem = document.createElement('li');
        
        const itemName = document.createElement('div');
        itemName.textContent = item.name;
        itemName.classList.add('item-name');
        
        const itemDetails = document.createElement('div');
        itemDetails.classList.add('item-details');
        
        const itemQuantity = document.createElement('span');
        itemQuantity.textContent = `Quantity: ${item.quantity}`;
        itemQuantity.classList.add('item-quantity');
        
        const itemExpiry = document.createElement('span');
        itemExpiry.textContent = `Expiry: ${item.expiry}`;
        itemExpiry.classList.add('item-expiry');
        
        itemDetails.appendChild(itemQuantity);
        itemDetails.appendChild(itemExpiry);
        
        listItem.appendChild(itemName);
        listItem.appendChild(itemDetails);
        
        element.appendChild(listItem);
    });
}

// Populate fridge and pantry on document load
document.addEventListener('DOMContentLoaded', () => {
    populateItems(fridgeItems, '.fridge-items');
    populateItems(pantryItems, '.pantry-items');
});

