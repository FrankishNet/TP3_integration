// VALIDATION FORMULAIRE //

let validation = false;
let score = 0;

/* $.getJSON("quizz.json", 
    function (data) {

}); */

/* $(function() {

    let $accordion = $("#accordion");
  
    $accordion.hide();
  
  
  
    $("input[type=button]").on('click', function() {
  
      $accordion.show();
  
      alert('click');
  
    });
  
  
  
  }); */

$("#accordion").accordion();
$("#formulaire").validate(
    {
        onfocusout: false,
        rules:{
            prenom:{
                required:true,
                maxlength: 100,
                alphanumeric:true
            },
            nom:{
                required:true,
                maxlength: 100,
                alphanumeric:true
            },
            date:{
                required:true,
                dateInferieur: true
            },
            statut:"required"
        },
        messages:{
            prenom:{
                required:"Le prénom est obligatoire",
                maxlength : "Le prénom ne peut pas être plus long que..."
            },
            nom:{
                required:"Le nom est obligatoire",
                maxlength : "Le nom ne peut pas être plus long que..."
            },
            date:{
                required:"Le date de naissance est requise"
            },
            statut:{
                required:"Le statut est requis"
            }
        },
        submitHandler: function () {
            /* quizz()  */
            $("#accordion").accordion();
            $("#accordion").show("slow");
            $("#erreurs").hide();
            $("#formulaire").hide();
        }, 
        showErrors: function (errorMap, errorList) {
            if (validation) {
                const ul = $("<ul></ul>");
                $.each(errorList, function () {
                  ul.append(`<li>${this.message}</li>`);
                });
                $('#erreurs').html(ul)
                validation = false;	
                $('#erreurs').addClass("alert alert-danger w-50 mx-auto");
              }
              this.defaultShowErrors();
        },
        invalidHandler: function (form, validator) {
            validation = true; 
        },
        
    }
);

jQuery.validator.addMethod(
    "alphanumeric",
    function (value, element) {
      return this.optional(element) || /^[\w.]+$/i.test(value);
    },
    "Lettres et chiffres uniquement"
);

$.validator.addMethod(
    "dateInferieur",
    function (value, element) {
      const dateActuelle = new Date();
      return this.optional(element) || dateActuelle >= new Date(value);
    },
    "La date de naissance doit être inférieure à la date d'aujourd'hui"
);


