// home.js - Enhancing User Dashboard Functionality

/**
 * Updates the greeting message based on the current time.
 */
function updateGreeting() {
    const hour = new Date().getHours();
    const username = localStorage.getItem('username') || 'Guest'; // Retrieve username from localStorage
    const greetingElement = document.getElementById('greeting');
    
    // Determine the part of the day and set appropriate greeting
    if (hour < 12) greetingElement.textContent = `Good Morning, ${username}!`;
    else if (hour < 18) greetingElement.textContent = `Good Afternoon, ${username}!`;
    else greetingElement.textContent = `Good Evening, ${username}!`;
}

/**
 * Displays user profile data on the dashboard.
 * @param {Object} profile - The user profile data object.
 */
function displayUserProfile(profile) {
    // Update UI elements with the fetched user profile data
    document.getElementById('username').textContent = profile.fullname || 'Guest';
    // Extend this function to update additional profile information on the dashboard
}

/**
 * Updates the current time on the dashboard every second.
 */
function updateCurrentTime() {
    setInterval(() => {
        const currentTime = new Date().toLocaleTimeString();
        document.getElementById('current-time').textContent = `Current Time: ${currentTime}`;
    }, 1000); // Refresh every second
}

/*function populateNextMealCard(mealData) {
    const template = document.getElementById('meal-card-template').content.cloneNode(true);
    
    // Populate the template with meal data
    template.querySelector('.meal-image').src = mealData.image;
    template.querySelector('.meal-name').textContent = mealData.name;
    template.querySelector('.meal-time').textContent = mealData.time;
    // Add more data as needed
    
    // Insert the populated template into the next meal card placeholder
    document.getElementById('next-meal-card').appendChild(template);
}

// Example usage (this would be replaced with actual data fetching logic)
const nextMealData = {
    image: 'path/to/meal/image.jpg',
    name: 'Chicken Alfredo',
    time: 'Dinner at 6:00 PM'
};
populateNextMealCard(nextMealData);

document.addEventListener('DOMContentLoaded', function() {
    // Other initialization code...

    // Update progress bar dynamically
    updateProgressBar(70); // Assuming 70% is fetched or calculated from somewhere
});

function updateProgressBar(percentage) {
    const progressBarFill = document.getElementById('progress-bar-fill');
    progressBarFill.style.width = percentage + '%'; // Set width based on the percentage
    document.getElementById('progress-percentage').textContent = percentage + '%';
}

// Continue with other functions...
*/