var data_doc;
var compteur = 0; //Va permettre de gérer la pagination
var nb_page = 0;
var page_totale = 0;
var ecriture = false;
var page_actuelle = 1;
var compteur_doc = 0;
var nb_by_page = 6;

//LANCEMENT ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$(document).ready(function chargement() {
    $.get("data.json", function(data, status){
        if(status === "success"){
            data_doc = data;
            data_doc.reverse();
            data_doc.forEach(tache => {

                if(compteur === 0 && nb_page === 0){
                    nb_page++;
                    $('#pagination').append(`
                        <li class="page-item" id="previous"><a class="page-link" href="#">Previous</a></li>
                        <li class="page-item" id="${nb_page}"><a class="page-link" href="#">${nb_page}</a></li> 
                    `)
                }
                if (compteur < (page_actuelle * nb_by_page) && nb_page == 1) {
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
                compteur++;
                compteur_doc++;

                if(compteur === nb_by_page && nb_page >= 1){
                    nb_page++;
                    $('#pagination').append(`
                        <li class="page-item" id="${nb_page}"><a class="page-link" href="#">${nb_page}</a></li> 
                    `)
                    compteur =0 ;
                }

                if(compteur_doc === data_doc.length){
                    $('#pagination').append(`
                        <li class="page-item" id="next"><a class="page-link" href="#">Next</a></li>
                    `)
                    page_totale = nb_page;
                    nb_page = 0;
                    compteur = 0;
                    compteur_doc = 0;
                    ecriture = false;
                }
            });
        }else{
            console.log(status);
            $('#taskList').append('<div class=col-12 text-center bg-danger>Impossible de charger les données</div>');
        }
        
      });
})
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Mise à jour de la ligne de la tâche en barrant le contenu////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$("#taskList").on("click", "input", function() {
    //Mise à jour de l'array déjà chargé
    const index = data_doc.findIndex(elt => elt.id === this.id);
    data_doc[index].end = true;

    //Suppression des anciennes tâches
    for (let i = 0; i < data_doc.length; i++) {
        const element = data_doc[i].id;
        $(`#${element}container`).remove();
    }

    compteur = (page_actuelle * nb_by_page) - nb_by_page;

    //Modification des nouvelles tâches

    for (let i2 = compteur; i2 < data_doc.length; i2++) {

        if (compteur < (page_actuelle * nb_by_page)) {
            $('#taskList').append(`
            <div class="row text-center border mt-3" id="${data_doc[i2].id}container" >
                <div class="col-lg-1 col-md-12 ${!data_doc[i2].urgent ? "bg-success" : "bg-danger"} ${!data_doc[i2].urgent ? "text-success" : "text-danger"} 
                    border"
                > 1</div>
                <div class="col-lg-10 col-md-12 text-left border" 
                    id="${data_doc[i2].id}div" 
                    style="text-decoration: ${!data_doc[i2].end ? "none" : "line-through"};"
                >
                    ${data_doc[i2].task}
                </div>
                <div class="custom-control custom-checkbox col-lg-1 col-md-12 border">
                    <input type="checkbox" class="custom-control-input" id="${data_doc[i2].id}" ${!data_doc[i2].end ? "": "checked disabled"}>
                    <label class="custom-control-label" for="${data_doc[i2].id}">${!data_doc[i2].end ? "Terminer" : "Terminée"}
                    </label>
                </div>
            </div>
            `); 
            compteur++;
        }
    }
    compteur = 0;
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//AJOUT D'une tache/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
     //Suppression des anciennes tâches
     for (let i = 0; i < data_doc.length; i++) {
        const element = data_doc[i].id;
        $(`#${element}container`).remove();
    }

    //Suppression de l'ancienne pagination
    $(`#previous`).remove();
    $(`#next`).remove();
    for (let i = 0; i < page_totale + 1; i++) {
        $(`#${i}`).remove();
    }


    if(newTask_priorite === "1"){
        newTask_priorite = true;
    }else{
        newTask_priorite = false;
    }
    //On reinverse le tableau pour l'ajout
    data_doc.reverse();
    data_doc.push({id: data_doc.length + 1, task: newTask_content, urgent: newTask_priorite, end: false});
    //Puis on remet dans l'ordre inverse apres l'ajout
    data_doc.reverse();
    data_doc.forEach(tache => {

        if(compteur === 0 && nb_page === 0){
            nb_page++;
            $('#pagination').append(`
                <li class="page-item" id="previous"><a class="page-link" href="#">Previous</a></li>
                <li class="page-item" id="${nb_page}"><a class="page-link" href="#">${nb_page}</a></li> 
            `)
        }
        if (compteur < (page_actuelle * nb_by_page) && nb_page == 1) {
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
        compteur++;
        compteur_doc++;

        if(compteur === nb_by_page && nb_page >= 1){
            nb_page++;
            $('#pagination').append(`
                <li class="page-item" id="${nb_page}"><a class="page-link" href="#">${nb_page}</a></li> 
            `)
            compteur =0 ;
        }

        if(compteur_doc === data_doc.length){
            $('#pagination').append(`
                <li class="page-item" id="next"><a class="page-link" href="#">Next</a></li>
            `)
            page_totale = nb_page;
            nb_page = 0;
            compteur = 0;
            compteur_doc = 0;
            ecriture = false;
        }
    });

    newTask_priorite = 0;
    newTask_content = "";
    $('#buttonNewTask').prop("disabled", true);


    page_actuelle = 1;
    compteur = (page_actuelle * nb_by_page)-nb_by_page;
})

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//Gestion des pages////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$("#pagination").on("click", "li", function() {
    console.log(this.id);

    //Suppression des anciennes tâches
    for (let i = 0; i < data_doc.length; i++) {
        const element = data_doc[i].id;
        $(`#${element}container`).remove();
    }

    //Calcule page actuelle
    if(Number(this.id) > page_actuelle){
        page_actuelle=Number(this.id);
        compteur = (Number(this.id) * nb_by_page)-nb_by_page;
    }
    if(Number(this.id) < page_actuelle){
        page_actuelle=Number(this.id);
        compteur = (Number(this.id) * nb_by_page)-nb_by_page;
    }
    if(Number(this.id) === page_actuelle){
        page_actuelle=Number(this.id);
        compteur = (Number(this.id) * nb_by_page)-nb_by_page;
    }
    if(this.id === "previous"){
        if(page_actuelle !== 1){
            page_actuelle--;
            compteur = (page_actuelle * nb_by_page)-nb_by_page;
        }else{
            compteur = (1 * nb_by_page)-nb_by_page;
        }
    }
    if(this.id === "next"){
        if(page_actuelle !== page_totale){
            page_actuelle++;
            compteur = (page_actuelle * nb_by_page)-nb_by_page;
        }else{
            compteur = (page_totale * nb_by_page)-nb_by_page;
        }
    }
        
    //Ajout des nouvelles tâches

    for (let i2 = compteur; i2 < data_doc.length; i2++) {

        if (compteur < (page_actuelle * nb_by_page)) {
            $('#taskList').append(`
            <div class="row text-center border mt-3" id="${data_doc[i2].id}container" >
                <div class="col-lg-1 col-md-12 ${!data_doc[i2].urgent ? "bg-success" : "bg-danger"} ${!data_doc[i2].urgent ? "text-success" : "text-danger"} 
                    border"
                > 1</div>
                <div class="col-lg-10 col-md-12 text-left border" 
                    id="${data_doc[i2].id}div" 
                    style="text-decoration: ${!data_doc[i2].end ? "none" : "line-through"};"
                >
                    ${data_doc[i2].task}
                </div>
                <div class="custom-control custom-checkbox col-lg-1 col-md-12 border">
                    <input type="checkbox" class="custom-control-input" id="${data_doc[i2].id}" ${!data_doc[i2].end ? "": "checked disabled"}>
                    <label class="custom-control-label" for="${data_doc[i2].id}">${!data_doc[i2].end ? "Terminer" : "Terminée"}
                    </label>
                </div>
            </div>
            `); 
            compteur++;
        }
    }
    comtpeur = 0;
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////