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
		"reponse":0
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
		"reponse":4
	},
    {
		"question":"Avec quelle forme verbale compléter cette phrase à l'indicatif futur ?",
        "phrase":"Les beaux jours ...-ils ?",
		"reponses":[
			"Reviendra",
			"Reviendrons", 
			"Reviendront"
		], 
		"reponse":2
	},
    {
		"question":"Avec quelle forme verbale au subjonctif présent compléter cette phrase ? ",
        "phrase":"Il s'est mis à pleuvoir avant que nous ... le temps de nous mettre à l'abri.",
		"reponses":[
			"Ayons",
			"Ayions", 
			"Ayons eu"
		], 
		"reponse":0
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
		"reponse":3
	},{
		"question":"À quel temps de l'indicatif le verbe est-il conjugué ?",
        "phrase":"Il a rajeuni de dix ans.",
		"reponses":[
			"présent",
			"imparfait", 
			"passé composé"
		], 
		"reponse":2
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
		"reponse":3
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
		"reponse":1
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
		"reponse":0
	},{
		"question":"Tous ces adjectifs doublent leur n final au féminin, sauf un : lequel ?",
        "phrase":"",
		"reponses":[
			"Ancien",
			"Bon", 
			"Lapon",
            "Méditerranéen"
		], 
		"reponse":2
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
        // $("#accordion").accordion();
        // $("#accordion").show("slow");
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

// // // // // // // // // // // // // // // // // // // // // // // // // // 

// PREP QUIZ SELON EXEMPLE SUR CODEPEN 
let quizz = function () {

let decompteQuestion = 0;
let selections = [];
let quiz = $('#accordion').accordion();

displayNext();

$('#next').on('click', function (e) {
    e.preventDefault();
    if (quiz.is(':animated')) {
        return false;
    }
    choose();

    if (isNaN(selections[decompteQuestion])) {
        $('#warning').text(' SVP Faire une sélection !');
    } else {
        decompteQuestion++;
        displayNext();
        $('#warning').text('');
    }
});

function creerQuestionElement(index) {
    let elementQuestion = $('<div>', {
        id: 'acco'
    });

    let h2 = $('<h2> Question no ' + (index + 1) + ': </h2>');
    elementQuestion.append(h2);

    let question = $('<p>').append(questions[index].question);
    elementQuestion.append(question);

    let boutonRadios = creerRadios(index);
    elementQuestion.append(boutonRadios);

    let warningText = $('<p id="warning">');
    elementQuestion.append(warningText);
    
    return elementQuestion;
}

function creerRadios(index) {
    let radioList = $('<ul>');
    let item;
    let input = '';
    for (let i = 0; i < questions[index].reponses.length; i++) {
        item = $('<li>');
        input = '<input type="radio" name="answer" value=' + i + ' />';
        input += questions[index].reponses[i];
        item.append(input);
        radioList.append(item);
    }
    return radioList;
}

function choose() {
    selections[decompteQuestion] = +$('input[name="answer"]:checked').val();
}

function displayNext() {
    quiz.fadeOut(function () {
        $('#question').remove();

        if (decompteQuestion < questions.length) {
            let nextQuestion = creerQuestionElement(decompteQuestion);
            quiz.append(nextQuestion).fadeIn();
            if (!(isNaN(selections[decompteQuestion]))) {
                $('input[value=' + selections[decompteQuestion] + ']').prop('checked', true);
            } if (decompteQuestion === 1) {
                $('#next').show();
            }
        } else {
            let scoreElem = displayScore();
            quiz.append(scoreElem).fadeIn();
            $('#next').hide();
            $('#button-debut').show();
        }
    });
}

function displayScore() {
    let score = $('<h3>', {
        id: 'question'
    });

    let numCorrect = 0;
    for (let i = 0; i < selections.length; i++) {
        if (selections[i] === questions[i].reponse) {
            numCorrect++;
        }
    }
    let percentage = numCorrect / questions.length;
    if (percentage >= 0.9) {
        score.append('Incredible! You got ' + numCorrect + ' out of ' +
            questions.length + ' questions right!');
    } else if (percentage >= 0.7) {
        score.append('Good job! You got ' + numCorrect + ' out of ' +
            questions.length + ' questions right!');
    } else if (percentage >= 0.5) {
        score.append('You got ' + numCorrect + ' out of ' +
            questions.length + ' questions right.');
    } else {
        score.append('You only got ' + numCorrect + ' out of ' +
            questions.length + ' right. Want to try again?');
    }
    return score;
}
}

// // // // // // // // // // // // // // // // // // // // // // // // // // 