/** Retrieving datas **/

const signup = document.getElementById('signup')
const confirmation = document.getElementById('confirmation')
const dataForm = document.querySelectorAll('.formData input')
const firstName = document.getElementById('first')
const lastName = document.getElementById('last')
const email = document.getElementById('email')
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const dob = document.getElementById('birthdate')
const quantity = document.getElementById('quantity')
const isTournament = document.getElementById('location1')
const tournament = document.querySelectorAll('input[name="location"]')
const cgu = document.getElementById('checkbox1')
const errorMessages = {
    empty: "Ce champ est obligatoire",
    firstLastName: "Veuillez entrer 2 caractères minimum",
    email: "Veuillez saisir une adresse email valide",
    birthdate: "Veuillez entrer votre date de naissance.",
    quantity: "Veuillez saisir un chiffre entre 0 et 99",
    tournament: "Veuillez selectionner un tournoi",
    cgu: "Vous devez accepter les conditions d'utilisation",
}

/** toggle class for error */

function toggleClassError(item,message,bool){
    
    let attr = 'data-error'
    let attrVisible = 'data-error-visible'

    if (!bool || bool === 'false'){
        item.parentNode.setAttribute(attr,message)
        item.parentNode.setAttribute(attrVisible,true)
    }
    if (bool || bool === 'true'){
        item.parentNode.removeAttribute(attr)
        item.parentNode.removeAttribute(attrVisible)
    }

}

/*** form validation ***/

function validateForm(event) {
    event.preventDefault()
    let errors = 0 // count numbers of error 

    // Empty field
    for(let i = 0 ; i < dataForm.length ; i++){
       // console.log('form item : ' +dataForm[i].value);
        // if(dataForm[i].value === "" || dataForm[i].value === null){
        //     dataForm[i].parentNode.setAttribute('data-error', errorMessages.empty)
        // }
    }
    
    // Name  (min. 2 letters)
    let firstNameLenght = firstName.value.trim()
    if (firstNameLenght.length < 2) {
        toggleClassError(firstName, errorMessages.firstLastName, false)
        errors++
    }else{
        toggleClassError(firstName, errorMessages.firstLastName, true)
    }

    // Lastname  (min. 2 letters)
    let lastNameLenght = lastName.value.trim()
    if (lastNameLenght.length < 2) {
        toggleClassError(lastName, errorMessages.firstLastName, false)
        errors++
    }else{
        toggleClassError(lastName, errorMessages.firstLastName, true)
    }

    // Email 
    let emailValid = email.value.trim()
    if (!emailRegex.test(emailValid)) {
        toggleClassError(email, errorMessages.email, false)
        errors++
    }else{
        toggleClassError(email, errorMessages.email, true)
    }

    // Birthdate 
    let dobValid = dob.value;
    if (dobValid === "") {
        toggleClassError(dob, errorMessages.birthdate, false)
        errors++
    }else{
        toggleClassError(dob, errorMessages.birthdate, true)
    }

    // Number of participations ( min 0, max 99)
    let participations = quantity.value;
    if (participations === "" || isNaN(participations) || participations < 0 || participations > 99) {
        toggleClassError(quantity, errorMessages.quantity, false)
        errors++
    }else{
        toggleClassError(quantity, errorMessages.quantity, true)
    }

    // Tournaments
    let selected = false;
    // input radio checked
    for (let i = 0; i < tournament.length; i++) {
        if (tournament[i].checked) {
            selected = true;
        }
    }
    if (!selected){
        toggleClassError(isTournament, errorMessages.tournament, false)
        errors++
    }
    if(selected){
        toggleClassError(isTournament, errorMessages.tournament, true)
    }

    // CGU
    if (!cgu.checked) {
        toggleClassError(cgu, errorMessages.cgu, false)
        errors++
    }else{
        toggleClassError(cgu, errorMessages.cgu, true)
    }

    // Number of error
    if (errors > 0) {
        return false
    }

    confirmation.classList.remove('hidden'); // show confirmation
    signup.classList.add('hidden'); // hide form
    return true;
}

signup.addEventListener('submit',validateForm)