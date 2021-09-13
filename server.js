const express = require('express')
const app = express()
const cors = require('cors')

const router = require('./api/restaurants_Router')


// ... other imports 
const path = require("path")

// ... other app.use middleware 
app.use(express.static(path.join(__dirname, "client", "build")))

// ...


app.use(cors())
app.use(express.json())

app.use('/a2mbrother/v1/restaurants',router)
app.use('*',(req,res)=>res.status(404).json({error : 'Not Found'}))

// Right before your app.listen(), add this:
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});
module.exports = app