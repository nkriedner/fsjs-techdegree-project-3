// Element Selectors:
const form = document.querySelector("form");
const nameInput = document.querySelector("#name");
const jobRoleSelect = document.querySelector("#title");
const otherJobRole = document.querySelector("#other-job-role");
const designSelect = document.querySelector("#design");
const colorSelect = document.querySelector("#color");
const activitiesSection = document.querySelector("#activities");
const paymentSelect = document.querySelector("#payment");
const creditCardSection = document.querySelector("#credit-card");
const paypalSection = document.querySelector("#paypal");
const bitcoinSection = document.querySelector("#bitcoin");

let totalPrice = 0; // of all registered activities

// When page loads name input has focus:
nameInput.focus();
// Disable color select by default:
colorSelect.disabled = true;

// Hide 'Other Job' input on default:
otherJobRole.hidden = true;

// Event listener for 'Job Role' input:
jobRoleSelect.addEventListener("change", (e) => {
    const selectValue = e.target.value;

    // Show hidden 'Other Job' input when 'Other' option is selected:
    if (selectValue === "other") {
        otherJobRole.hidden = false;
        otherJobRole.focus();
    } else {
        otherJobRole.hidden = true;
    }
});

// Event listener for 'Design' select:
designSelect.addEventListener("change", (e) => {
    const selectValue = e.target.value;

    // Enable color select
    colorSelect.disabled = false;

    // Loop through the option elements and hide all options not matching the selecValue
    const colorOptions = document.querySelectorAll("#color option");
    // console.log(colorOptions);
    for (let i = 0; i < colorOptions.length; i++) {
        // console.log(colorOptions[i].getAttribute("data-theme"));

        // If the color option is not selected value -> hide it
        if (colorOptions[i].getAttribute("data-theme") !== selectValue) {
            // console.log(colorOptions[i].value);
            colorOptions[i].hidden = true;
        } else {
            // show it:
            colorOptions[i].hidden = false;
            colorSelect.value = colorOptions[i].value; // preselects in every loop -> not ideal solution but temporarily ok
        }
    }
});

// Event listener for 'Register for Activities'
activitiesSection.addEventListener("change", (e) => {
    // Get cost of the target activity
    const activityCost = parseInt(e.target.getAttribute("data-cost"));
    // If an activity is checked, add its cost to totalPrice
    if (e.target.checked) {
        totalPrice += activityCost;
        // Update the totalText
        document.querySelector("#activities-cost").textContent = "Total: $" + totalPrice;
    } else {
        // if it is not checked, subtract its cost from totalPrice
        totalPrice -= activityCost;
        // Update the totalText
        document.querySelector("#activities-cost").textContent = "Total: $" + totalPrice;
    }
});

// Select credit card as default payment method and hide other payment sections
paymentSelect.value = "credit-card";
paypalSection.hidden = true;
bitcoinSection.hidden = true;

// Event listener for paymentSelect
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

// Event listener for form submissions
form.addEventListener("submit", (e) => {
    // e.preventDefault();
    console.log("submission running...");

    // -> Validate each form field
    // ---> Name validation
    const nameValue = document.querySelector("#name").value;
    const nameRegex = /^[^\d ]+$/; // match if string has at least 1 non digit character.
    if (!nameRegex.test(nameValue)) {
        e.preventDefault();
    }
    // ---> Email validation
    const emailValue = document.querySelector("#email").value;
    const emailRegex = /^[^@]+@[^@.]+\.[a-z]+$/i;
    if (!emailRegex.test(emailValue)) {
        e.preventDefault();
    }
    // ---> Activities at least 1 selected (totalPrice must be more than 0)
    if (totalPrice === 0) {
        e.preventDefault();
    }
    // ---> Credit card (see info)
    if (creditCardSection.hidden === false) {
        console.log("credit card infos needed...");

        // e.preventDefault();

        // Validate credit card infos:
        // -> card number
        const creditCardValue = document.querySelector("#cc-num").value;
        const cardNumberRegex = /^[\d]{13,16}$/;
        if (!cardNumberRegex.test(creditCardValue)) {
            e.preventDefault();
        }
        // -> zip code
        const zipCodeValue = document.querySelector("#zip").value;
        const zipCodeRegex = /^[\d]{5}$/;
        if (!zipCodeRegex.test(zipCodeValue)) {
            e.preventDefault();
        }
        // -> cvv code
        const cvvCodeValue = document.querySelector("#cvv").value;
        const cvvCodeRegex = /^[\d]{3}$/;
        if (!cvvCodeRegex.test(cvvCodeValue)) {
            e.preventDefault();
        }
    }
});
