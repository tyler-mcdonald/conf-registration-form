// Basic Info
const form = document.querySelector(".container form");
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector("#email");
const otherJobRole = document.querySelector("#other-job-role");
const jobRoleSelect = document.querySelector("#title");
// Shirts
const shirtColors = document.querySelector('#shirt-colors');
const shirtDesignDropdown = document.querySelector('#design');
// Activities
const activitiesBox = document.querySelector("#activities-box");
const activities = document.querySelectorAll('#activities-box label input');
let totalCost = 0;
// Payments
const paymentDropdown = document.querySelector("#payment");
const creditCardPayment = document.querySelectorAll("#payment option")[1];
const creditCardInfo = document.querySelector("#credit-card");
const cardNumber = document.querySelector("#cc-num");
const zipCode = document.querySelector("#zip");
const cvv = document.querySelector("#cvv");
const paypalInfo = document.querySelector("#paypal");
const bitcoinInfo = document.querySelector("#bitcoin");

// Default form views
nameInput.focus();
shirtColors.hidden = true;
otherJobRole.hidden = true;
creditCardPayment.selected = true;
paypalInfo.hidden = true;
bitcoinInfo.hidden = true;

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
shirtDesignDropdown.addEventListener('change', e => {
    const selection = e.target.value;
    const shirtColorOptions = document.querySelectorAll('#color option');
    shirtColors.hidden = false;

    for (let option of shirtColorOptions) {
        const theme = option.dataset.theme;
        option.hidden = true;
        if (selection === theme) {
            option.hidden = false;
        }
    }
});

// Update total activities cost
activitiesBox.addEventListener('change', e => {
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
paymentDropdown.addEventListener('change', e => {
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
    
    nameInput: () => {
        const nameValue = nameInput.value;
        const nameIsValid = /\s*[^\s]+\s*/.test(nameValue); // name cannot be blank
        return nameIsValid;
    }, 
    emailInput: () => {
        const emailValue = emailInput.value;
        const emailIsValid = /^[^@]+@[^@.]+\.[a-z]+$/i.test(emailValue);
        return emailIsValid;
    },
    activitiesBox: () => {
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
    zipCode: () => {
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

function submissionErrors(validationFunction, inputElement, event) {
    const parentElement = inputElement.parentElement;
    let errorMessage = parentElement.lastElementChild;
    if (!validationFunction()) {
        event.preventDefault();

        // Conditional error message for email field
        if (inputElement === emailInput && emailInput.value === '') {
            errorMessage.textContent = 'Email address field cannot be blank';
        } else if (inputElement === emailInput && emailInput.value !== '') {
            errorMessage.textContent = 'Email address must be formatted correctly';
        }

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
    submissionErrors(validation.nameInput, nameInput, e);
    submissionErrors(validation.emailInput, emailInput, e);
    submissionErrors(validation.activitiesBox, activitiesBox, e);    
    submissionErrors(validation.cardNumber, cardNumber, e);
    submissionErrors(validation.zipCode, zipCode, e);
    submissionErrors(validation.cvv, cvv, e);
});

/** Refactoring blur events into helper function. Currently not working.*/
// function addBlurEvent(inputElement) {
//     inputElement.addEventListener('blur', e => {
//         submissionErrors(validation.inputElement, inputElement, e);
//     })
// }
nameInput.addEventListener('blur', e => {
    submissionErrors(validation.nameInput, nameInput, e);
});
emailInput.addEventListener('blur', e => {
    submissionErrors(validation.emailInput, emailInput, e);
});
activitiesBox.addEventListener('blur', e => {
    submissionErrors(validation.activitiesBox, activitiesBox, e);    
});
cardNumber.addEventListener('blur', e => {
    submissionErrors(validation.cardNumber, cardNumber, e);
});
zipCode.addEventListener('blur', e => {
    submissionErrors(validation.zipCode, zipCode, e);
});
cvv.addEventListener('blur', e => {
    submissionErrors(validation.cvv, cvv, e);
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
activitiesBox.addEventListener('change', (e) => {
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
