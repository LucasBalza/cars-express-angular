# Application de Gestion de Voitures

Cette application est un système de gestion de voitures développé avec Angular pour le frontend et Express.js pour le backend, utilisant Prisma avec SQLite comme base de données.

## Prérequis

- Node.js (version 18 ou supérieure)
- npm (version 9 ou supérieure)
- Angular CLI (version 17 ou supérieure)

## Installation

1. Installation des dépendances du backend :
```bash
cd backend
npm install
```

2. Installation des dépendances du frontend :
```bash
cd ../frontend
npm install
```

## Configuration de la base de données


1. Appliquer les migrations :
```bash
# Créer une migration
npx prisma migrate dev --name init

# Générer le client Prisma
npx prisma generate
```

2. Insérer les données de test via le seeder :
```bash
# Exécuter le seeder
npx prisma db seed
```

## Lancement de l'application

1. Démarrer le backend :
```bash
cd backend
npm start
```

2. Démarrer le frontend :
```bash
cd frontend
ng serve
```

L'application sera accessible à l'adresse : `http://localhost:4200`

Vous pourrez vous enregistrer avec le rôle voulu (ADMIN, ou USER) puis vous connecter et naviguer sur l'application.

## Fonctionnalités

- Authentification (inscription/connexion)
- Gestion des voitures (CRUD)
- Interface responsive
- Validation des formulaires
- Gestion des rôles (admin/user)


## API Endpoints

### Authentification
- POST `/api/auth/register` - Inscription
- POST `/api/auth/login` - Connexion

### Voitures
- GET `/api/cars` - Liste des voitures
- GET `/api/cars/:id` - Détails d'une voiture
- POST `/api/cars` - Création d'une voiture
- PUT `/api/cars/:id` - Modification d'une voiture
- DELETE `/api/cars/:id` - Suppression d'une voiture

## Technologies utilisées

- Frontend :
  - Angular 17
  - RxJS
  - Bootstrap 5
  - Angular Material

- Backend :
  - Express.js
  - Prisma ORM
  - SQLite
  - JWT pour l'authentification 


# Questions Angular

1. **Quelle est la différence entre AngularJS et Angular ?**

AngularJS était la première version du framework, écrite en JavaScript. C'était une version plus simple qui utilisait une architecture MVC et des contrôleurs. Angular (2+) est une réécriture complète en TypeScript qui utilise une architecture basée sur les composants. C'est beaucoup plus performant et moderne, avec un meilleur support mobile et une meilleure gestion des données asynchrones grâce à RxJS.

2. **Quelles sont les nouveautés apportées depuis Angular 14 et confirmées en Angular 19 ?**

Angular 14 a introduit des fonctionnalités importantes comme les composants autonomes (standalone) et les formulaires typés. En Angular 19, on a vu l'arrivée du chargement différé (defer loading), une nouvelle API pour les transitions de vue, et des améliorations des signals. C'est vraiment devenu plus facile à utiliser et plus performant.

3. **Quelles sont les étapes nécessaires pour installer et configurer Angular ?**

Pour commencer avec Angular, il faut d'abord installer Node.js sur son PC. Ensuite, on installe le CLI Angular globalement avec npm. On peut alors créer un nouveau projet avec la commande ng new, où on choisit si on veut le routing et quel préprocesseur CSS utiliser. Une fois le projet créé, on installe les dépendances avec npm install et on lance le serveur de développement avec ng serve.

4. **C'est quoi un composant Angular ?**

Un composant Angular, c'est comme un bloc de construction de l'application. Il contient trois parties principales : un template HTML pour l'affichage, une classe TypeScript pour la logique, et des styles CSS pour l'apparence. C'est un peu comme une page web complète en miniature, avec sa propre logique et son propre style.

5. **C'est quoi une directive Angular ?**

Les directives sont des instructions qu'on donne à Angular pour modifier le DOM. Il y en a de trois types : les directives structurelles qui modifient la structure du DOM (comme *ngIf pour afficher ou cacher des éléments), les directives d'attribut qui modifient l'apparence ou le comportement (comme ngClass pour gérer les classes CSS), et les composants qui sont des directives avec leur propre template.

6. **C'est quoi un service Angular ?**

Un service Angular, c'est une classe qui contient la logique métier de l'application. C'est utile pour partager des données ou des fonctionnalités entre différents composants. Par exemple, si on veut gérer l'authentification ou faire des appels API, on crée un service pour ça.

7. **Que fait la fonction ngOnInit ?**

ngOnInit est une fonction qui s'exécute automatiquement juste après qu'un composant est créé. C'est le meilleur endroit pour faire des initialisations, comme charger des données depuis une API ou mettre en place des configurations. C'est comme le "démarrage" du composant.

8. **Quels sont les fichiers principaux générés dans un projet Angular ?**

Dans un projet Angular, on a plusieurs fichiers importants. Le angular.json configure tout le projet, le package.json liste toutes les dépendances, et le tsconfig.json configure TypeScript. Dans le dossier src, on trouve le main.ts qui lance l'application, et dans app, on a le module principal et le composant racine.

9. **C'est quoi le mécanisme de routage en Angular ?**

Le routage en Angular permet de naviguer entre différentes pages de l'application. On configure les routes dans un fichier spécial, et on utilise le composant router-outlet pour afficher le contenu correspondant à l'URL actuelle.

10. **C'est quoi RxJS ?**

RxJS est une bibliothèque qui permet de gérer les opérations asynchrones de manière élégante. C'est utile pour gérer les événements, les appels API, et toutes sortes de données qui changent dans le temps.

11. **Explique brièvement la notion d'observable et comment l'utiliser**

Un Observable, c'est comme un flux de données qui peut changer dans le temps. On peut s'abonner à ce flux avec subscribe et utiliser des opérateurs comme map pour transformer les données. C'est pratique pour gérer les appels API ou les événements utilisateur.

12. **Explique la différence entre un Subject et un BehaviorSubject**

Un Subject est comme un canal de communication qui n'a pas de valeur initiale. Un BehaviorSubject, c'est pareil mais il garde en mémoire la dernière valeur et la partage avec les nouveaux abonnés. C'est utile quand on veut toujours avoir accès à la dernière donnée.

13. **Le fichier angular.json sert à quoi ?**

Le fichier angular.json, c'est comme le plan de construction de l'application. Il définit comment l'application doit être construite, quels fichiers inclure, et comment configurer l'environnement de développement.

14. **Explique à quoi servent ces commandes Angular CLI**

Ces commandes sont des raccourcis super utiles pour créer des parties de l'application. 

- `ng serve` lance le serveur de développement, 
- `ng serve --port 4500` lance le serveur mais sur le port 4500 au lieu du 4200 par défaut,
- `ng g c moncomponent` crée un composant nommé `moncomponent`, 
- `ng g class MaClasse` crée une classe nommée `MaClasse`,
- `ng g service MonService` crée un service nommé `MonService`, 
- `ng g guard AuthGard` crée un guard nommé `AuthGuard`,
- `ng new GestionVols` crée un nouveau projet angular nommé `GestionVols`.
- `json-server --watch produit.json --port 3500` lance le serveur json sur le port 3500 avec comme base de données le fichier nommé `produit.json`.

15. **Comment appelle-t-on cet élément @Component et quels sont ses attributs ?**

@Component est un décorateur qui transforme une classe en composant Angular. Il a plusieurs attributs importants : selector (pour identifier le composant dans le HTML), templateUrl (pour le template), et styleUrls (pour les styles). C'est comme une étiquette qui dit à Angular "cette classe est un composant".

16. **Explique le mécanisme de composant enfant et composant parent**

La communication entre composants parent et enfant se fait avec @Input et @Output. Le parent peut passer des données à l'enfant avec @Input, et l'enfant peut envoyer des événements au parent avec @Output. C'est comme une conversation entre un parent et son enfant, où chacun peut envoyer et recevoir des messages. 