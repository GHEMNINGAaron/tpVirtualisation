const express = require('express')
let router  = express.Router();
const apiServ =  require('../services/api.service')
const multer = require('multer');

const upload = multer({ dest: './uploads/' });

router.post('/inscription', upload.single('file'), async function(req, res, next){
    try{
        //res.json(await apiServ.inscription(req.body));
        console.log(req.file)

        if (!req.file) {
            return res.status(400).json({ message: 'Aucun fichier téléchargé' });
        }

        res.json(await apiServ.uploadFichier(req.file))
    }catch(error){
        console.error("Erreur lors de l'inscription : ", error)
        next(error)
    }
})

module.exports = router