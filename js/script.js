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

    // Loop through activities and disable the time conflicting ones
    const activitiesInputs = document.querySelectorAll("#activities input");
    for (let i = 0; i < activitiesInputs.length; i++) {
        // Check if activitiesInput has the same date and time
        console.log(e.target.checked);
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
    const nameInput = document.querySelector("#name");
    const nameRegex = /^[^\d ]+$/; // match if string has at least 1 non digit character.
    if (!nameRegex.test(nameInput.value)) {
        e.preventDefault();
        nameInput.parentElement.classList.add("not-valid");
        nameInput.parentElement.classList.remove("valid");
        // Show the hint:
        document.querySelector("#name-hint").style.display = "initial";
    } else {
        nameInput.parentElement.classList.add("valid");
        nameInput.parentElement.classList.remove("not-valid");
        document.querySelector("#name-hint").style.display = "none";
    }
    // ---> Email validation
    const emailInput = document.querySelector("#email");
    const emailRegex = /^[^@]+@[^@.]+\.[a-z]+$/i;
    if (!emailRegex.test(emailInput.value)) {
        e.preventDefault();
        emailInput.parentElement.classList.add("not-valid");
        emailInput.parentElement.classList.remove("valid");
        // Show the hint:
        document.querySelector("#email-hint").style.display = "initial";
    } else {
        emailInput.parentElement.classList.add("valid");
        emailInput.parentElement.classList.remove("not-valid");
        document.querySelector("#email-hint").style.display = "none";
    }
    // ---> Activities at least 1 selected (totalPrice must be more than 0)
    if (totalPrice === 0) {
        activitiesSection.classList.add("not-valid");
        activitiesSection.classList.remove("valid");

        document.querySelector("#activities-hint").style.display = "initial";
        e.preventDefault();
    } else {
        activitiesSection.classList.add("valid");
        activitiesSection.classList.remove("not-valid");
        document.querySelector("#activities-hint").style.display = "none";
    }
    // ---> Credit card (see info)
    // If creditcard is selected:
    if (creditCardSection.hidden === false) {
        // Validate credit card infos:
        // -> card number
        const creditCardInput = document.querySelector("#cc-num");
        const cardNumberRegex = /^[\d]{13,16}$/;
        if (!cardNumberRegex.test(creditCardInput.value)) {
            creditCardInput.parentElement.classList.add("not-valid");
            creditCardInput.parentElement.classList.remove("valid");
            // Show the hint:
            document.querySelector("#cc-hint").style.display = "initial";
            e.preventDefault();
        } else {
            creditCardInput.parentElement.classList.add("valid");
            creditCardInput.parentElement.classList.remove("not-valid");
            document.querySelector("#cc-hint").style.display = "none";
        }
        // -> zip code
        const zipCodeInput = document.querySelector("#zip");
        const zipCodeRegex = /^[\d]{5}$/;
        if (!zipCodeRegex.test(zipCodeInput.value)) {
            zipCodeInput.parentElement.classList.add("not-valid");
            zipCodeInput.parentElement.classList.remove("valid");
            // Show the hint:
            document.querySelector("#zip-hint").style.display = "initial";
            e.preventDefault();
        } else {
            zipCodeInput.parentElement.classList.add("valid");
            zipCodeInput.parentElement.classList.remove("not-valid");
            document.querySelector("#zip-hint").style.display = "none";
        }
        // -> cvv code
        const cvvCodeInput = document.querySelector("#cvv");
        const cvvCodeRegex = /^[\d]{3}$/;
        if (!cvvCodeRegex.test(cvvCodeInput.value)) {
            cvvCodeInput.parentElement.classList.add("not-valid");
            cvvCodeInput.parentElement.classList.remove("valid");
            // Show the hint:
            document.querySelector("#cvv-hint").style.display = "initial";
            e.preventDefault();
        } else {
            cvvCodeInput.parentElement.classList.add("valid");
            cvvCodeInput.parentElement.classList.remove("not-valid");
            document.querySelector("#cvv-hint").style.display = "none";
        }
    }
});

// Event Listener for activities focus & blur
const activitiesCheckboxes = document.querySelectorAll("#activities input");
for (let i = 0; i < activitiesCheckboxes.length; i++) {
    activitiesCheckboxes[i].addEventListener("focus", (e) => {
        // console.log("focus");
        // console.log(e.target);
        e.target.parentNode.classList.add("focus");
    });
    activitiesCheckboxes[i].addEventListener("blur", (e) => {
        e.target.parentNode.classList.remove("focus");
    });
}
