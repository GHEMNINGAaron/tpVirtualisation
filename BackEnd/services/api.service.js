const config = require('../configurations/conf.db')
const aws = require('../configurations/conf.s3')
const db = require('./db.service')
const helper = require('../helper')
const fs = require('fs');


async function inscription(user){
    
    const ins = db.query(
        `INSERT INTO user(id, nom, prenom, mail, password, cv, photo) VALUES (NULL, '${user.nom}', '${user.prenom}', '${user.mail}', '${user.password}', '${user.cv}', '${user.photo}');`
    );
    data  = helper.emptyOrRows(ins);
    return data;
}

async function uploadFichier(fichier){

    const file = fichier;

    const fileData = fs.readFileSync(file.path);

    const params = {
        Bucket: "mes-fichiers", 
        Key: file.originalname, 
        Body: fileData, 
    };


    aws.s3.upload(params, (err, data) => {
        if (err) {
            console.error(err);
            console.log('Erreur lors de l\'envoi du fichier sur S3');
        } else {
            console.log('Fichier envoyé avec succès sur S3');
        }
    });
}

module.exports = { 
    inscription,
    uploadFichier
}

