var compteur =1;
for (let i = 0; i < 2000; i++) {

var random = Math.round(Math.random() * (1 - 0)) + 0;
    
    if(random === 1){
        var divCreate2 = document.createElement('div');
        divCreate2.setAttribute("class", "content2");
        document.getElementById('container').appendChild(divCreate2);
        compteur = 1;
        console.log("HERE?")
    }else{
        var divCreate = document.createElement('div');
        divCreate.setAttribute("class", "content1");
        document.getElementById('container').appendChild(divCreate);
        compteur++;
    }
    // if(compteur === 1){
    //     var divCreate = document.createElement('div');
    //     divCreate.setAttribute("class", "content1");
    //     document.getElementById('container').appendChild(divCreate);
    //     compteur++;
    // }
    
}