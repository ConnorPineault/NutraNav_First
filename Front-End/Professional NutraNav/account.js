document.addEventListener('DOMContentLoaded', function() {
    // Attach the event listener to the form submission
    document.getElementById('profileForm').addEventListener('submit', updateProfile);
    // Check if the user is logged in and fetch profile data
    fetchUserProfile();
});


function updateProfile(event) {
    event.preventDefault();  // Prevent the form from submitting the traditional way
    const formData = new FormData(event.target); // Grab the form data

    // Send the form data to the server using fetch API
    fetch('http://localhost:3000/api/profile', {
        method: 'POST',
        credentials: 'include',  // Make sure cookies are included
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log('Profile updated:', data);
        alert('Profile updated successfully!');
        // Optionally refresh data or navigate to another page
    })
    .catch(error => {
        console.error('Error updating profile:', error);
        alert('Error updating profile. Please try again.');
    });
}






function fetchUserProfile() {
    console.log('Fetching user profile...');
    fetch('http://localhost:3000/api/profile', {
      method: 'GET',
      credentials: 'include'
    })
    .then(response => {
        if (!response.ok) {
            // If the response is not okay, throw an error with the status
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        // Populate form fields with the fetched data
        // ...
    })
    .catch(error => {
        console.error('Error fetching user profile:', error);
        if (error.message.includes('401')) {
            // If the error is 401 Unauthorized, redirect to the login page
            window.location.href = 'login.html';
        } else {
            alert(`Error fetching profile data: ${error.message}`);
        }
    });
}



//Logout Functionality
document.getElementById('logoutButton').addEventListener('click', function() {
    fetch('http://localhost:3000/api/logout', {
        method: 'POST',
        credentials: 'include'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();
    })
    .then(() => {
        alert('Logged out successfully!');
        // Redirect to the login page or update the UI accordingly
    })
    .catch(error => {
        console.error('Error logging out:', error);
        alert('Error logging out. Please try again.');
    });
});
//() Check if user logged in
function checkLoginStatus() {
    fetch('http://localhost:3000/api/isLoggedIn', {
        method: 'GET',
        credentials: 'include'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        if (!data.isLoggedIn) {
            // Redirect to the login page or show a login prompt
            window.location.href = 'login.html';
        }
    })
    .catch(error => {
        console.error('Error checking login status:', error);
    });
}



// Call this function when the page loads to check login status
checkLoginStatus();

