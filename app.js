const express = require("express");
const { pool } = require("./dbConfig");
const bcrypt = require("bcrypt");
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");
require("dotenv").config();
const app = express();
const path = require('path')
const PORT = process.env.PORT || 3000;

const initializePassport = require("./passportConfig");

initializePassport(passport);

// Middleware

// Parses details from a form
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");


app.use(express.static(path.join(__dirname, 'public'))); 




app.use(
  session({
    // Key we want to keep secret which will encrypt all of our information
    secret: process.env.SESSION_SECRET,
    // Should we resave our session variables if nothing has changes which we dont
    resave: false,
    // Save empty value if there is no vaue which we do not want to do
    saveUninitialized: false
  })
);



app.use(passport.initialize()); // Funtion inside passport which initializes passport
app.use(passport.session());
app.use(flash());


















//=======================================================================//
                          //VIEWS//







app.get("/", (req, res) => {
  res.render("index");
});

app.get("/users/register", checkAuthenticated, (req, res) => {
  res.render("register.ejs");
});

app.get("/users/login", checkAuthenticated, (req, res) => {
  
  console.log(req.session.flash.error); // flash sets a messages variable. passport sets the error message
  res.render("login.ejs");
});

app.get("/users/dashboard", checkNotAuthenticated, (req, res) => {
  console.log(req.isAuthenticated());
  res.render("dashboard", { user: req.user.name });
});
app.get("/users/home", checkNotAuthenticated, (req, res) => {
  console.log(req.isAuthenticated());
  res.render("home", { user: req.user.name });
});
app.get("/users/account", checkNotAuthenticated, (req, res) => {
  console.log(req.isAuthenticated());
  res.render("account", { user: req.user.name });
});
app.get("/users/basket", checkNotAuthenticated, (req, res) => {
  console.log(req.isAuthenticated());
  res.render("basket", { user: req.user.name });
});
app.get("/users/health", checkNotAuthenticated, (req, res) => {
  console.log(req.isAuthenticated());
  res.render("health", { user: req.user.name });
});
app.get("/users/pantry", checkNotAuthenticated, (req, res) => {
  console.log(req.isAuthenticated());
  res.render("pantry", { user: req.user.name });
});
app.get("/users/meal-planning", checkNotAuthenticated, (req, res) => {
  console.log(req.isAuthenticated());
  res.render("meal-planning", { user: req.user.name });
});
app.get("/users/social-feed", checkNotAuthenticated, (req, res) => {
  console.log(req.isAuthenticated());
  res.render("social-feed", { user: req.user.name });
});
app.get("/users/search-groceries", checkNotAuthenticated, (req, res) => {
  console.log(req.isAuthenticated());
  res.render("search-groceries", { user: req.user.name });
});



























//=======================================================================//
                          //END OF VIEWS//



app.get("/users/logout", (req, res) => {
  req.logout(function(err) {
     if (err) {
       console.error(err);
       return res.status(500).send('Error logging out');
     }
     res.render("index", { message: "You have logged out successfully" });
  });
 });
 

app.post("/users/register", async (req, res) => {
  let { name, email, password, password2 } = req.body;

  let errors = [];

  console.log({
    name,
    email,
    password,
    password2
  });

  if (!name || !email || !password || !password2) {
    errors.push({ message: "Please enter all fields" });
  }

  if (password.length < 6) {
    errors.push({ message: "Password must be a least 6 characters long" });
  }

  if (password !== password2) {
    errors.push({ message: "Passwords do not match" });
  }

  if (errors.length > 0) {
    res.render("register", { errors, name, email, password, password2 });
  } else {
    hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);

    
    // Validation passed
    pool.query(
      `SELECT * FROM users
        WHERE email = $1`,
      [email],
      (err, results) => {
        if (err) {
          console.log(err);
        }
        console.log(results.rows);

        if (results.rows.length > 0) {
          return res.render("register", {
            message: "Email already registered"
          });
        } else {
          pool.query(
            `INSERT INTO users (name, email, password)
                VALUES ($1, $2, $3)
                RETURNING id, password`,
            [name, email, hashedPassword],
            (err, results) => {
              if (err) {
                throw err;
              }
              console.log(results.rows);
              req.flash("success_msg", "You are now registered. Please log in");
              res.redirect("/users/login");
            }
          );
        }
      }
    );
  }
});

app.post(
  "/users/login",
  passport.authenticate("local", {
    successRedirect: "/users/home",
    failureRedirect: "/users/login",
    failureFlash: true
  })
);

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/home");
  }
  next();
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/users/login");
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});