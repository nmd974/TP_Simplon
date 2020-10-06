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
$('#newTask').on('click', 'button', async function() {

    
    $('#newTaskText').val("");
    $('#newTaskselection').val("0");
     //Suppression des anciennes tâches
     for (let i = 0; i < data_doc.length; i++) {
        const element = data_doc[i]._id;
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

    //Mise à jour de la BDD
    let task = {
        task: newTask_content,
        urgent: newTask_priorite,
        end: false
      };
      
      let response = await fetch("https://progest-nmd974.herokuapp.com/api/taskmanager", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(task)
      });

      let result = await response.json();
      data_doc.reverse();
      data_doc.push(result.data);


    //On reinverse le tableau pour l'ajout
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
            <div class="row text-center border mt-3" id="${tache._id}container" >
                <div class="col-lg-1 col-md-12 ${!tache.urgent ? "bg-success" : "bg-danger"} ${!tache.urgent ? "text-success" : "text-danger"} 
                    border"
                > 1</div>
                <div class="col-lg-10 col-md-12 text-left border" 
                    id="${tache._id}div" 
                    style="text-decoration: ${!tache.end ? "none" : "line-through"};"
                >
                    ${tache.task}
                </div>
                <div class="custom-control custom-checkbox col-lg-1 col-md-12 border">
                    <input type="checkbox" class="custom-control-input" id="${tache._id}" ${!tache.end ? "": "checked disabled"}>
                    <label class="custom-control-label" for="${tache._id}">${!tache.end ? "Terminer" : "Terminée"}
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
