
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


function validateForm() {
    const firstName = document.getElementById('first').value.trim();
    const lastName = document.getElementById('last').value.trim();
    const email = document.getElementById('email').value.trim();
    const dob = document.getElementById('birthdate').value
    const participations = document.getElementById('quantity').value;
    const tournament = document.querySelector('input[name="location"]:checked');
    const cgu = document.getElementById('checkbox1').checked;
    const errorMessages = document.getElementById('errorMessages');

    let errors = [];

    // Validation du prénom (min. 2 lettres)
    if (firstName.length < 2) {
        errors.push("Le prénom doit contenir au moins 2 lettres.");
    }

    // Validation du nom (min. 2 lettres)
    if (lastName.length < 2) {
        errors.push("Le nom doit contenir au moins 2 lettres.");
    }

    // Validation de l'email avec regex
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
        errors.push("L'adresse e-mail n'est pas valide.");
    }

    // Validation de la date de naissance (champ type "date" au format YYYY-MM-DD)
    if (dob === "") {
        errors.push("La date de naissance est requise.");
    }

    // Validation du nombre de participations (entre 0 et 99)
    if (participations === "" || isNaN(participations) || participations < 0 || participations > 99) {
        errors.push("Le nombre de participations doit être entre 0 et 99.");
    }

    // Validation du choix du tournoi (radio sélectionné)
    if (!tournament) {
        errors.push("Vous devez choisir un tournoi.");
    }

    // Validation de l'acceptation des CGU (checkbox cochée)
    if (!cgu) {
        errors.push("Vous devez accepter les CGU.");
    }

    // Affichage des erreurs ou soumission du formulaire
    if (errors.length > 0) {
        errorMessages.innerHTML = errors.join('<br>');
        return false; // Empêche l'envoi du formulaire
    }

    return true; // Le formulaire est valide
}
