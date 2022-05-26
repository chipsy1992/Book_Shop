const form = document.getElementById("form");
const firstName = document.getElementById("first-name");
const surname = document.getElementById("surname");
const address = document.getElementById("address");
const houseNumber = document.getElementById("house-number");
const flatNumber = document.getElementById("flat-number");
const btn = document.querySelector("#btn");
let deliveryDate = document.getElementById("delivery_date");

// Show input error message
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = "form-control error";
  const small = formControl.querySelector("small");
  small.innerText = message;
}

// Show success outline
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}

// Check required fields
function checkRequired(inputArr) {
  inputArr.forEach(function (input) {
    if (input.value.trim() === "") {
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
}

function allLetter(inputtxt) {
  var letters = /^[A-Za-z]+$/;
  if (inputtxt.value.match(letters)) {
    return true;
  } else {
    showError(inputtxt, `Letters only`);
    return false;
  }
}

function numbersOnly(numbers) {
  if (
    numbers.value.replace(/[^0-9.]/g, "").replace(/(\..*?)\..*/g, "$1") &&
    numbers.value > 0
  ) {
    showSuccess(numbers);
    return true;
  } else {
    showError(numbers, `numbers only`);
  }
}

function numbersOnlyDash(numbers) {
  if (
    numbers.value.replace(/[^0-9.]/g, "").replace(/(\..*?)\..*/g, "$1") &&
    numbers.value > 0
  ) {
    showSuccess(numbers);
    return true;
  } else {
    showError(numbers, `numbers only`);
  }
}

// Check input length
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} must be at least ${min} characters`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} must be less than ${max} characters`
    );
  } else {
    showSuccess(input);
  }
}

let txt = document.querySelectorAll('[type="text"]');
let radioCash = document.getElementById("cash");
let radioCard = document.getElementById("card");

for (let i = 0; i < txt.length; i++) {
  txt[i].onblur = () => {
    if (
      !(txt[0].value == "") &&
      !(txt[1].value == "") &&
      !(txt[2].value == "") &&
      !(txt[3].value == "") &&
      !(txt[4].value == "")
    ) {
      radioCash.addEventListener("click", () => {
        radioCash.setAttribute("checked", "");
        btn.removeAttribute("disabled");
        btn.style.cursor = "pointer";
      });
      radioCard.addEventListener("click", () => {
        radioCard.setAttribute("checked", "");
        btn.removeAttribute("disabled");
        btn.style.cursor = "pointer";
      });
    }
  };
}

// Get fieldname
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Event listeners
form.addEventListener("change", function (e) {
  e.preventDefault();

  checkRequired([firstName, surname]);
  checkLength(firstName, 4, 15);
  checkLength(surname, 5, 15);
  checkLength(address, 5, 15);
  allLetter(firstName);
  allLetter(surname);
  numbersOnly(houseNumber);
  numbersOnlyDash(flatNumber);
});

let body = document.querySelector("body");

let modal = document.createElement("div");
modal.className = "modal";
body.append(modal);

let popUpModal = document.createElement("div");
popUpModal.className = "popUp-validation";
modal.append(popUpModal);

btn.addEventListener("click", function (e) {
  e.preventDefault();

  popUpModal.innerHTML += `
  <div class="values-container">
    <div class="values-content">
      <h1>Summary</h1>
      <h2>Full Name: ${firstName.value} ${surname.value}</h2>
      <h3>Address: ${address.value}</h3>
      <p>House Number: ${houseNumber.value}</p>
      <p>Flat Number: ${flatNumber.value}</p>
    </div>
    <div>
      <span onclick="removePopUp(this)" class="close"><img src="./icons/xmark-solid.svg" alt=""></span>
    </div>
  </div>
`;
  popUpModal.style.display = "block";
  btn.setAttribute("disabled", "");
});

let overlay = document.createElement("div");
overlay.className = "overlay";
modal.append(overlay);

function removePopUp(element) {
  let content = element.closest(".values-container");
  let popUp = document.querySelector(".popUp-validation");
  popUp.style.display = "none";
  content.remove();
  btn.removeAttribute("disabled");
}

// let today = new Date().toLocaleDateString();

// console.log(today);

let yourDate = new Date();
yourDate.toISOString().split("T")[0];
const offset = yourDate.getTimezoneOffset();
yourDate = new Date(yourDate.getTime() - offset * 60 * 1000 * 12);
deliveryDate.setAttribute("min", yourDate.toISOString().split("T")[0]);
