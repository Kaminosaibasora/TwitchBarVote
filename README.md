# TwitchBarVote

Source navigateur OBS permettant de suivre dynamiquement les votes du chat Twitch.

Attentions, les votes sont compris entre 1 et 100.

## Configuration

Précisez le nom de votre chaine dans la balise dédiée de la page **index.html**.
```html
<div id="channel">chaine twitch</div>
```
Ouvrez le fichier dans votre navigateur web et ouvrez les outils de développeur. Dans la console, vous devez voir : ```Connected:irc-ws.chat.twitch.tv:443```. 

Ca y est, vous êtes connectés à votre tchat !

## Installation

Glissez le fichier **index.html** dans votre scène OBS.

## Vignettes

Vous pouvez ajouter des vignettes à côté de votre bar de vote. 

1. Mettez vos vignettes dans le dossier *images*.

2. Allez dans la balise ```script``` de la page **index.html**.

3. Ajoutez pour chacune de vos images un objet comportant le nom exacte de votre image et sa note à la variable ```dataImage```. Exemple :
```javascript
let dataImage = [
    {
        src : "image1.jpg",
        note : 0
    },
    {
        src : "image2.png",
        note : 100
    },
];
```

Vous pouvez mettre autant d'image que vous le souhaitez.

## Utilisation

### Activation du vote

Quand vous voulez activer l'enregistrement des votes, utilisez le bouton **intéragir** d'OBS, puis cliquez sur le bouton *vote*. Celui-ci passe alors en mode *vote en cours*.

Le propriétaire de la chaine ou l'un des modérateurs peut également l'activer directement dans le tchat via la commande **!vote**.

### Vote

Pour voter, rien de plus simple. Il suffit d'écrire un nombre simple dans le tchat, entre 0 et 100. Tout le monde peut participer, mais pour chaque utilisateur, seul le dernier nombre est conservé. Il est donc possible de changer d'avis.

L'idicateur visuel se mettra à jour automatiquement à chaque vote, de même que l'indicateur de moyenne.

> *Attention* : Seuls les messages contenant un nombre simple sont pris en compte.

### Valider le vote

Une fois que les votes ont eu lieu, vous pouvez clore le vote en cliquant à nouveau sur le bouton *vote en cours* ou en utilisant à nouveau la commande *!vote* dans le tchat.

Le résultat du vote s'affichera alors via l'indicateur visuel et l'indicateur de moyenne.
