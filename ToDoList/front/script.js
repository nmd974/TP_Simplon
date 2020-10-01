var data_doc;

$(document).ready(function chargement() {
    $.get("data.json", function(data, status){
        if(status === "success"){
            console.log(data);
            data_doc = data;
            console.log(data_doc);
            data.forEach(tache => {
                
                $('#taskList').append(`
                <div class="row text-center border mt-3" id="${tache.id}">
                    <div class="col-lg-1 col-md-12 ${!tache.urgent ? "bg-success" : "bg-danger"} ${!tache.urgent ? "text-success" : "text-danger"} border">1
                    </div>
                    <div class="col-lg-10 col-md-12 text-left border" "${tache.id}" style="text-decoration: ${!tache.end ? "none" : "line-through"};">
                        ${tache.task}
                    </div>
                    <div class="custom-control custom-checkbox col-lg-1 col-md-12 border" onclick="majTask(this.id)">
                        <input type="checkbox" class="custom-control-input" id="${tache.id}"  ${!tache.end ? null : "checked"}>
                        <label class="custom-control-label" for="customCheck1" >${!tache.end ? "Terminer" : "Terminée"}
                        </label>
                    </div>
                </div>
                `);
            });
            console.log(document.getElementById('1'));
        }else{
            console.log(status);
            $('#taskList').append('<div class=col-12 text-center>Impossible de charger les données</div>');
        }
        
      });
})

function majTask(id) {
    console.log(id);
    $(`#${id}`).style("text-decoration : line-through;");
}


