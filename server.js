const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const exp = require("constants");
const connection = require("./db");

const app = express();
app.use(express.urlencoded({extended: false}))

const PORT = 3000;

// FIX: Changed app.unsubscribe to app.use
app.use(express.static(path.join(__dirname, 'static')));
app.use(express.static('public'));


app.get("/", (req, res) => {
     res.sendFile(path.join(__dirname, "views", "index.html")); // Optimized pathing
});

app.get("/sql", (req, res) => {
     res.sendFile(path.join(__dirname, "views", "sql.html")); // Optimized pathing
});

app.post('/api', function(req, res){
    console.log(req.body)
    const username = req.body.user
    const password = req.body.password
    
    // secure database
    connection.query("INSERT INTO sql_injection(user, password) VALUES (?, ?)", 
    [username, password],
    (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send("Database error");
        }
        
        // It's a good practice to send a response back to the client/frontend
        res.status(200).send("Data stored successfully!");
    })
})

app.post("/login", function(req, res){
    const username1 = req.body.user1;
    const password1 = req.body.password1;
    
    //vulnerable database
    connection.query("SELECT * FROM sql_injection WHERE user = '" + req.body.user1 + "' AND password = '" + req.body.password1 + "'",
    [username1, password1],
    (err, result) => {
        if (err){
            return res.send({err: err});
        }
        
        if (result.length > 0) {
            res.send({ message: "Login successful!" });
        } else {
            res.send({ message: "Invalid credentials" });
        }
    });
});





// Locate your listen block at the bottom and update it to this:
app.listen(PORT, "0.0.0.0", function(){
    console.log("Server is working live on port " + PORT);
    
    // Testing the database pool connection safely
    connection.getConnection(function(err, poolConnection){
        if(err) {
            console.error("Database connection pool failed: " + err.message);
            return;
        }
        console.log("Database connection pool is working cleanly!");
        poolConnection.release(); // Safely release it back to the pool
    });
});
