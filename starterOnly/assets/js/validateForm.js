/*** Validate form ***/

const signup = document.getElementById('signup');
const confirmation = document.getElementById('confirmation');
const dataForm = document.querySelectorAll('.formData input');
const firstName = document.getElementById('first');
const lastName = document.getElementById('last');
const email = document.getElementById('email');
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const dob = document.getElementById('birthdate');
const quantity = document.getElementById('quantity');
const isTournament = document.getElementById('location1');
const tournament = document.querySelectorAll('input[name="location"]');
const cgu = document.getElementById('checkbox1');
const errorMessages = {
    empty: "Ce champ est obligatoire",
    firstLastName: "Veuillez entrer 2 caractères minimum",
    email: "Veuillez saisir une adresse email valide",
    birthdate: "Veuillez entrer votre date de naissance.",
    quantity: "Veuillez saisir un chiffre entre 0 et 99",
    tournament: "Veuillez selectionner un tournoi",
    cgu: "Vous devez accepter les conditions d'utilisation",
};

 
// for(let i = 0 ; i < dataForm.length ; i++){
//     console.log(dataForm[i].getAttribute('id'));
//     if(dataForm[i].value === "" || dataForm[i].value === null){
//         dataForm[i].parentNode.setAttribute('data-error', errorMessages.empty)
//     }
// }


function validateForm(event) {
    event.preventDefault();
    let errors = 0; // count numbers of error 

    // Validation du prénom (min. 2 lettres)
    let firstNameLenght = firstName.value.trim()
    if (firstNameLenght.length < 2) {
        firstName.parentNode.setAttribute('data-error', errorMessages.firstLastName)
        firstName.parentNode.setAttribute('data-error-visible', true)
        errors++
    }else{
        firstName.parentNode.removeAttribute('data-error')
        firstName.parentNode.removeAttribute('data-error-visible')
    }

    // Validation du nom (min. 2 lettres)
    let lastNameLenght = lastName.value.trim()
    if (lastNameLenght.length < 2) {
        lastName.parentNode.setAttribute('data-error', errorMessages.firstLastName)
        lastName.parentNode.setAttribute('data-error-visible', true)
        errors++
    }else{
        lastName.parentNode.removeAttribute('data-error')
        lastName.parentNode.removeAttribute('data-error-visible')
    }

    // Validation de l'email avec regex
    let emailValid = email.value.trim();
    if (!emailRegex.test(emailValid)) {
        email.parentNode.setAttribute('data-error', errorMessages.email)
        email.parentNode.setAttribute('data-error-visible', true)
        errors++
    }else{
        email.parentNode.removeAttribute('data-error')
        email.parentNode.removeAttribute('data-error-visible')
    }

    // Validation de la date de naissance (champ type "date" au format YYYY-MM-DD)
    let dobValid = dob.value;
    if (dobValid === "") {
        dob.parentNode.setAttribute('data-error', errorMessages.birthdate)
        dob.parentNode.setAttribute('data-error-visible', true)
        errors++
    }else{
        dob.parentNode.removeAttribute('data-error')
        dob.parentNode.removeAttribute('data-error-visible')
    }

    // Validation du nombre de participations (entre 0 et 99)
    let participations = quantity.value;
    if (participations === "" || isNaN(participations) || participations < 0 || participations > 99) {
        quantity.parentNode.setAttribute('data-error', errorMessages.quantity)
        quantity.parentNode.setAttribute('data-error-visible', true)
        errors++
    }else{
        quantity.parentNode.removeAttribute('data-error');
        quantity.parentNode.removeAttribute('data-error-visible');
    }

    // Validation du choix du tournoi (radio sélectionné)
    let selected = false;
    // Vérifie si un des boutons est sélectionné
    for (let i = 0; i < tournament.length; i++) {
        if (tournament[i].checked) {
            selected = true;
        }
    }
    if (!selected){
        isTournament.parentNode.setAttribute('data-error', errorMessages.tournament)
        isTournament.parentNode.setAttribute('data-error-visible', true)
        errors++
    }
    if(selected){
        isTournament.parentNode.removeAttribute('data-error')
        isTournament.parentNode.removeAttribute('data-error-visible')
    }

    // Validation de l'acceptation des CGU (checkbox cochée)
    if (!cgu.checked) {
        cgu.parentNode.setAttribute('data-error', errorMessages.cgu)
        cgu.parentNode.setAttribute('data-error-visible', true)
        errors++
    }else{
        cgu.parentNode.removeAttribute('data-error')
        cgu.parentNode.removeAttribute('data-error-visible')
    }

    // Affichage des erreurs ou soumission du formulaire
    if (errors > 0) {
        return false; // Empêche l'envoi du formulaire
    }

    confirmation.classList.remove('hidden');
    signup.classList.add('hidden');
    return true; // Le formulaire est valide
}
signup.addEventListener('submit',validateForm)