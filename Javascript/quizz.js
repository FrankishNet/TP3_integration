// VALIDATION FORMULAIRE //



let validation = false;
let score = 0;

let questions = `[{
		"question":"Comment s’écrit le participe passé de : ",
        "phrase":"Ils se sont ... compte de leur  erreur",
		"reponses":[
		"rendu",
		"rendus", 
		"rendue"
		], 
		"reponseCorrecte":0
	},
	{
		"question":"Quel verbe s'écrit avec un t à l'indicatif présent, à la 3e personne du singulier ?",
        "phrase":"",
		"reponses":[
			"Aimer",
			"Diriger", 
			"Habiter",
            "Regarder",
            "Voir"
		], 
		"reponseCorrecte":4
	},
    {
		"question":"Avec quelle forme verbale compléter cette phrase à l'indicatif futur ?",
        "phrase":"Les beaux jours ...-ils ?",
		"reponses":[
			"Reviendra",
			"Reviendrons", 
			"Reviendront"
		], 
		"reponseCorrecte":2
	},
    {
		"question":"Avec quelle forme verbale au subjonctif présent compléter cette phrase ? ",
        "phrase":"Il s'est mis à pleuvoir avant que nous ... le temps de nous mettre à l'abri.",
		"reponses":[
			"Ayons",
			"Ayions", 
			"Ayons eu"
		], 
		"reponseCorrecte":0
	},{
		"question":"Parmi ces verbes, lequel n'est pas au passé simple ?",
        "phrase":"",
		"reponses":[
			"il déjeuna",
			"je descendis", 
			"ils mirent",
            "tu partais",
            "elles passèrent"
		], 
		"reponseCorrecte":3
	},{
		"question":"À quel temps de l'indicatif le verbe est-il conjugué ?",
        "phrase":"Il a rajeuni de dix ans.",
		"reponses":[
			"présent",
			"imparfait", 
			"passé composé"
		], 
		"reponseCorrecte":2
	},{
		"question":"Dans cette liste d’expressions, laquelle ne constitue pas un pléonasme ?",
        "phrase":"",
		"reponses":[
			"Allumer la lumière",
			"Commémorer un souvenir", 
			"Marcher à pied",
            "Célébrer un anniversaire",
            "Pondre un oeuf"
		], 
		"reponseCorrecte":3
	},{
		"question":"Dans cette liste de noms, un seul est féminin : lequel ?",
        "phrase":"",
		"reponses":[
			"Arôme",
			"Espèce", 
			"Épisode",
            "Emblême",
            "Hémisphère",
            "Intervalle"
		], 
		"reponseCorrecte":1
	},{
		"question":"Dans cette liste de noms, un seul est masculin : lequel ?",
        "phrase":"",
		"reponses":[
			"Armistice",
			"Autoroute", 
			"Écharpe",
            "Idole",
            "Interview",
            "Stalactite"
		], 
		"reponseCorrecte":0
	},{
		"question":"Tous ces adjectifs doublent leur n final au féminin, sauf un : lequel ?",
        "phrase":"",
		"reponses":[
			"Ancien",
			"Bon", 
			"Lapon",
            "Méditerranéen"
		], 
		"reponseCorrecte":2
	}
]`

questions = JSON.parse(questions);

$("#formulaire").validate({

    onfocusout: false,

    rules: {
        prenom: {
            required: true,
            maxlength: 100,
            alphanumeric: true
        },
        nom: {
            required: true,
            maxlength: 100,
            alphanumeric: true
        },
        date: {
            required: true,
            dateInferieur: true
        },
        statut: "required"
    },
    messages: {
        prenom: {
            required: "Le prénom est obligatoire",
            maxlength: "Le prénom ne peut pas être plus long que..."
        },
        nom: {
            required: "Le nom est obligatoire",
            maxlength: "Le nom ne peut pas être plus long que..."
        },
        date: {
            required: "Le date de naissance est requise"
        },
        statut: {
            required: "Le statut est requis"
        }
    },

    submitHandler: function () {
        quizz();
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
        $("#accordion").hide();
        validation = true;
    },

});

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

let quizz = function () {
    $(document).ready(function () {

        $("#accordion").show("slow");
        $("#message").show("slow");
        $("#btnSuivant").hide();

        let round = 0;
        let point = 0;


        displayOption(questions, round);

        function displayOption(array, round) {
            $(".list-group-item").remove();
            $.each(array, function () {
                $(".card-title").text(`${round + 1}. ${array[round].question}`);
                $(".phrase").text(`${array[round].phrase}`);

            });

            for (let i = 0; i < array[round].reponses.length; i++) {
                $a = $("<a></a>");
                $a.addClass("list-group-item");
                $a.text(array[round].reponses[i]);

                $(".list-group").append($a);
            }
        }

        $(".list-group").on("click", function (e) {
            if (e.target.nodeName == "A") {
                $(e.target)
                    .siblings()
                    .removeClass("active");
                $(e.target).addClass("active");
                $("#btnSuivant").show();
            }
            e.preventDefault();
        });

        $("#btnSuivant").on("click", function (e) {
            checkAnswer(e);
        });

        function checkAnswer(e) {
            e.preventDefault();
            if ($(".active").length) {
                let optionIndex = $(".active").index();
                // console.log(`la réponse est : ${questions[round].reponseCorrecte}, vous avez choisi: ${optionIndex}`);
                if (round < questions.length - 1) {
                    if (questions[round].reponseCorrecte !== optionIndex) {
                        $("#message").text(`Mauvaise réponse, tu as ${point}/10.`);
                        round++;
                        displayOption(questions, round);
                    } else {
                        point++;
                        $("#message").text(`Bonne réponse, tu as ${point}/10.`);
                        round++;
                        displayOption(questions, round);

                    }
                    return point;
                    return round;

                } else {
                    /* $(".modal-body>p").text(`résultat: ${point}/10.`);
                    $("#monModal").modal("show"); */
                    if (point > 7){
                        $(".modal-content").addClass("alert-success");
                        $(".modal-body>p").text(`C'est un véritable succès tu as : ${point}/10.`);
                        $("#monModal").modal("show");
                    }else if (point >= 6){
                        $(".modal-content").addClass("alert-warning");
                        $(".modal-body>p").text(`C'est bon mais pas encore ça tu as : ${point}/10.`);
                        $("#monModal").modal("show");
                    }else{
                        $(".modal-content").addClass("alert-danger");
                        $(".modal-body>p").text(`C'est un véritable échec : ${point}/10.`);
                        $("#monModal").modal("show");
                    }
                }
            } else {
                return false;
            }
        }
    });
}
/* if (point > 7){
    $(".modal-content").addClass("alert-success");
    $(".modal-body>p").text(`C'est un véritable succès tu as : ${point}/10.`);
    $("#monModal").modal("show");
}else if (point >= 6){
    $(".modal-content").addClass("alert-warning");
    $(".modal-body>p").text(`C'est bon mais pas encore ça tu as : ${point}/10.`);
    $("#monModal").modal("show");
}else{
    $(".modal-content").addClass("alert-danger");
    $(".modal-body>p").text(`C'est un véritable échec : ${point}/10.`);
    $("#monModal").modal("show");
} */