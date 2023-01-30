const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const mysql2 = require("mysql2");
const cors = require("cors");

const db = mysql2.createPool({
    host: "localhost",
    user: "root",
    password: "Chamel1!",
    database: "scn_product"
});



app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));


app.get("/api/get", (req, res) => {
    const sqlGet = "SELECT * FROM product_db";
    db.query(sqlGet, (error, result) => {
        res.send(result);
    })
})

app.post("/api/post", (req, res) => {
    const {Sku, Name, Price, Size, Weight, Length, Width, Height} = req.body;
    const sqlInsert = "INSERT INTO product_db (Sku, Name, Price, Size, Weight, Length, Width, Height) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    db.query(sqlInsert, [Sku, Name, Price, Size, Weight, Length, Width, Height], (error, result) => {
        if (error){
            console.log(error);
        }
    })
})

app.delete("/api/remove/:Sku", (req, res) => {
    const {Sku} = req.params;
    const sqlRemove = "DELETE FROM product_db WHERE Sku = ?";
    db.query(sqlRemove, Sku, (error, result) => {
        if (error){
            console.log(error);
        }
    })
})


app.all('/', (req, res) => {
    console.log("Just got a request!")
    res.send('Yo!')
})
app.listen(process.env.PORT || 3000)