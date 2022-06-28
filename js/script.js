// Basic Info
const form = document.querySelector(".container form");
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector("#email");
const otherJobRole = document.querySelector("#other-job-role");
const jobRoleSelect = document.querySelector("#title");
// Shirts
const shirtColorDiv = document.querySelector('#shirt-colors');
const shirtDesignSelect = document.querySelector('#design');
// Activities
const activitiesList = document.querySelector("#activities-box");
const activitiesLegend = document.querySelector('#activities legend');
let totalCost = 0;
// Payments
const paymentOptions = document.querySelectorAll("#payment option");
const paymentSelection = document.querySelector("#payment");
const creditCardPayment = paymentOptions[1];
const creditCardInfo = document.querySelector("#credit-card");
const cardNumber = document.querySelector("#cc-num");
const zipCode = document.querySelector("#zip");
const cvv = document.querySelector("#cvv");
const paypalInfo = document.querySelector("#paypal");
const bitcoinInfo = document.querySelector("#bitcoin");


// Default form views
nameInput.focus();
shirtColorDiv.hidden = true;
otherJobRole.hidden = true;
creditCardPayment.selected = true;
paypalInfo.hidden = true;
bitcoinInfo.hidden = true;

// DEBUGGING DEFAULT SETTINGS
// nameInput.value = 'TEST USER';
// emailInput.value = 'TEST@EMAIL.COM';
// // totalCost = 100;
// cardNumber.value = '1234567890123';
// zipCode.value = '12345';
// cvv.value = '123';

// Display 'Other Job Role' when user selects dropdown
jobRoleSelect.addEventListener('change', e => {
    selection = e.target.value;
    if (selection === 'other') {
        otherJobRole.hidden = false;
    } else {
        otherJobRole.hidden = true;
    }
});

// Display shirt color options by design theme
// refactor to eliminate `colorThemeSelect`
shirtDesignSelect.addEventListener('change', e => {
    const selection = e.target.value;
    const colorThemeSelect = document.querySelector('#color');
    const colorThemeOptions = colorThemeSelect.querySelectorAll('option');
    shirtColorDiv.hidden = false;

    for (let option of colorThemeOptions) {
        const theme = option.dataset.theme;
        option.hidden = true;
        if (selection === theme) {
            option.hidden = false;
        }
    }
});

// Update total activities cost
activitiesList.addEventListener('change', e => {
    const activity = e.target;
    const activitiesTotalCost = document.querySelector('#activities-cost');
    const activityCost = parseInt(activity.dataset.cost);

    if (activity.checked) {
        totalCost += activityCost;
    } else if (!activity.checked) {
        totalCost -= activityCost;
    }

    activitiesTotalCost.textContent = `Total: $${totalCost}`;
})

// Payment information display
// Refactor as a function; remove global variables
paymentSelection.addEventListener('change', e => {
    const selection = e.target.value;

    if (selection === 'credit-card') {
        creditCardInfo.hidden = false;
        paypalInfo.hidden = true;
        bitcoinInfo.hidden = true;
    }
    if (selection === 'paypal') {
        creditCardInfo.hidden = true;
        paypalInfo.hidden = false;
        bitcoinInfo.hidden = true;
    }
    if (selection === 'bitcoin') {
        creditCardInfo.hidden = true;
        paypalInfo.hidden = true;
        bitcoinInfo.hidden = false;
    }
});

// Form validation functions
// refactor into an object 
function nameValidator() {
    const nameValue = nameInput.value;
    const nameIsValid = /\s*[^\s]+\s*/.test(nameValue); // name cannot be blank
    return nameIsValid;
}

function emailValidator() {
    const emailValue = emailInput.value;
    const emailIsValid = /^[^@]+@[^@.]+\.[a-z]+$/i.test(emailValue);
    return emailIsValid;
}

function activityValidator() {
    const activityIsValid = totalCost > 0;
    return activityIsValid;
}

// Card validation functions
// add other validations on separate branch
const cardValidation = {
    number: () => {
        if (creditCardPayment.selected) {
            const numberIsValid = /^[0-9]{13,16}$/g.test(cardNumber.value);
            return numberIsValid;
        } else {
            return true;
        }
    },
    zip: () => {
        if (creditCardPayment.selected) {
            const zipCodeIsValid = /^[0-9]{5}$/g.test(zipCode.value);
            return zipCodeIsValid;
        } else {
            return true;
        }
    },
    cvv: () => {
        if (creditCardPayment.selected) {
            const cvvIsValid = /^[0-9]{3}$/g.test(cvv.value);
            return cvvIsValid;
        } else {
            return true;
        }
    }
}

// function submissionErrors(validationFunction, inputElement, event) {
//     if (!validationFunction()) {
//         event.preventDefault();
//         inputElement.parentElement.classList.add('not-valid');
//         inputElement.lastElementSibling.style.display = 'inline'; // lastElementSibling causing bug; might change back to nextElementSibling
//     } else {
//         inputElement.parentElement.classList.remove("not-valid");
//         inputElement.parentElement.classList.add("valid");
//         inputElement.lastElementSibling.style.display = 'none'; // lastElementSibling causing bug; might change back to nextElementSibling
//     }
// }

function submissionErrors(validationFunction, inputElement, event) {
    const parentElement = inputElement.parentElement;
    if (!validationFunction()) {
        event.preventDefault();
        parentElement.classList.add('not-valid');
        parentElement.lastElementChild.style.display = 'inline'; 
    } else {
        parentElement.classList.remove("not-valid");
        parentElement.classList.add("valid");
        parentElement.lastElementChild.style.display = 'none'; 
    }
}

// Form validations
// refactor: add to existing validation object
form.addEventListener('submit', e => {
    console.clear();

    submissionErrors(nameValidator, nameInput, e);
    submissionErrors(emailValidator, emailInput, e);
    submissionErrors(activityValidator, activitiesList, e);    
    submissionErrors(cardValidation.number, cardNumber, e);
    submissionErrors(cardValidation.zip, zipCode, e);
    submissionErrors(cardValidation.cvv, cvv, e);

});

//// Accessibility ////
const activities = document.querySelectorAll('#activities-box label input');

// Add focus indicators to 'Register for Activities' checkboxes
for (let activity of activities) {
    const activityLabel = activity.parentElement;
    activity.addEventListener('focus', e => {
        activityLabel.classList.add('focus');
    });
    activity.addEventListener('blur', (e) => {
      activityLabel.classList.remove('focus');
    });
}

















