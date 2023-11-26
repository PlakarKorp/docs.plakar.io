# C'est quoi plakar ?

`plakar` est un utilitaire **gratuit** et [opensource](https://github.com/poolpOrg/plakar) pour créer des sauvegardes versionnées avec compression,
chiffrement et déduplication de la donnée.

Il est conçu pour être simplissime d'utilisation,
ne demandant que quelques minutes pour se familiariser avec la plupart de ses commandes.
Créer une sauvegarde est aussi simple que de taper `plakar push` et restaurer est aussi simple que de taper `plakar pull`.

`plakar` est écrit en [Go](https://go.dev),
developpé principalement sur [macOS](https://www.apple.com/macos/) et [OpenBSD](https://www.OpenBSD.org),
construit et testé sous Linux,
et devrait fonctionner sur la plupart des systèmes de type Unix modernes.


## Licence

Il est distribué sous la licence ISC, comme suit:

```text
Copyright (c) 2021 Gilles Chehade <gilles@poolp.org>

Permission to use, copy, modify, and distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
```

Ou en d'autres termes:
faites-en ce que vous voulez du moment que vous conservez ce copyright,
et utilisez à votre propre risque car il est fourni en l'état et je ne serais pas responsable s'il vous explose en pleine face.


## Versions

À ce stade prématuré de son développement,
il n'est pas utilisable pour de la production et ne devrait être utilisé qu'à des fins de test.

Aucun numéro de version n'est assigné pour l'instant.


## Pré-requis

Il requière Go 1.16 ou supérieur.


## Installation

```sh
go install github.com/PlakarLabs/plakar/cmd/plakar@latest
```


## Discussions

Les discussions et les questions concernant le projet peuvent prendre place dans [Github discussions](https://github.com/poolpOrg/plakar/discussions),
ou sur le [channel Discord](https://discord.gg/YC6j4rbvSk).
