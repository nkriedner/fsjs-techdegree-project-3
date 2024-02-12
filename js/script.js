// Element Selectors:
const nameInput = document.querySelector("#name");
const jobRoleSelect = document.querySelector("#title");
const otherJobRole = document.querySelector("#other-job-role");
const designSelect = document.querySelector("#design");
const colorSelect = document.querySelector("#color");

// When page loads name input has focus:
nameInput.focus();

// Hide 'Other Job' input on default:
otherJobRole.hidden = true;

// Event listener for 'Job Role' input:
jobRoleSelect.addEventListener("change", (e) => {
    const selectValue = e.target.value;

    // Show hidden 'Other Job' input when 'Other' option is selected:
    if (selectValue === "other") {
        otherJobRole.hidden = false;
        otherJobRole.focus();
    }
});

// Disable color select by default:
colorSelect.disabled = true;

// Event listener for 'Desgin' select:
designSelect.addEventListener("change", (e) => {
    const selectValue = e.target.value;
    // console.log(selectValue);

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
