const express = require('express');
const mongoose = require('mongoose');
const app = express();

const DBName =  "mongodb+srv://ajithn5432:ajithn5432@cluster0.wefyy4c.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(DBName, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
})
.then(() => {
    console.log("DB CONNECTED")
})
.catch(err => {
    console.log("DB CONNECTION FAILED")
})



const port =  8000;



app.get("/login", (req, res) => {
    return res.send("welcome to backend!!!")
})

app.listen(port, () => console.log(`port is running on ${port}`));
