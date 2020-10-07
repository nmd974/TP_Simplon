var array1 = [4,8,7,9,1,5,4,6];
var array2 = [7,6,5,2,1,3,7,4];
var arrayRendu = [];  
var listItem = document.createElement('tr');

$(document).ready(function loading(params) {
    for (let i = 0; i < array1.length; i++) {
        const element1 = array1[i];
        const element2 = array2[i];
        arrayRendu.push(element1 + element2);  
    }

    arrayRendu.forEach(element => {
        var divToAdd = document.createElement('th');
        divToAdd.innerHTML = element;
        console.log(divToAdd);
        listItem.appendChild(divToAdd);
        
    });

    $('#container').append(listItem);
})

