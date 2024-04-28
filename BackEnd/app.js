const express = require("express")
const app = express()
const cors = require('cors');
const aws = require('./configurations/conf.s3')

const port = 3000
const apiRoute = require('./routes/api.routes')

app.use(cors()) 

app.use(express.json())

app.use(async (req, res, next) => {
    try {
        // Vérifier si le bucket existe déjà
        await aws.s3.headBucket({ Bucket: 'mes-fichiers' }).promise();
        console.log('Bucket S3 existe déjà.');
    } catch (error) {
        if (error.statusCode === 404) {
            // Le bucket n'existe pas, le créer
            await aws.s3.createBucket({ Bucket: 'mes-fichiers' }).promise();
            console.log('Bucket S3 créé avec succès.');
        } else {
            // Une erreur s'est produite lors de la vérification du bucket
            console.error('Erreur lors de la vérification du bucket S3:', error);
        }
    }
    next();
});

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