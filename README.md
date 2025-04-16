# Image Transformation App

Une application React pour transformer vos images en œuvres d'art grâce à l'IA.

## Fonctionnalités

- Upload d'images avec prévisualisation
- Transformation d'images en œuvres d'art
- Interface utilisateur moderne et responsive
- Téléchargement et partage des images transformées

## Installation

```bash
# Installer les dépendances
npm install

# Lancer l'application en mode développement
npm start
```

## Déploiement

L'application est déployée sur AWS S3 avec CloudFront. Pour déployer :

1. Construire l'application :
```bash
npm run build
```

2. Déployer sur S3 :
```bash
npm run deploy
```

3. Invalider le cache CloudFront :
```bash
npm run invalidate
```

## Configuration AWS

Avant de déployer, configurez les variables suivantes dans package.json :
- `your-bucket-name` : Le nom de votre bucket S3
- `YOUR_DISTRIBUTION_ID` : L'ID de votre distribution CloudFront

## Technologies utilisées

- React
- TypeScript
- AWS S3
- AWS CloudFront
- ChatGPT API (pour la transformation d'images)
