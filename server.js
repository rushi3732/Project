const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./app/models");

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Database connection
db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Connected to the database!");
    })
    .catch(err => {
        console.log("Cannot connect to the database!", err);
        process.exit();
    });

// CORS configuration
var allowlist = ['http://localhost:3000']
var corsOptionsDelegate = function (req, callback) {
    var corsOptions;
    if (allowlist.indexOf(req.header('Origin')) !== -1) {
        corsOptions = { origin: true } // Reflect the requested origin in the CORS response
    } else {
        corsOptions = { origin: false } // Disable CORS for this request
    }
    callback(null, corsOptions);
}
app.use(cors(corsOptionsDelegate)); // Use this after the variable declaration

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    next();
});

// Routes
 app.use(require("./app/routes/user.route"));
 app.use(require("./app/routes/account.route"));
//app.use("/api/users", require("./app/routes/user.route")); // Replace with your user route path
//app.use("/api/accounts", require("./app/routes/account.route"));

// Set port, listen for requests
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
