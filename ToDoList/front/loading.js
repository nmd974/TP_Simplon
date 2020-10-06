//LANCEMENT ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$(document).ready( async function chargement() {

    let response = await fetch("https://progest-nmd974.herokuapp.com/api/taskmanager", {
    method: 'GET',
    });

    let result = await response.json();
    data_doc = result.data;

    if(data_doc){
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
    }else{
        $('#taskList').append(`
        <div class="row text-center border mt-3">
            <p>Aucune tâche disponible</p>
        </div>
        `); 
    }
    
})
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////