var subject_choice = "";
const pattern_mail = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
// const icone_warning = 'U+026A0';
var value_existing_customer = "";
const pattern_number = new RegExp("[0-9]{10}");
// const pattern_general = new RegExp(/^[<>]/g);

$(document).ready(() => {
    $('#register').on('click', () => {
        var valid_forms = true;
        //Verification de chaque widgets du formulaire
        //Name :
        if($('#firstname').val() === ""){
            $('#firstname').css('border', '2px solid red');
            $('#firstname').css('color', 'red');
            $('#firstname').val("Indiquez votre prenom");
            valid_forms = false;
        }
        if($('#lastname').val() === ""){
            $('#lastname').css('border', '2px solid red');
            $('#lastname').css('color', 'red');
            $('#lastname').val("Indiquez votre nom");
            valid_forms = false;
        }
        if($('#company_name').val() === ""){
            $('#company_name').css('border', '2px solid red');
            $('#company_name').css('color', 'red');
            $('#company_name').val(`Indiquez le nom de votre entreprise`);
            valid_forms = false;
        }
        if($('#email').val() === ""){
            $('#email').css('border', '2px solid red');
            $('#email').css('color', 'red');
            $('#email').val("Indiquez votre email");
            valid_forms = false;
        }
        if(!pattern_mail.test($('#email').val())){
            $('#errorMail').css('display', 'initial');
            valid_forms = false;
        }
        if($('#areaZone').val() === "" || $('#areaZone').val().length < 3){
            $('#areaZone').css('border', '2px solid red');
            $('#areaZone').css('color', 'red');
            $('#areaZone').val(`Zone`);
            valid_forms = false;
        }
        if($('#phone_number').val() === "" || $('#phone_number').val().length < 10){
            $('#phone_number').css('border', '2px solid red');
            $('#phone_number').css('color', 'red');
            if($('#phone_number').val() === ""){
                $('#phone_number').val(`Indiquez votre numero de telephone`);
            }

            valid_forms = false;
        }
        if(subject_choice === "Choose subject" || subject_choice === ""){
            $('#subject').css('border', '2px solid red');
        }
        if(value_existing_customer === ""){
            $('#radioCustomer').css('border', '2px solid red');
            valid_forms = false;
        }

        if(valid_forms){
            console.log("HERE");
            if(value_existing_customer === "Yes"){
                value_existing_customer = true;
            }
            if(value_existing_customer === "No"){
                value_existing_customer = false;
            }
            var content = {
                id: 1,
                firstname: $('#firstname').val(),
                lastname: $('#lastname').val(),
                company: $('#company_name').val(),
                email: $('#email').val(),
                phone : {
                    area: $('#areaZone').val(),
                    number: $('#phone_number').val()
                },
                subject: $('#subject').val(),
                already_client: value_existing_customer
            }
            console.log("contenu :", content);
        }

    })
})

//Gestion de la selection du sujet
$('#subject_choice').on('click', 'select', () => {

    if($('#subject').val() !== "Choose subject"){
        subject_choice = $('#subject').val()
        $('#subject').focus(false);
        $('#subject').css('border', '2px solid green');
        $('#subject').css('background-color', 'white');
    }
    if($('#subject').val() === "Choose subject" && subject_choice !== ""){
        subject_choice = $('#subject').val()
        $('#subject').css('border', '2px solid red');
    }

})
//Suivi de l'email
$('#email').on('click', () => {
    if($('#email').val() === "Indiquez votre email"){
        $('#email').val("");
        $('#errorMail').css('display', 'none');
    }
    $('#email').css('border', 'none');
    $('#email').css('color', 'black');
    
})
$('#email').on('change', () => {
    if(pattern_mail.test($('#email').val())){
        $('#errorMail').css('display', 'none');
        $('#email').css('border', '2px solid green');//Mettre le cadre vert si validation
    }else{
        $('#errorMail').css('display', 'initial');
        $('#email').css('border', '2px solid red')
    }
    
})


//Suivi du Name
//Enlever le contenu du message d'erreur lors du clic
$('#firstname').on('click', () => {
    if($('#firstname').val() === "Indiquez votre prenom"){
        $('#firstname').val("");
        $('#firstname').css('color', 'black');
    }

})
//Mettre le cadre en vert si le contenu est rempli
$('#firstname').on('change', () => {
    if($('#firstname').val().length > 1){
        $('#firstname').css('border', '2px solid green');
    }else{
        $('#firstname').css('border', '2px solid red');
    }

})
//Enlever le contenu du message d'erreur lors du clic
$('#lastname').on('click', () => {
    if($('#lastname').val() === "Indiquez votre nom"){
        $('#lastname').val("");
        $('#lastname').css('color', 'black');
    }

})
//Mettre le cadre en vert si le contenu est rempli
$('#lastname').on('change', () => {
    if($('#lastname').val().length > 1){
        $('#lastname').css('border', '2px solid green');
    }else{
        $('#lastname').css('border', '2px solid red');
    }

})
//Suivi de la company
//Enlever le contenu du message d'erreur lors du clic
$('#company_name').on('click', () => {
    if($('#company_name').val() === "Indiquez le nom de votre entreprise"){
        $('#company_name').val("");
        $('#company_name').css('color', 'black');
    }

})
//Mettre le cadre en vert si le contenu est rempli
$('#company_name').on('change', () => {
    if($('#company_name').val().length > 1){
        $('#company_name').css('border', '2px solid green');
    }else{
        $('#company_name').css('border', '2px solid red');
    }

})

//Suivi du Name
//Enlever le contenu du message d'erreur lors du clic
$('#areaZone').on('click', () => {
    if($('#areaZone').val() === "Zone"){
        $('#areaZone').val("");
        $('#areaZone').css('color', 'black');
    }

})
//Mettre le cadre en vert si le contenu est rempli
$('#areaZone').on('change', () => {
    if($('#areaZone').val().length >= 3){
        $('#areaZone').css('border', '2px solid green');
    }else{
        $('#areaZone').css('border', '2px solid red');
    }

})
//Enlever le contenu du message d'erreur lors du clic
$('#phone_number').on('click', () => {
    if($('#phone_number').val() === "Indiquez votre numero de telephone"){
        $('#phone_number').val("");
        $('#phone_number').css('color', 'black');
    }

})
//Mettre le cadre en vert si le contenu est rempli
$('#phone_number').on('change', () => {
    if($('#phone_number').val().length = 10){
        $('#phone_number').css('border', '2px solid green');
        $('#phone_number').css('border', '2px solid green');
        $('#phone_number').css('color', 'black');
    }else{
        $('#phone_number').css('border', '2px solid red');
        $('#phone_number').css('color', 'red');
        $('#phone_number').css('color', 'black');
    }

})

$("input:radio[name=existing_customer]").on('click', () => {
    value_existing_customer = $("input:radio[name=existing_customer]").val();
});
$("input:radio[name=existing_customer]").on('change', () => {
    value_existing_customer = $("input:radio[name=existing_customer]").val();
    if(value_existing_customer !== ""){
        $('#radioCustomer').css('border', '2px solid green');
    }
});
