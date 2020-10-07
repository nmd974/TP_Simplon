//Mise à jour de la ligne de la tâche en barrant le contenu////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$("#taskList").on("click", "input", async function() {

    // //Mise à jour de la BDD
      
    //   let response = await fetch(`https://progest-nmd974.herokuapp.com/api/taskmanager/${this.id}`, {
    //     method: 'PATCH',
    //     });

    //Mise à jour de l'array déjà chargé
    const index = data_doc.findIndex(elt => elt._id === this.id);

    if(data_doc[index].end === true){
        data_doc[index].end = false;
    }else{
        data_doc[index].end = true;
    }
    
    localStorage.removeItem('data'); //On supprime l'ancien tableau pour ajouter le nouveau avec les modifications
    localStorage.setItem('data', JSON.stringify(data_doc));

    //Suppression des anciennes tâches
    for (let i = 0; i < data_doc.length; i++) {
        const element = data_doc[i]._id;
        $(`#${element}container`).remove();
    }

    compteur = (page_actuelle * nb_by_page) - nb_by_page;

    //Modification des nouvelles tâches

    for (let i2 = compteur; i2 < data_doc.length; i2++) {

        if (compteur < (page_actuelle * nb_by_page)) {
            $('#taskList').append(`
            <div class="row text-center border mt-3" id="${data_doc[i2]._id}container" >
                <div class="col-lg-1 col-md-12 ${!data_doc[i2].urgent ? "bg-success" : "bg-danger"} ${!data_doc[i2].urgent ? "text-success" : "text-danger"} 
                    border"
                > 1</div>
                <div class="col-lg-10 col-md-12 text-left border" 
                    id="${data_doc[i2]._id}div" 
                    style="text-decoration: ${!data_doc[i2].end ? "none" : "line-through"};"
                >
                    ${data_doc[i2].task}
                </div>
                <div class="custom-control custom-checkbox col-lg-1 col-md-12 border">
                    <input type="checkbox" class="custom-control-input" id="${data_doc[i2]._id}" ${!data_doc[i2].end ? "": "checked"}>
                    <label class="custom-control-label" for="${data_doc[i2]._id}">${!data_doc[i2].end ? "Terminer" : "Terminée"}
                    </label>
                    <i class="fa fa-trash-o ml-2" aria-hidden="true" id="trash${data_doc[i2]._id}"></i>
                </div>
            </div>
            `); 
            compteur++;
        }
    }
    compteur = 0;
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
