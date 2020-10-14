//Gestion des pages////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$("#pagination").on("click", "li", function() {

    //Suppression des anciennes tâches
    for (let i = 0; i < data_doc.length; i++) {
        const element = data_doc[i]._id;
        $(`#${element}container`).remove();
    }

    //Calcule page actuelle
    if(Number(this.id) > page_actuelle){
        $(`#${this.id}`).addClass('active');
        $(`#${this.id - (this.id-page_actuelle)}`).removeClass('page-item active');
        $(`#${this.id - (this.id-page_actuelle)}`).addClass('page-item');
        page_actuelle=Number(this.id);
        compteur = (Number(this.id) * nb_by_page)-nb_by_page;
    }
    if(Number(this.id) < page_actuelle){
        $(`#${this.id}`).addClass('active');
        var indice = page_actuelle - Number(this.id);
        $(`#${Number(this.id) + indice}`).removeClass('page-item active');
        $(`#${Number(this.id) + indice}`).addClass('page-item');
        page_actuelle=Number(this.id);
        compteur = (Number(this.id) * nb_by_page)-nb_by_page;
    }
    if(Number(this.id) === page_actuelle){
        page_actuelle=Number(this.id);
        compteur = (Number(this.id) * nb_by_page)-nb_by_page;
    }
    if(this.id === "previous"){
        if(page_actuelle !== 1){
            $(`#${page_actuelle - 1}`).addClass('active');
            $(`#${page_actuelle}`).removeClass('page-item active');
            $(`#${page_actuelle}`).addClass('page-item');
            page_actuelle--;
            compteur = (page_actuelle * nb_by_page)-nb_by_page;
        }else{
            compteur = (1 * nb_by_page)-nb_by_page;
        }
    }
    if(this.id === "next"){
        if(page_actuelle !== page_totale){
            $(`#${page_actuelle + 1}`).addClass('active');
            $(`#${page_actuelle}`).removeClass('page-item active');
            $(`#${page_actuelle}`).addClass('page-item');
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
            <div class="row text-center border mt-3" id="${data_doc[i2]._id}container" >
                <div class="col-lg-1 col-md-12 ${!data_doc[i2].urgent ? "bg-success" : "bg-danger"} ${!data_doc[i2].urgent ? "text-success" : "text-danger"} 
                    border"
                > 1</div>
                <div class="col-lg-9 col-md-12 text-left border" 
                    id="${data_doc[i2]._id}div" 
                    style="text-decoration: ${!data_doc[i2].end ? "none" : "line-through"};"
                >
                    ${data_doc[i2].task}
                </div>
                <div class="custom-control custom-checkbox col-lg-2 col-md-12 border">
                    <input type="checkbox" class="custom-control-input" id="${data_doc[i2]._id}" ${!data_doc[i2].end ? "": "checked disabled"}>
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