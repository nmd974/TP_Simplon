$(document).ready(() => {
    $('#register').on('click', () => {
        //Verification de chaque widgets du formulaire
        //Name :
        if($('#firstname').val() === ""){
            $('#firstname').css('border', '1px solid red');
            $('#firstname').css('color', 'red');
            $('#firstname').val("Indiquez votre nom");
        }
        if($('#lastname').val() === ""){
            $('#lastname').css('border', '1px solid red');
            $('#lastname').css('color', 'red');
            $('#lastname').val("Indiquez votre prénom");
        }
        if($('#company_name').val() === ""){
            $('#company_name').css('border', '1px solid red');
            $('#company_name').css('color', 'red');
            $('#company_name').val("Indiquez le nom de votre entreprise");
        }
        if($('#email').val() === ""){
            $('#email').css('border', '1px solid red');
            $('#email').css('color', 'red');
            $('#email').val("Indiquez votre email");
        }
        if($('#areaZone').val() === ""){
            $('#areaZone').css('border', '1px solid red');
            
        }
        if($('#phone_number').val() === ""){
            $('#phone_number').css('border', '1px solid red');
        }
        if($('#subject').val() === "Choose subject" || $('#subject').val() === ""){
            $('#subject').css('border', '1px solid red');
        }
        if($('#radioCustomer').val() === ""){
            $('#radioCustomer').css('border', '1px solid red');
        }
        console.log(typeof $('#subject').val())
    })
})