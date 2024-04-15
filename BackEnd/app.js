const express = require("express")
const app = express()
const cors = require('cors');


const port = 3000
const apiRoute = require('./routes/api.routes')

app.use(cors()) 

app.use(express.json())

app.use(
    express.urlencoded({
        extended: true,
    })
)

app.get("/", (req, res) => {
    res.json({message: "ok"})
})

app.use("/apiauth", apiRoute)

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({message : err.message})
    return; 
})

app.listen(port, ()=> {
    console.log(`APIAUTH app listening at https://localhost:${port}`)
})