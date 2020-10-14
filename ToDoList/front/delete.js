//Mise à jour de la ligne de la tâche en barrant le contenu////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$("#taskList").on("click", "i", async function() {

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

    $('#taskList').append(`<div class="text-center" id="spinner">
    <div class="spinner-border" style="width: 3rem; height: 3rem;" role="status">
    <span class="sr-only">Loading...</span>
  </div>
  <div class="spinner-grow" style="width: 3rem; height: 3rem;" role="status">
    <span class="sr-only">Loading...</span>
  </div>
                            </div>`)
    //Mise à jour de l'array déjà chargé
    const data_doc_temp = [...data_doc];
    console.log(typeof this.id);
    console.log(data_doc);
    data_doc = data_doc_temp.filter(elt => elt._id != this.id);
    console.log(data_doc);
    localStorage.removeItem('data'); //On supprime l'ancien tableau pour ajouter le nouveau apres la suppression
    localStorage.setItem('data', JSON.stringify(data_doc));



    // compteur = (page_actuelle * nb_by_page) - nb_by_page;

    //Modification des nouvelles tâches
    if(data_doc.length !== 0){
        $('#spinner').remove();
        // $('#tacheazero').remove();
        data_doc.reverse();
        data_doc.forEach(tache => {
            
            if(compteur === 0 && nb_page === 0){
                nb_page++;
                $('#pagination').append(`
                <li class="page-item" id="previous"><a class="page-link" href="#">Previous</a></li>
                <li class="page-item active" id="${nb_page}"><a class="page-link" href="#">${nb_page}</a></li> 
                `)
            }
            if (compteur < (page_actuelle * nb_by_page) && nb_page == 1) {
               $('#taskList').append(` 
                <div class="row text-center border mt-3" id="${tache._id}container" >
                <div class="col-lg-1 col-md-12 ${!tache.urgent ? "bg-success" : "bg-danger"} ${!tache.urgent ? "text-success" : "text-danger"} 
                border"
                > 1</div>
                <div class="col-lg-9 col-md-12 text-left border" 
                id="${tache._id}div" 
                style="text-decoration: ${!tache.end ? "none" : "line-through"};"
                >
                ${tache.task}
                </div>
                <div class="custom-control custom-checkbox col-lg-2 col-md-12 d-flex justify-content-center align-items-center border">
                <input type="checkbox" class="custom-control-input" id="${tache._id}" ${!tache.end ? "": "checked"}>
                <label class="custom-control-label" for="${tache._id}">${!tache.end ? "Terminer" : "Terminée"}
                
                </label>
                <i class="fa fa-trash-o ml-2" aria-hidden="true" id="${tache._id}"></i>
                </div>
                </div>
                `); 
            }
            compteur++;
            compteur_doc++;
            
            
            if(compteur_doc === data_doc.length){
                $('#pagination').append(`
                <li class="page-item" id="next"><a class="page-link" href="#">Next</a></li>
                `)
                page_totale = nb_page;
                nb_page = 0;
                compteur = 0;
                compteur_doc = 0;
                fin = true;
            }

            if(compteur === nb_by_page && nb_page >= 1 && !fin){
                nb_page++;
                $('#pagination').append(`
                <li class="page-item" id="${nb_page}"><a class="page-link" href="#">${nb_page}</a></li> 
                `)
                compteur =0 ;
            }

        });
    }else{
        $('#spinner').remove();
        $('#taskList').append(`
        <div class="row col-12 d-flex justify-content-center align-items-center text-center mt-3" id="tacheazero">
            <p>Aucune tâche disponible</p>
        </div>
        `); 
    }
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
