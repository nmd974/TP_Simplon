var nomJoueur = "";
var contentJson = [];
let contentLocalStorageName = [];
var dataToStore = [];

//Lancement du jeu via la demande du nom du joueur
function startGame(){
    alert("La partie va débuter. Prepare for WAR !");
    nomJoueur = prompt("Veuillez vous identifier svp");
    if(nomJoueur !== ""){
        document.getElementById("nomUser").textContent = nomJoueur;
        //checkingFichierJson()
        checkingLocalStorage(nomJoueur)
        launchingGame()
    }else{
        alert("Veuillez relancer la partie svp");
    }
}

function checkingFichierJson(nomJoueur) {
    var fichier = "./data.json";
    var requestCheck = new XMLHttpRequest();
    requestCheck.open('GET', fichier);
    requestCheck.responseType = 'json';
    requestCheck.send();

    requestCheck.onload = function() {
        var content = requestCheck.response;
        contentJson.push(content);
        contentJson.forEach(element => {
            if(element.nom === nomJoueur){
                alert(`Welcombe back ${nomJoueur}`)
            }
        });
        console.log(content);
    }
}

function checkingLocalStorage(nom){

    contentLocalStorageName = localStorage.getItem('data') ? JSON.parse(localStorage.getItem('data')) : [];
    contentLocalStorageName.forEach(element => {
        dataToStore.push(element);
    });
    

    if(contentLocalStorageName){
        for (let i = 0; i < contentLocalStorageName.length; i++) {
            const element = contentLocalStorageName[i];
            var ecritureJoueur = false;
            if (element.nom === nom){
                //victoireAlaSuiteJoueur = element.score;
                ecritureJoueur = true;
            }
            if (element.nom === "IA"){
                //victoireAlaSuiteIA = element.score;
                //Mettre 2 variable en meilleur score a la suite pour chcun
            }
            if(i === contentLocalStorageName.length - 1 && !ecritureJoueur){
                dataToStore.push({"nom" : `${nom}`, "score" : 0});
            }
        }
    }else{
        dataToStore.push({"nom" : `${nom}`, "score" : 0});
    }
}

function majLocalStorage(score, indiceGagnant) {

    if (indiceGagnant === 'IA'){
        const index = dataToStore.findIndex(el => el.nom === `IA`);
        const dataToCompare = dataToStore[index].score;
        if(dataToCompare < victoireAlaSuiteIA){
            dataToStore = dataToStore.filter(el => el.nom !== `IA`);
            dataToStore.push({"nom" : `IA`, "score" : score});
        }
    }

    if(indiceGagnant === 'Joueur'){
        const index = dataToStore.findIndex(el => el.nom === `${nomJoueur}`);
        const dataToCompare = dataToStore[index].score;
        if(dataToCompare < victoireAlaSuiteJoueur){
            dataToStore = dataToStore.filter(el => el.nom !== `${nomJoueur}`);
            dataToStore.push({"nom" : `${nomJoueur}`, "score" : score});
        }

    }
    localStorage.setItem('data', JSON.stringify(dataToStore));
}
