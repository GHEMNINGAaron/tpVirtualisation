const express = require('express')
let router = express.Router();
const apiServ = require('../services/api.service')
const multer = require('multer');

const upload = multer({ dest: './uploads/' });

router.post('/inscription', upload.fields([{ name: 'cv' }, { name: 'photo' }]), async function (req, res, next) {
    try {
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
        res.status(200).json({ message: 'Inscription réussie', user: result });
    } catch (error) {
        console.error("Erreur lors de l'inscription : ", error)
        res.status(400).json({ message: 'Échec de l\'inscription', error: error });
    }
})

router.post('/connexion', async function (req, res, next) {
    const { email, password } = req.body;
    console.log(req.body)
    const result = await apiServ.connexion(email, password);
    if (result.success) {
        req.session.isAuthenticated = true;
        res.status(200).json({ message: 'Connexion réussie', user: result.userInfo });
    } else {
        res.status(400).json({ message: 'Échec de la connexion', error: result.message });
    }
})

router.post('/resetPassword', async function (req, res, next) {
    const { mail, password } = req.body;
    console.log(req.body)
    const result = await apiServ.resetPassword(mail, password);
    if (result.success) {
        res.status(200).json({ message: result.message, user: result.userInfo });
    } else {
        res.status(400).json({ message: 'Échec de la reenitialisation', error: result.message });
    }
})

module.exports = router