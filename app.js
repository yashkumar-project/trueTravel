const express = require('express');
const app = express();
const mongoose = require('mongoose');

app.use(express.json());

mongoUrl= 'mongodb://127.0.0.1:27017/truetravel';

connectDB().then(()=>{
    console.log("connect to Database");
}).catch((err) =>{
    console.log(err);
});


async function connectDB() {
    await mongoose.connect(mongoUrl);
}
    
        

app.get('/', (req, res) => {
    res.send("hello world");
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});