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

### Déploiement Manuel

L'application peut être déployée manuellement sur AWS S3 avec CloudFront :

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

### Déploiement Automatique avec AWS CodeBuild

Le projet est configuré pour être déployé automatiquement via AWS CodeBuild. Le processus de déploiement est défini dans le fichier `buildspec.yml`.

Pour configurer le déploiement automatique :

1. Créer un projet CodeBuild dans AWS Console
2. Configurer les variables d'environnement :
   - `S3_BUCKET` : Le nom de votre bucket S3
   - `CLOUDFRONT_DISTRIBUTION_ID` : L'ID de votre distribution CloudFront
3. Connecter le projet à votre repository GitHub
4. Configurer les déclencheurs de build (par exemple, à chaque push sur la branche main)

Le pipeline de déploiement effectuera automatiquement :
- Installation des dépendances
- Build de l'application
- Déploiement sur S3
- Invalidation du cache CloudFront

## Configuration AWS

### Configuration Manuel
Avant de déployer manuellement, configurez les variables suivantes dans package.json :
- `your-bucket-name` : Le nom de votre bucket S3
- `YOUR_DISTRIBUTION_ID` : L'ID de votre distribution CloudFront

### Configuration CodeBuild
Dans la console AWS CodeBuild, configurez les variables d'environnement :
- `S3_BUCKET` : Le nom de votre bucket S3
- `CLOUDFRONT_DISTRIBUTION_ID` : L'ID de votre distribution CloudFront

## Technologies utilisées

- React
- TypeScript
- AWS S3
- AWS CloudFront
- AWS CodeBuild
- ChatGPT API (pour la transformation d'images)
