console.log('Branch: Exceeds-Expectations');

/**
 * Refactoring
 *  check for single use variables
 */ 

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
const activities = document.querySelectorAll('#activities-box label input');
let totalCost = 0;
// Payments
const paymentSelection = document.querySelector("#payment");
const creditCardPayment = document.querySelectorAll("#payment option")[1];
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
shirtDesignSelect.addEventListener('change', e => {
    const selection = e.target.value;
    const shirtColorOptions = document.querySelectorAll('#color option');
    shirtColorDiv.hidden = false;

    for (let option of shirtColorOptions) {
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

// Input validation functions
const validation = {
    
    name: () => {
        const nameValue = nameInput.value;
        const nameIsValid = /\s*[^\s]+\s*/.test(nameValue); // name cannot be blank
        return nameIsValid;
    }, 
    email: () => {
        const emailValue = emailInput.value;
        const emailIsValid = /^[^@]+@[^@.]+\.[a-z]+$/i.test(emailValue);
        return emailIsValid;
    },
    activities: () => {
        const activityIsValid = totalCost > 0;
        return activityIsValid;
    },
    cardNumber: () => {
        if (creditCardPayment.selected) {
            const numberIsValid = /^[0-9]{13,16}$/g.test(cardNumber.value);
            return numberIsValid;
        } else {
            return true;
        }
    },
    cardZip: () => {
        if (creditCardPayment.selected) {
            const zipCodeIsValid = /^[0-9]{5}$/g.test(zipCode.value);
            return zipCodeIsValid;
        } else {
            return true;
        }
    },
    cardCVV: () => {
        if (creditCardPayment.selected) {
            const cvvIsValid = /^[0-9]{3}$/g.test(cvv.value);
            return cvvIsValid;
        } else {
            return true;
        }
    }
}

// Helper function to display submission errors
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

// Run form validations on submit
form.addEventListener('submit', e => {
    submissionErrors(validation.name, nameInput, e);
    submissionErrors(validation.email, emailInput, e);
    submissionErrors(validation.activities, activitiesList, e);    
    submissionErrors(validation.cardNumber, cardNumber, e);
    submissionErrors(validation.cardZip, zipCode, e);
    submissionErrors(validation.cardCVV, cvv, e);
});
form.addEventListener('blur', e => {
    submissionErrors(validation.name, nameInput, e);
    submissionErrors(validation.email, emailInput, e);
    submissionErrors(validation.activities, activitiesList, e);    
    submissionErrors(validation.cardNumber, cardNumber, e);
    submissionErrors(validation.cardZip, zipCode, e);
    submissionErrors(validation.cardCVV, cvv, e);
});

// Add focus indicators to 'Register for Activities' checkboxes
activities.forEach(activity => {
    const activityLabel = activity.parentElement;
    activity.addEventListener('focus', e => {
        activityLabel.classList.add('focus');
    });
    activity.addEventListener('blur', (e) => {
        activityLabel.classList.remove('focus');
    });
});

// Prevent users from selecting conflicting activities
activitiesList.addEventListener('change', (e) => {
    selection = e.target;
    const checkboxes = document.querySelectorAll('#activities-box label input');

    // Disable conflicting activity checkboxes
    checkboxes.forEach(checkbox => {
        const activityTime = checkbox.dataset.dayAndTime;
        const selectedTime = selection.dataset.dayAndTime;
        const activityLabel = checkbox.parentElement;

        if (selectedTime === activityTime && !checkbox.checked && selection.checked) {
            checkbox.disabled = true;
            activityLabel.classList.add('disabled');
            
        } else if (selectedTime === activityTime) {
            checkbox.disabled = false;
            activityLabel.classList.remove('disabled');
        }
    })
});

















