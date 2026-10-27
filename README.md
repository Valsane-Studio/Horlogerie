# HORLOGERIE — Valsane Studio

Atlas horloger interactif en français, dans la continuité graphique de VIVANT.

## Sections

- La grande histoire : 33 jalons historiques, tri par période, sources accessibles.
- Maisons & calibres : 35 maisons, chronologies, mouvements et familles, recherche par nom/référence.
- Formes & détails : 9 catégories et plus de 85 formes / variantes, illustrations SVG originales, frises par période, fiches d'identification.
- Anatomie : 2 vues vectorielles interactives (habillage extérieur / mouvement mécanique automatique sans chronographe), repères cliquables, explications et précautions de restauration.
- Recherche globale et mise en page responsive. Site statique sans dépendance, service worker pour cache hors ligne, manifeste PWA.

## Publication

Sur GitHub : dépôt > Settings > Pages > Build and deployment > Deploy from a branch > branche main, dossier /(root) > Save. Si le compte GitHub de l'organisation est en formule gratuite, rendre d'abord le dépôt Public via Settings > General > Danger Zone > Change repository visibility. Le site public sera à l'adresse attribuée par Pages (vérifier le lien Visit site dans Settings > Pages).

Attention : le dépôt est initialement privé. L'existence du code ne prouve pas que GitHub Pages soit configuré ou publié.

## Sources & prudence éditoriale

Les liens des sources figurent dans data.js et l'onglet Sources de l'application. Les périodes d'utilisation des familles horlogères sont souvent approximatives, varient selon les références et les marchés. Les illustrations sont des schémas pédagogiques originaux, non des plans de démontage officiels. Le guide n'atteste pas l'authenticité d'une montre ; les fiches techniques des calibres doivent primer pour toute intervention.

## Maintenance

- index.html : structure et sections
- style.css : design responsive
- data.js : histoire, sources et marques
- details.js : répertoire des formes et pièces anatomiques
- calibres.js : dossiers techniques et historiques des calibres, maisons complémentaires
- app.js : navigation, interactions et dessins SVG
- sw.js : cache statique versionné (incrémenter VERSION à chaque publication modifiant les ressources)

© Contenus éditoriaux Valsane Studio. Liens externes présentés à titre documentaire.