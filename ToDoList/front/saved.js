var data_doc;
let data_pagine = [];
let data_to_pagine = [];
var compteur = 0; //Va permettre de gérer la pagination
var nb_page = 0;

let object_page = [
    {page : []},
    {page : []},
    {page : []},
    {page : []},
    {page : []},
    {page : []},
    {page : []},
]
var i2 = 0;
var ecriture = false;

$(document).ready(function chargement() {
    $.get("data.json", function(data, status){
        if(status === "success"){
            data_doc = data;
            data.forEach(tache => {
                data_to_pagine.push(tache);
                if (compteur !== 5 && !ecriture) {
                    $('#taskList').append(`
                    <div class="row text-center border mt-3" id="${tache.id}container" >
                        <div class="col-lg-1 col-md-12 ${!tache.urgent ? "bg-success" : "bg-danger"} ${!tache.urgent ? "text-success" : "text-danger"} 
                            border"
                        > 1</div>
                        <div class="col-lg-10 col-md-12 text-left border" 
                            id="${tache.id}div" 
                            style="text-decoration: ${!tache.end ? "none" : "line-through"};"
                        >
                            ${tache.task}
                        </div>
                        <div class="custom-control custom-checkbox col-lg-1 col-md-12 border">
                            <input type="checkbox" class="custom-control-input" id="${tache.id}" ${!tache.end ? "": "checked disabled"}>
                            <label class="custom-control-label" for="${tache.id}">${!tache.end ? "Terminer" : "Terminée"}
                            </label>
                        </div>
                    </div>
                    `); 
                }
                compteur++
                if(compteur === 5){
                    object_page[i2].page.push(data_to_pagine);
                    i2++
                    ecriture = true;
                    // console.log(data_pagine);
                    console.log(object_page);
                    data_to_pagine = [];
                    compteur = 0;
                }
            });
        }else{
            console.log(status);
            $('#taskList').append('<div class=col-12 text-center bg-danger>Impossible de charger les données</div>');
        }
        
      });
})

//Mise à jour de la ligne de la tâche en barrant le contenu
$("#taskList").on("click", "input", function() {
    //Mise à jour de l'array déjà chargé
    const index = data_doc.findIndex(elt => elt.id === this.id);
    data_doc[index].end = true;

    //Suppression des anciennes tâches
    for (let i = 0; i < data_doc.length; i++) {
        const element = data_doc[i].id;
        $(`#${element}container`).remove();
    }
    $('#pagination').remove('li');

    //Ajout des nouvelles tâches

    data_doc.forEach(tache => {
        compteur++;
        if(compteur === 0){
            nb_page++;
            $('#pagination').append(`
                <li class="page-item"><a class="page-link" href="#">Previous</a></li>
                <li class="page-item"><a class="page-link" href="#">1</a></li> 
            `)
        }
        if(compteur === 10){
            nb_page++;
            // compteur = 0;
            $('#paginationUl').append(`
                <li class="page-item"><a class="page-link" href="#">${nb_page}</a></li> 
            `)
        }
        $('#taskList').append(`
            <div>
                <div class="row text-center border mt-3" id="${tache.id}container" >
                    <div class="col-lg-1 col-md-12 ${!tache.urgent ? "bg-success" : "bg-danger"} ${!tache.urgent ? "text-success" : "text-danger"} border"> 
                        1
                    </div>
                    <div class="col-lg-10 col-md-12 text-left border" id="${tache.id}div" style="text-decoration: ${!tache.end ? "none" : "line-through"};">
                        ${tache.task}
                    </div>
                    <div class="custom-control custom-checkbox col-lg-1 col-md-12 border">
                        <input type="checkbox" class="custom-control-input" id="${tache.id}" ${!tache.end ? "": "checked disabled"}>
                        <label class="custom-control-label" for="${tache.id}">${!tache.end ? "Terminer" : "Terminée"}
                        </label>
                    </div>
                </div>
            </div>
        `);
    });
    nb_page = 0;
    compteur = 0;
})

var newTask_content = ""; //Contenu de la tâche
var newTask_priorite = "0"; //Priorite de la tâche

//Ajout du contenu de la tâche à effectuer
$('#newTask').on('change', 'input', function() {
    newTask_content = this.value;
    if(newTask_priorite === "0" || newTask_content === ""){
        $('#buttonNewTask').prop("disabled", true);
    }else{
        $('#buttonNewTask').prop("disabled", false);
    }
})

//Ajout de la priorite + maj boutton si priorite et contenu indique
$('#newTask').on('click', 'select', function() {
    newTask_priorite = this.value;
    if(this.value === "0" || newTask_content === ""){
        $('#buttonNewTask').prop("disabled", true);
    }else{
        $('#buttonNewTask').prop("disabled", false);
    }
})

//Ajout au debut de la liste la nouvelle tache
$('#newTask').on('click', 'button', function() {
    $('#newTaskText').val("");
    $('#newTaskselection').val("0");
    $('#taskList').prepend(`
    <div class="row text-center border mt-3" id="${data_doc.length}div">
        <div class="col-lg-1 col-md-12 ${newTask_priorite !== 1 ? "bg-success" : "bg-danger"} ${newTask_priorite !== 1 ? "text-success" : "text-danger"} border"> 
        1
        </div>
        <div class="col-lg-10 col-md-12 text-left border" style="text-decoration:"none";">
            ${newTask_content}
        </div>
        <div class="custom-control custom-checkbox col-lg-1 col-md-12 border">
            <input type="checkbox" class="custom-control-input" id="${data_doc.length}">
            <label class="custom-control-label" for="${data_doc.length}">Terminer
            </label>
        </div>
    </div>
    `);
    newTask_priorite = 0;
    newTask_content = "";
    $('#buttonNewTask').prop("disabled", true);
})


