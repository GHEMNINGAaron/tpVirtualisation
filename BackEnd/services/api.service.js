const config = require('../configurations/conf.db')
const aws = require('../configurations/conf.s3')
const db = require('./db.service')
const helper = require('../helper')
const fs = require('fs');


async function uploadFichier(fichier) {
    return new Promise((resolve, reject) => {
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
                reject(err);
            } else {
                console.log('Fichier envoyé avec succès sur S3');
                resolve(data.Location); // Renvoie l'URI du fichier téléchargé
            }
        });
    });
}

async function inscription(user) {
    try {
        // Télécharge le fichier CV
        const cvUri = await uploadFichier(user.cv);

        // Télécharge le fichier photo
        const photoUri = await uploadFichier(user.photo);

        // Insère les données dans la base de données avec les URIs des fichiers
        const ins = await db.query(
            `INSERT INTO user(id, nom, prenom, mail, password, cv, photo) VALUES (NULL, '${user.nom}', '${user.prenom}', '${user.mail}', '${user.password}', '${cvUri}', '${photoUri}');`
        );
        const data = helper.emptyOrRows(ins);
        return data;
    } catch (error) {
        console.error("Erreur lors de l'inscription : ", error);
        throw error;
    }
}

module.exports = { 
    inscription,
    uploadFichier
}

