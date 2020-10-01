// var requestURL = 'https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json';
//Creation des options de la requete
var requestURL = "./superheroes.json";
console.log(requestURL);
var request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'text'; //On prend l'exemple que l'on recupere du texte pour transformer en JSON meme si le fichier est déjà en JSON
request.send(); //On envoie la requete
//On recupere ce qui a été demandé lors du declencheur on load
request.onload = function() {
    var superHeroes = JSON.parse(request.response);

    populateHeader(superHeroes);
    showHeroes(superHeroes);
}

//On créé le contenu html via les données
function populateHeader(jsonObj) {
    var myH1 = document.createElement('h1');
    myH1.textContent = jsonObj.squadName;
    // console.log(jsonObj);
    // console.log(typeof(jsonObj.squadName));
    
    // myH1.textContent = jsonObj.squadName;
    header.appendChild(myH1);
    
    var myPara = document.createElement('p');
    //myPara.textContent = 'Hometown: ' + jsonObj['homeTown'] + jsonObj['formed'];
    myPara.textContent = `Hometown: ${jsonObj.homeTown} ${jsonObj.formed}`;
    header.appendChild(myPara);
}

function showHeroes(jsonObj) {
    var heroes = jsonObj['members'];
        
    for (var i = 0; i < heroes.length; i++) {
      var myArticle = document.createElement('article');
      var myH2 = document.createElement('h2');
      var myPara1 = document.createElement('p');
      var myPara2 = document.createElement('p');
      var myPara3 = document.createElement('p');
      var myList = document.createElement('ul');
  
      myH2.textContent = heroes[i].name;
      myPara1.textContent = 'Secret identity: ' + heroes[i].secretIdentity;
      myPara2.textContent = 'Age: ' + heroes[i].age;
      myPara3.textContent = 'Superpowers:';
          
      var superPowers = heroes[i].powers;
      for (var j = 0; j < superPowers.length; j++) {
        var listItem = document.createElement('li');
        listItem.textContent = superPowers[j];
        myList.appendChild(listItem);
      }
  
      myArticle.appendChild(myH2);
      myArticle.appendChild(myPara1);
      myArticle.appendChild(myPara2);
      myArticle.appendChild(myPara3);
      myArticle.appendChild(myList);
  
      section.appendChild(myArticle);
    }
  }
  