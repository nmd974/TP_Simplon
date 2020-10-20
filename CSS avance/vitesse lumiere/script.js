var compteur =1;


window.onload = () => {
    for (let i = 0; i < 20; i++) {
        var divCreate = document.createElement('p');
        divCreate.setAttribute("class", "content1");
        divCreate.setAttribute("id", `${i}`);
        document.getElementById('container').appendChild(divCreate);
    }
    test()
}

test = () => {
    for (let i2 = 0; i2 < 20; i2++) {
        const elt = document.getElementById(`${i2}`);
        console.log(elt);
        elt.style.animationPlayState = "running";
        //  wait(2000);
    }
}
function wait(ms)
{
    var d = new Date();
    var d2 = null;
    do { d2 = new Date(); }
    while(d2-d < ms);
}



