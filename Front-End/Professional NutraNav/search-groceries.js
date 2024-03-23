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

