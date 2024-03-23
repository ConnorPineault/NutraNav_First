const express = require('express');
const bcrypt = require('bcrypt');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const pool = require('./db');
const cors = require('cors'); // CORS import
const upload = require('./config/multerConfig');


// Correct CORS options
const corsOptions = {
    origin: 'http://127.0.0.1:5500', // Replace with your frontend's origin
    credentials: true,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions)); // Use CORS with the correct options
app.use(express.static('Front-End/Professional NutraNav'));
app.use('/uploads', express.static('uploads'));
app.use(session({
    store: new pgSession({
        pool: pool, // Connection pool
        tableName: 'session' // Use another table name if there is a conflict
    }),
    // other settings...
}));

// Signup Route
app.post('/api/signup', async (req, res) => {
    const { fullname, email, password } = req.body; // Use fullname and email instead of username
    const hashedPassword = await bcrypt.hash(password, 10);
    
    try {
      // Insert user into the database
      const result = await pool.query(
        'INSERT INTO users (fullname, email, password) VALUES ($1, $2, $3) RETURNING id', 
        [fullname, email, hashedPassword] // Use fullname and email here
      );
      res.json({ userId: result.rows[0].id, message: "Signup successful" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  
// Login Route
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

        if (rows.length > 0) {
            const validPassword = await bcrypt.compare(password, rows[0].password);
            if (validPassword) {
                req.session.userId = rows[0].id; // Save user id to session
                res.json({ message: "Login successful" });
            } else {
                res.status(401).json({ error: "Invalid credentials" });
            }
        } else {
            res.status(404).json({ error: "User not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

//Implement Logout Functionality

app.post('/api/logout', (req, res) => {
    req.session.destroy(err => {
        if(err) {
            return res.status(500).send('Could not log out, please try again.');
        }
        res.send('Logout successful');
    });
});

  // checks if the user is logged in:
  app.get('/api/isLoggedIn', (req, res) => {
    if (req.session && req.session.userId) {
        res.json({ isLoggedIn: true });
    } else {
        res.json({ isLoggedIn: false });
    }
});



//This includes saving the profile data to the database and handling the profile picture upload

app.post('/api/profile', upload.single('profile_picture'), async (req, res) => {
    if (!req.session.userId) {
        return res.status(401).send('Please log in to update your profile.');
    }
    const { age, gender, allergies, dietary_preferences, health_conditions, fitness_goals, bio } = req.body;
    let profilePictureUrl = null;
    if (req.file) {
        profilePictureUrl = `/uploads/${req.file.filename}`; // Ensure you serve static files from /uploads
    }

    try {
        await pool.query(`
            INSERT INTO profiles (user_id, age, gender, allergies, dietary_preferences, health_conditions, fitness_goals, profile_picture_url, bio) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
            ON CONFLICT (user_id) DO UPDATE 
            SET age = EXCLUDED.age, gender = EXCLUDED.gender, allergies = EXCLUDED.allergies, dietary_preferences = EXCLUDED.dietary_preferences, 
                health_conditions = EXCLUDED.health_conditions, fitness_goals = EXCLUDED.fitness_goals, profile_picture_url = COALESCE(EXCLUDED.profile_picture_url, profiles.profile_picture_url), bio = EXCLUDED.bio
        `, [req.session.userId, age, gender, allergies, dietary_preferences, health_conditions, fitness_goals, profilePictureUrl, bio]);
        res.send('Profile updated successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error updating profile');
    }
});


app.get('/api/profile', async (req, res) => {
    if (!req.session.userId) {
        return res.status(401).send('Not logged in');
    }
    // Fetch user profile data from the database
    try {
        const userProfileData = await pool.query('SELECT * FROM profiles WHERE user_id = $1', [req.session.userId]);
        if (userProfileData.rows.length > 0) {
            res.json(userProfileData.rows[0]);
        } else {
            res.status(404).send('Profile not found');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});


// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

