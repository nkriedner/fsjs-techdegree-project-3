// Element Selectors:
const nameInput = document.querySelector("#name");
const jobRoleSelect = document.querySelector("#title");
const otherJobRole = document.querySelector("#other-job-role");
const designSelect = document.querySelector("#design");
const colorSelect = document.querySelector("#color");
const activitiesSection = document.querySelector("#activities");

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
