# Application Web de Gestion des Interventions Chirurgicales

## Description du Projet

Ce projet consiste à développer une application web permettant de gérer et d'afficher les informations relatives aux interventions chirurgicales à partir d'une base de données au format CSV. L'application exploitera la base de données pour fournir diverses fonctionnalités analytiques et interactives.

## Fonctionnalités de l'Application

### Tableau de Classement des Chirurgiens
- **Nom du chirurgien**
- **Sa spécialité**
- **Nombre d’interventions** (classé du plus grand au plus petit)
- **Anesthésiste favori** (anesthésiste avec lequel le chirurgien a le plus travaillé)
- **Infirmière favorite** (infirmière 1 ou 2 avec lequel le chirurgien a le plus travaillé)
- **Salle la plus fréquente** (salle où le chirurgien a le plus opéré)
- **Acte le plus fréquent** (type d’intervention le plus fréquent)
- **Pagination** : Affichage de 10 profils à la fois avec chargement automatique des profils suivants au scroll
- **Barre de recherche** : Recherche par nom de chirurgien

## Stack Technologique
- **Frontend** : Angular
- **Backend** : Node.js avec Express
- **Base de données** : MongoDB

## Instructions d'Installation

1. **Cloner le dépôt :**
    ```sh
    git clone <URL_DU_DEPOT>
    cd <REPERTOIRE_DU_DEPOT>
    ```

2. **Installer les dépendances :**
    ```sh
    npm install
    cd frontend
    npm install
    ```

3. **Lancer l'application :**
    - Backend :
        ```sh
        npm start
        ```
    - Frontend :
        ```sh
        ng serve
        ```

## Variables d'Environnement
- **MONGODB_URI** : URI de connexion à la base de données MongoDB
- **PORT** : Port sur lequel l'application Express écoute

## Structure du Projet

### Backend
- **server.js** : Point d'entrée de l'application backend
- **routes/interventions.js** : Contient les endpoints pour gérer les interventions
- **models/interventions.js** : Modèle Mongoose pour les interventions

### Frontend
- **app.module.ts** : Module principal de l'application Angular
- **app.component.ts** : Composant principal de l'application
- **app.component.html** : Template principal de l'application

## Base de Données
- Utilisez **MongoDB Atlas** pour héberger la base de données.
- Importez les données à partir du fichier `interventions.csv`.

## Contributeurs
- Azzeddine Nacer (azzeddine.nacer@smartop.io)
- Felix Barriere (felix.barriere@smartop.io)

## Licence
Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus d'informations.

