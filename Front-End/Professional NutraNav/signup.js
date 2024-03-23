document.getElementById('signupForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const fullname = document.getElementById('fullname').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    fetch('http://localhost:3000/api/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fullname, email, password }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.message) {
            alert('Signup successful. Please login.');
            window.location.href = 'login.html';
        } else {
            alert('Signup failed. Please try again.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error during signup. Please try again.');
    });
});
