const bcrypt = require('bcrypt');

const password = 'myPassword123';

bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
        console.error('Error hashing password:', err);
        return;
    }
    console.log('Hashed password:', hash);

    bcrypt.compare(password, hash, (err, result) => {
        if (err) {
            console.error('Error comparing passwords:', err);
            return;
        }
        console.log('Password match:', result);
    });
});
