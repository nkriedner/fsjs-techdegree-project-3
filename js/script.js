/*********************
 * ELEMENT SELECTORS *
/*********************/
const form = document.querySelector("form");
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const jobRoleSelect = document.querySelector("#title");
const otherJobRole = document.querySelector("#other-job-role");
const designSelect = document.querySelector("#design");
const colorSelect = document.querySelector("#color");
const activitiesSection = document.querySelector("#activities");
const activitiesCost = document.querySelector("#activities-cost");
const paymentSelect = document.querySelector("#payment");
const creditCardSection = document.querySelector("#credit-card");
const paypalSection = document.querySelector("#paypal");
const bitcoinSection = document.querySelector("#bitcoin");
const creditCardInput = document.querySelector("#cc-num");
const zipCodeInput = document.querySelector("#zip");
const cvvCodeInput = document.querySelector("#cvv");

/*****************************
 * DEFAULT VALUES & SETTINGS *
/*****************************/
nameInput.focus();
otherJobRole.hidden = true;
colorSelect.disabled = true;
let totalPrice = 0; // price of all registered activities
paymentSelect.value = "credit-card"; // pre-selected payment method
paypalSection.hidden = true;
bitcoinSection.hidden = true;

/********************
 * HELPER FUNCTIONS *
/********************/

// Validation Check functions
const isValidName = () => /^[^\d ]+$/.test(nameInput.value); // string needs at least 1 non digit
const isValidEmail = () => /^[^@]+@[^@.]+\.[a-z]+$/i.test(emailInput.value); // checks email format
const isActivityChosen = () => totalPrice > 0;
const isCardNumberValid = () => /^[\d]{13,16}$/.test(creditCardInput.value);
const isValidZipCode = () => /^[\d]{5}$/.test(zipCodeInput.value);
const isValidCvvCode = () => /^[\d]{3}$/.test(cvvCodeInput.value);

// Meta Validator function
const validator = (inputElement, validationFunction, formSubmission) => {
    if (validationFunction()) {
        inputElement.parentElement.classList.add("valid");
        inputElement.parentElement.classList.remove("not-valid");
        inputElement.nextElementSibling.style.display = "none";
    } else {
        formSubmission.preventDefault();
        inputElement.parentElement.classList.add("not-valid");
        inputElement.parentElement.classList.remove("valid");
        inputElement.nextElementSibling.style.display = "initial";
    }
};

/*******************
 * EVENT LISTENERS *
/*******************/

// 'CHANGE' event on 'Job Role' select:
jobRoleSelect.addEventListener("change", (e) => {
    // Show hidden 'Other Job' input when 'Other' option is selected:
    if (e.target.value === "other") {
        otherJobRole.hidden = false;
        otherJobRole.focus();
    } else {
        otherJobRole.hidden = true;
    }
});

// 'CHANGE' event on 'Tshirt Design' select:
designSelect.addEventListener("change", (e) => {
    // Enable color select
    colorSelect.disabled = false;

    // Loop through the option elements and hide all options not matching the selecValue
    const colorOptions = document.querySelectorAll("#color option");
    for (let i = 0; i < colorOptions.length; i++) {
        if (colorOptions[i].getAttribute("data-theme") !== e.target.value) {
            colorOptions[i].hidden = true;
        } else {
            colorOptions[i].hidden = false;
            colorSelect.value = colorOptions[i].value; // preselects in every loop -> not ideal solution but temporarily ok
        }
    }
});

// 'CHANGE' event on 'Register for Activities' fieldset:
activitiesSection.addEventListener("change", (e) => {
    const activityCost = parseInt(e.target.getAttribute("data-cost"));

    // If an activity is checked, add its cost to totalPrice + update totalText
    if (e.target.checked) {
        totalPrice += activityCost;
    } else {
        // if it is not checked, subtract its cost from totalPrice
        totalPrice -= activityCost;
    }

    // Update totalText (text for toal price)
    activitiesCost.textContent = "Total: $" + totalPrice;

    // Loop through activities and disable the time conflicting ones
    const activitiesInputs = document.querySelectorAll("#activities input");
    for (let i = 0; i < activitiesInputs.length; i++) {
        // Check if activitiesInput has the same date and time
        if (e.target.getAttribute("data-day-and-time") === activitiesInputs[i].getAttribute("data-day-and-time")) {
            if (e.target.checked) {
                activitiesInputs[i].disabled = true;
                activitiesInputs[i].parentElement.classList.add("disabled");
                e.target.disabled = false;
                e.target.parentElement.classList.remove("disabled");
            } else {
                activitiesInputs[i].disabled = false;
                activitiesInputs[i].parentElement.classList.remove("disabled");
            }
        }
    }
});

// 'CHANGE' event on 'Payment Info' select:
paymentSelect.addEventListener("change", (e) => {
    const selectValue = e.target.value;

    // Adjust the form display according to selected payment method
    if (selectValue === "paypal") {
        creditCardSection.hidden = true;
        paypalSection.hidden = false;
        bitcoinSection.hidden = true;
    } else if (selectValue === "bitcoin") {
        creditCardSection.hidden = true;
        paypalSection.hidden = true;
        bitcoinSection.hidden = false;
    } else {
        creditCardSection.hidden = false;
        paypalSection.hidden = true;
        bitcoinSection.hidden = true;
    }
});

// 'SUBMIT' event on 'Form':
form.addEventListener("submit", (e) => {
    // Call the validation check functions
    validator(nameInput, isValidName, e);
    validator(emailInput, isValidEmail, e);
    validator(activitiesCost, isActivityChosen, e);
    // Only if creditcard is selected:
    if (creditCardSection.hidden === false) {
        validator(creditCardInput, isCardNumberValid, e);
        validator(zipCodeInput, isValidZipCode, e);
        validator(cvvCodeInput, isValidCvvCode, e);
    }
});

// 'FOCUS' & 'BLUR' events on 'Activities' checbkoxes:
const activitiesCheckboxes = document.querySelectorAll("#activities input");
for (let i = 0; i < activitiesCheckboxes.length; i++) {
    activitiesCheckboxes[i].addEventListener("focus", (e) => {
        e.target.parentNode.classList.add("focus");
    });
    activitiesCheckboxes[i].addEventListener("blur", (e) => {
        e.target.parentNode.classList.remove("focus");
    });
}

// 'KEYUP' event on 'Name' input (-> real-time error message)
creditCardInput.addEventListener("keyup", (e) => {
    // Validate credit card infos:
    const cardNumberRegex = /^[\d]{13,16}$/;
    if (!cardNumberRegex.test(creditCardInput.value)) {
        creditCardInput.parentElement.classList.add("not-valid");
        creditCardInput.parentElement.classList.remove("valid");
        // Show the hint:
        document.querySelector("#cc-hint").style.display = "initial";

        // -> Check for different validation problems
        // --> Check if all are digits
        const digitRegex = /^[\d]{1,}$/;
        if (creditCardInput.value === "") {
            document.querySelector("#cc-hint").textContent = "Credit card number must be between 13 - 16 digits";
        } else if (!digitRegex.test(creditCardInput.value)) {
            document.querySelector("#cc-hint").textContent = "All characters must be digits";
        } else {
            document.querySelector("#cc-hint").textContent = "You need between 13 - 16 digits";
        }
    } else {
        creditCardInput.parentElement.classList.add("valid");
        creditCardInput.parentElement.classList.remove("not-valid");
        document.querySelector("#cc-hint").style.display = "none";
    }
});
