const express = require('express')
let router  = express.Router();
const apiServ =  require('../services/api.service')
const multer = require('multer');

const upload = multer({ dest: './uploads/' });

router.post('/inscription', upload.fields([{ name: 'cv' }, { name: 'photo' }]), async function(req, res, next){
    try{
        const { nom, prenom, mail, password } = req.body;
        const cv = req.files['cv'][0];
        const photo = req.files['photo'][0];

        if (!cv || !photo) {
            return res.status(400).json({ message: 'Les fichiers CV et photo sont requis' });
        }

        const user = {
            nom,
            prenom,
            mail,
            password,
            cv,
            photo
        };

        const result = await apiServ.inscription(user);
        res.json(result);
    }catch(error){
        console.error("Erreur lors de l'inscription : ", error)
        next(error)
    }
})

module.exports = router