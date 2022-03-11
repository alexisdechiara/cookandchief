# Cook & Chief
Ceci correspond au travail réalisé par Alexis De Chiara et Zacharie Serra pour le TP noté de E-Business, l'installation des packages à été faite avec `yarn` mais `npm` peut aussi être utilisé.

Pour installer yarn il faut faire :
```bash
npm install --global yarn
```

## Back-end

**Instruction :** [https://pierrecavalet-apidae.netlify.app/tp/final.html](https://pierrecavalet-apidae.netlify.app/tp/final.html) <br>
**Résultat :** [https://cookandchief.herokuapp.com/](https://cookandchief.herokuapp.com/)

### Installation et execution

*Installer [node.js](nodejs.org) en version 16 LTS miniumun si vous ne l'avez pas.* <br><br>
Télécharger la dernière release, dans le répertoire backend, pour installer les packages saisir :

```bash
yarn install
```
et pour lancer le serveur :
```bash
node main.js
```

### Informations à savoir

La sécurité étant réalisée au niveau front, il n'y pas de vérifications de la personne qui envoie la demande au serveur donc cela correspond potentiellement à une faille de sécurité.

## Front-end

**Instruction :** [https://github.com/Tyki/VueJS-Formation](https://github.com/Tyki/VueJS-Formation/blob/master/Sujet%20VUEJS%20Licence%20APIDAE%202021-2022.pdf) <br>
**Résultat :** [https://cookandchief.herokuapp.com/](https://cookandchief.herokuapp.com/)

### Installation et execution

*Installer [Vue Cli](https://cli.vuejs.org/guide/installation.html) en faisant `yarn global add @vue/cli` si vous ne l'avez pas.* <br><br>
Télécharger la dernière release, dans le répertoire frontend, pour installer les packages saisir :
```bash
yarn install
```
pour lancer le serveur :
```bash
vue-cli-service serve
```
pour build le projet :
```bash
vue-cli-service build
```

### Informations à savoir

#### CRUD

On peut créer et voir une recette dans l'accueil, si une recette nous appartient, on peut la supprimer, mais la modification ce fait dans la page concernant la recette. Lorsque l'on visualise une recette, on peut la supprimer ou la modifier s'il s'agit de la nôtre. Il n'y a pas de route à proprement parler pour le CRUD, tout ce fait sur un seul composant. Voici un tableau récapitulatif pour mieux comprendre :

|                    | CREATE | READ | UPDATE | DELETE |
|--------------------|--------|------|--------|--------|
| Acceuil            | ✅      | ✅    |        | ✅      |
| Page de la recette |        |      | ✅      | ✅      |

#### Bugs connus

Il y a un bug au niveau de la modification d'une recette, lorsque l'on revient dans la page d'accueil une fois la recette modifiée et que l'on reclique sur cette même recette elle nous est affiché comme indéfini, pour y remédier merci d'actualiser la page.
