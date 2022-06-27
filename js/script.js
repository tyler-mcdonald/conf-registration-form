




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
let totalCost = 0;
// Payments
const paypalInfo = document.querySelector("#paypal");
const bitcoinInfo = document.querySelector("#bitcoin");
const creditCardInfo = document.querySelector("#credit-card");
const paymentOptions = document.querySelectorAll("#payment option");
const paymentSelection = document.querySelector("#payment");
const creditCardPayment = paymentOptions[1];

// Default user views 
nameInput.focus();
shirtColorDiv.hidden = true;
otherJobRole.hidden = true;
creditCardPayment.selected = true;
paypalInfo.hidden = true;
bitcoinInfo.hidden = true;

// Show 'Other Job Role' when user selects dropdown
jobRoleSelect.addEventListener('change', e => {
    selection = e.target.value;
    if (selection === 'other') {
        otherJobRole.hidden = false;
    } else {
        otherJobRole.hidden = true;
    }
});

// Show shirt color options by design theme
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

// Form validation functions -- turn into an object 
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

function paymentValidator() {
    if (creditCardPayment.selected) {
        const cardNumber = document.querySelector('#cc-num').value;
        const numberIsValid = /^[0-9]{13,16}$/g.test(cardNumber);

        const zipCode = document.querySelector('#zip').value;
        const zipCodeIsValid = /^[0-9]{5}$/g.test(zipCode);

        const cvv = document.querySelector('#cvv').value;
        const cvvIsValid = /^[0-9]{3}$/g.test(cvv);

        const cardIsValid = (numberIsValid && zipCodeIsValid && cvvIsValid);

        return cardIsValid;
    } else {
        return true;
    }
}


// Form validations
// can be refactored using a loop, with these functions stored in an object
form.addEventListener('submit', e => {
    console.clear();
    
    if (!nameValidator()) {
        e.preventDefault();
        nameInput.parentElement.classList.add('not-valid');
        console.log('invalid name');
    }
    if (!emailValidator()) {
        e.preventDefault();
        console.log('invalid email');
    }
    if (!activityValidator()) {
        e.preventDefault();
        console.log('Must select at least one activity');
    }
    if (!paymentValidator()) {
        e.preventDefault();
        console.log('Card info invalid');
    }
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

















