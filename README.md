# twitee-sphere
Ce projet réalisé dans le cadre de la formation BelieveMy a été réalisé par 3 personnes :
- Thibault alias Ecare
- Sebastien alias Sebastien M.
- Tristant alias... tristan

## Description du projet
Nous avons voulu faire un projet de A à Z en ayant une démarche professionnelle. Pour ce faire, nous sommes parti sur une phase de description des fonctionnalités attendues. En dehors du projet de base (faire un fork de tweeter) nous avons pensé à y inclure un système de point.

Un système de communauté avec des points par post, like, commentaire a été mis en place et permet d'avoir un classement des communautés selon celle qui sont les plus actives !

## Maquettage
Nous avons créé une maquette avant le commencement du projet. Cela nous permet d'établir ou nous irons, et de voir si nos idées collent avec le projet. Nous avons utilisé Figma.

https://www.figma.com/design/QD3XRnfYq4kdCxM4dftHPf/Projet-%233-%2F-TwiteeElement?node-id=0-1&t=qm7Zhe7wjTTOGypt-1

Une fois la phase de maquettage terminée, on se répartit les taches. Ayant une plus grande expérience dans le code, Sebastien prend le backend, et les phases review de code niveau frontend. Tristan et Thibault se collent au frontend.

## Technologie
On décide d'utiliser comme technologies :
- React pour le frontend
- Tailwind CSS pour le Style
- Fastify pour le backend
- Docker pour la containerisation

## Ticketing
Nous avons mis en place pour partager nos tâches, un système de ticketing sur github (issues) qui nous a permis de découper le projet et de ne pas éxécuter des tâches similaires. On prévoit également cette phase de ticket pour simplifier les merge.

https://github.com/users/Ulthane/projects/5/settings

## Phase développement
On commence chacun notre phase de développement, je mets en place le backend rapidement pour que Tristan et Thibault puissent commencer le frontend. 

Pour éviter les taches redondantes. Je mets en place un système de containerisation automatisé a base de Github Actions, il me suffira de push la branche release pour build le projet, pousser les images sur un registry interne chez moi.

Grace à portainer j'update les containers avec un simple "Pull and Redeploy" vue que le projet et lier au fichier docker-compose du git. Je fais mes redirections réseaux depuis un reverse proxy pour pouvoir joindre le projet depuis plusieurs nom de domaine.

## Documentation
Nous mettons en place une documentation disponible ici : https://twitee-doc.gamosaurus.fr pour nous aider dans le développement du projet avec les endpoints.

L'API sera joignable grace a un système de token JWT qui intègre l'id utilisateurs.

## API
L'API est joignable depuis ce lien :

- https://twitee-api.gamosaurus.fr

## Review de code
Les phases de review de code étaient plutot légères, quelques bugs corrigés, du style à peaufiner. Dans l'ensemble les phases de review était rapide au départ. Un peu moins vers la fin ou nous avons rencontré beaucoup de soucis de rafraichissement qui n'avais pas été pris en compte dès le départ.

## Lien du projet
https://twitee-sphere.gamosaurus.fr