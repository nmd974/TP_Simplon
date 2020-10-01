//Variables
var ordinateurChoice = 0;
var joueurChoice = 0;
var compteur = "VS";
var listeWord=["GO!!!", "Ciseaux", "Feuille", "Pierre"];
var gameLaunch = false;
var counter = 4;
var intervalId = null;
var alreadyPlay = false;
var scoreOrdinateur =0;
var scoreJoueur = 0;
var counterManche = 1;
var victoireAlaSuiteJoueur = 0;
var victoireAlaSuiteIA = 0;

//Lancement du jeu
function launchingGame() {  
    document.getElementById("mancheShow").textContent = `Manche ${counterManche}`;  
    document.getElementById('victoireSuiteJoueur').textContent = `Parties gagnées à la suite : ${victoireAlaSuiteJoueur}`;
    document.getElementById('victoireSuiteIA').textContent = `Parties gagnées à la suite : ${victoireAlaSuiteIA}`;
    //document.getElementById("choixOrdinateur").style.animationPlayState="paused";
    //document.getElementById("choixJoueur").style.animationPlayState="paused";
    intervalId = setInterval(decompte, 1000); //Decdompte pierre, feuille, ciseaux
}

//Decompte pierre feuille ciseaux
function decompte() {
    counter--;
    if(counter == 0) fin();
    else {	
        document.getElementById("compteur").textContent = listeWord[counter];
    }	
}

function fin() {
    clearInterval(intervalId);
    gameLaunch = true;
    document.getElementById("compteur").textContent = listeWord[counter];	
}
//////////////////////////////////////////////////////////////////////////////

//Choix du joueur////////////////////////////////////////////////////////////
function choixJoueur(nbChoice) {
    if(gameLaunch && !alreadyPlay){
        var el = document.getElementById("choixJoueur");
        var el2 = document.getElementById("choixOrdinateur");
        joueurChoice = nbChoice;
        ordinateurChoice = Math.round(Math.random() * (3 - 1) + 1);
        //ordinateurChoice = 3;
    
        
        if(ordinateurChoice === 1){
            el2.src="images/pierre.png"
        }
        if(ordinateurChoice === 2){
            el2.src="images/feuille.png"
        }
        if(ordinateurChoice === 3){
            el2.src="images/ciseaux.png"
        }

        if(nbChoice === 1){
            el.src="images/pierre.png"
            alreadyPlay = true;
            verificationGagnant();
        }
        if(nbChoice === 2){
            el.src="images/feuille.png"
            alreadyPlay = true;
            verificationGagnant();
        }
        if(nbChoice === 3){
            el.src="images/ciseaux.png"
            alreadyPlay = true;
            verificationGagnant();
        }




    }

}
//////////////////////////////////////////////////////////////////////////////////


function verificationGagnant() {
    if(joueurChoice === 1 && ordinateurChoice === 3 || 
        joueurChoice === 2 && ordinateurChoice === 1 ||
        joueurChoice === 3 && ordinateurChoice === 2 
    )
    {
        document.getElementById("block__joueur").style.border = "10px solid green";
        //document.getElementById("choixJoueur").style.animationPlayState= "running";
        document.getElementById("block__IA").style.border = "10px solid red";
        //alert(`${nomJoueur} a gagné cette manche`);
        document.getElementById("compteur").textContent = `Gagnant : ${nomJoueur}`;
        scoreJoueur++;
        majIndicateurs()

    }else if(joueurChoice === ordinateurChoice){
        document.getElementById("block__joueur").style.border = "10px solid orange";
        document.getElementById("block__IA").style.border = "10px solid orange";
        //document.getElementById("choixJoueur").style.animationPlayState="running";
        //document.getElementById("choixOrdinateur").style.animationPlayState="running";
        document.getElementById("compteur").textContent = `Egalite`;
        //alert(`Egalite`);
        majIndicateurs()
    }else{
        document.getElementById("block__joueur").style.border = "10px solid red";
        document.getElementById("block__IA").style.border = "10px solid green";
        //document.getElementById("choixOrdinateur").style.animationPlayState = "running";
        document.getElementById("compteur").textContent = `Gagnant : IA`;
        //alert(`L'IA a gagné cette manche`);
        scoreOrdinateur++;
        majIndicateurs()
    }
}

function majIndicateurs() {

            if(scoreOrdinateur === 1){
                document.getElementById("etoileIA1").src = "images/star_plein.png";
            }
            if(scoreJoueur === 1){
                document.getElementById("etoileJoueur1").src = "images/star_plein.png";
            }

            if(scoreOrdinateur === 2){
                document.getElementById("etoileIA2").src = "images/star_plein.png";
            }
            if(scoreJoueur === 2){
                document.getElementById("etoileJoueur2").src = "images/star_plein.png";
            }

            if(scoreOrdinateur === 3){
                document.getElementById("etoileIA3").src = "images/star_plein.png";
            }
            if(scoreJoueur === 3){
                document.getElementById("etoileJoueur3").src = "images/star_plein.png";
            }

            if(scoreJoueur === 3 || scoreOrdinateur === 3){
                alert(`Fin de la partie Gagnant est ${scoreJoueur > scoreOrdinateur ? nomJoueur : "IA"}`);
                {scoreJoueur > scoreOrdinateur ? victoireAlaSuiteJoueur++ : victoireAlaSuiteIA++};

                if(scoreJoueur < scoreOrdinateur){
                    document.getElementById('victoireSuiteIA').textContent = `Parties gagnées à la suite : ${victoireAlaSuiteIA}`;
                    document.getElementById('victoireSuiteJoueur').textContent = `Parties gagnées à la suite : ${victoireAlaSuiteJoueur}`;
                    majLocalStorage(victoireAlaSuiteIA, 'IA');
                }
                if(scoreJoueur > scoreOrdinateur){
                    document.getElementById('victoireSuiteIA').textContent = `Parties gagnées à la suite : ${victoireAlaSuiteIA}`;
                    document.getElementById('victoireSuiteJoueur').textContent = `Parties gagnées à la suite : ${victoireAlaSuiteJoueur}`;
                    majLocalStorage(victoireAlaSuiteJoueur, 'Joueur');
                }


            }else{
                setTimeout(() => {
                    restChoice()
                }, 2000);
            }

}

function restChoice() {
    var el = document.getElementById("choixJoueur");
    var el2 = document.getElementById("choixOrdinateur");
    document.getElementById("block__joueur").style.border = "10px solid grey";
    document.getElementById("block__IA").style.border = "10px solid grey";
    el.src="images/waiting.jpg"
    el2.src="images/waiting.jpg"
    counter = 4;
    alreadyPlay = false;
    gameLaunch = false;
    counterManche++;
    document.getElementById("mancheShow").textContent = `Manche ${counterManche}`;  

    launchingGame();
}

function resetGame() {
    if (nomJoueur !== ""){
        var el = document.getElementById("choixJoueur");
        var el2 = document.getElementById("choixOrdinateur");
        el.src="images/waiting.jpg"
        el2.src="images/waiting.jpg"
        counter = 4;
        alreadyPlay = false;
        counterManche = 0;
        scoreJoueur = 0;
        scoreOrdinateur = 0;
        document.getElementById("etoileJoueur3").src = "images/star_vide.png";
        document.getElementById("etoileIA3").src = "images/star_vide.png";
        document.getElementById("etoileJoueur2").src = "images/star_vide.png";
        document.getElementById("etoileIA2").src = "images/star_vide.png";
        document.getElementById("etoileJoueur1").src = "images/star_vide.png";
        document.getElementById("etoileIA1").src = "images/star_vide.png";
        document.getElementById("block__joueur").style.border = "10px solid grey";
        document.getElementById("block__IA").style.border = "10px solid grey";
        document.getElementById("mancheShow").textContent = `Manche ${counterManche}`;  
        launchingGame();
    }else{
        alert("Impossible");
    }

}