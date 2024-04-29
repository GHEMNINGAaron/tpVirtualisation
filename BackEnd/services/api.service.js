const aws = require('../configurations/conf.s3')
const db = require('./db.service')
const helper = require('../helper')
const fs = require('fs');
const user = require('../models/user');
const { userInfo } = require('os');


async function uploadFichier(fichier) {

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

async function inscription(userData) {
    try {
        // Télécharge le fichier CV
        userData.cv = await uploadFichier(userData.cv);

        // Télécharge le fichier photo
        userData.photo = await uploadFichier(userData.photo);

        console.log(userData);
        // Insère les données dans la base de données avec les URIs des fichiers
        const newUser = await user.create(userData);
        
        return newUser;
    } catch (error) {
        console.error("Erreur lors de l'inscription : ", error);
        throw error;
    }
}

async function connexion(mail, password){

    // Recherchez l'utilisateur dans la base de données par son nom d'utilisateur
    try {
        const userData = await user.findOne({ where: { mail } });
        if (userData && userData.password === password) {
            return { success: true, message: 'Connexion réussie', userInfo : userData };
        } else {
            return { success: false, message: 'Nom d\'utilisateur ou mot de passe incorrect' };
        }
    } catch (error) {
        console.error('Erreur lors de la connexion : ', error);
        return { success: false, message: 'Une erreur s\'est produite. Veuillez réessayer.' };
    }
    

}

async function resetPassword(mail, password) {
    try {
        
        const userData = await user.findOne({ where: { mail } });
        if (!userData) {
            
            return { success: false, message: 'Utilisateur non trouvé' };
        }

        // Mettez à jour le mot de passe de l'utilisateur dans la base de données
        await user.update({ password: password }, { where: { mail } });

        // Retournez un message de succès
        return { success: true, message: 'Mot de passe réinitialisé avec succès', userInfo : userData };
    } catch (error) {
        // En cas d'erreur, retournez un message d'erreur générique
        console.error('Erreur lors de la réinitialisation du mot de passe : ', error);
        return { success: false, message: 'Une erreur s\'est produite. Veuillez réessayer.' };
    }
}

module.exports = { 
    inscription,
    uploadFichier,
    connexion,
    resetPassword
}

