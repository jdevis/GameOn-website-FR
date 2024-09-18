
/*** Validate form ***/

// recupere le submit
/*document.querySelector('.modal-body input=["submit"]').addEventListener("click", function(){
    //setCustomValidity("message erreur");
    let valid = true;
    for( let input of document.querySelectorAll(".modal-body input")){
        valid &= input.reportValidity();
        if(!valid){
            break;
        }
    }
    if(valid){
        alert("champs validés");
    }
});*/

/**   Explanation of regex : email  **/
/** 
     ^: Start of the string.
    [a-zA-Z0-9._%+-]+: One or more letters, digits, dots, underscores, percentage signs, plus or hyphens. This is the local part of the email (before the @).
    @: The required symbol separating the local part from the domain.
    [a-zA-Z0-9.-]+: One or more letters, digits, dots or hyphens. This matches the domain name.
    \.: A required dot separating the domain from the top-level domain (e.g., .com).
    [a-zA-Z]{2,}: Two or more letters for the top-level domain.
    $: End of the string.
**/
const dataForm = document.querySelectorAll(".formData input");
const firstName = document.getElementById('first');
const lastName = document.getElementById('last');
const email = document.getElementById('email');
const dob = document.getElementById('birthdate').value;
const quantity = document.getElementById('quantity');
const tournament = document.querySelector('input[name="location"]:checked');
const cgu = document.getElementById('checkbox1').checked;
const errorMessages = {
    empty: "Ce champ est obligatoire",
    firstLastName: "Veuillez entrer 2 caractères minimum",
    email: "Veuillez saisir une adresse email valide",
    birthdate: "Vous devez entrer votre date de naissance.",
    quantity: "Vous devez saisir un chiffre",
    tournament: "Vous devez selectionner un tournoi",
    cgu: "Vous devez accepter les conditions d'utilisation.",
};

// console.log(dataForm);
// for(let i = 0 ; i < dataForm.length ; i++){
//     console.log(dataForm[i].getAttribute('id'));
//     if(dataForm[i].value === "" || dataForm[i].value === null){
//         dataForm[i].parentNode.setAttribute('data-error', errorMessages.empty)
//     }
// }

function validateForm() {
    event.preventDefault();
    let errors = 0;
    console.log (errors)
    // Validation du prénom (min. 2 lettres)
    let firstNameLenght = firstName.value.trim()
    if (firstNameLenght.length < 2) {
        firstName.parentNode.setAttribute('data-error', errorMessages.firstLastName)
        errors++
    }

    // Validation du nom (min. 2 lettres)
    let lastNameLenght = lastName.value.trim()
    if (lastNameLenght.length < 2) {
        lastName.parentNode.setAttribute('data-error', errorMessages.firstLastName)
        errors++
    }

    // Validation de l'email avec regex
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let emailValid = email.value.trim();
    if (!emailRegex.test(emailValid)) {
        email.parentNode.setAttribute('data-error', errorMessages.email)
        errors++
    }

    // Validation de la date de naissance (champ type "date" au format YYYY-MM-DD)
    let dobValid =dob.value;
    if (dobValid === "") {
        dob.parentNode.setAttribute('data-error', errorMessages.birthdate)
        errors++
    }

    // Validation du nombre de participations (entre 0 et 99)
    let participations = quantity.value;
    if (participations === "" || isNaN(participations) || participations < 0 || participations > 99) {
        quantity.parentNode.setAttribute('data-error', errorMessages.quantity)
        errors++
    }

    // Validation du choix du tournoi (radio sélectionné)
    // if (!tournament) {
    //     tournament.parentNode.setAttribute('data-error', errorMessages.tournament)
    //     errors++
    // }

    // Validation de l'acceptation des CGU (checkbox cochée)
    // if (!cgu) {
    //     cgu.parentNode.setAttribute('data-error', errorMessages.cgu)
    //     errors++
    // }
    console.log('nbre erreur : '+errors)
    // Affichage des erreurs ou soumission du formulaire
    if (errors > 0) {
        return false; // Empêche l'envoi du formulaire
    }
    
    return true; // Le formulaire est valide
}
