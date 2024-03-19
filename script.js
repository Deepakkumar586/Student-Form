const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const passwordConfirmation = document.getElementById("confirm-password");
const btn = document.getElementById("btn");
const cards = document.getElementById("cards");
const course = document.getElementById("course");
const college = document.getElementById("college");
const year = document.getElementById("year");
const contactnumber = document.getElementById("contactnumber");

// Function to update UI from local storage
const updateUIFromLocalStorage = () => {
  const dataKeys = ["name", "email", "college", "course", "year", "contact"];
  const data = {};
  console.log("Data",data)

  dataKeys.forEach(key => {
    const value = localStorage.getItem(key);
    console.log("Access value: ",value)
    if (value) {
      data[key] = value;
    }
  });

  if (Object.keys(data).length === dataKeys.length) {
    cards.innerHTML += `
      <div class="card">
        <div class="card-body">
          <p><span class="name">Name : </span>${data.name}</p>     
          <p class="email"><span class="name">Email : </span>${data.email}</p> 
          <p class="course"><span class="name">Course : </span>${data.course}</p> 
          <p class="college"><span class="name">College : </span>${data.college}</p> 
          <p class="year"> <span class="name">Year : </span>${data.year}</p> 
          <p class="contactnumber"><span class="name">Contact No. : </span>${data.contact}</p> 
        </div>
      </div>`;
  }
};

// Call the function to update UI from local storage
updateUIFromLocalStorage();

// Event listener for form submission
form.addEventListener("submit", (e) => {
  e.preventDefault();
  validateInput();
});

// Function to validate input
const validateInput = () => {
  const usernameValue = username.value.trim();
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();
  const passwordConfirmationValue = passwordConfirmation.value.trim();
  const collegeValue = college.value.trim();
  const courseValue = course.value.trim();
  const yearValue = year.value.trim();
  const contactnumberValue = contactnumber.value.trim();

  // Validation logic for each input
  validateField(username, usernameValue === "", "Username is required*");
  validateField(email, emailValue === "" || !isValidEmail(emailValue), "Invalid email address");
  validateField(course, courseValue === "", "Course name is required*");
  validateField(college, collegeValue === "", "College name is required*");
  validateField(year, yearValue === "", "Year is required*");
  validateField(contactnumber, contactnumberValue === "", "Contact number is required*");
  validateField(password, passwordValue === "", "Password is required*");
  validateField(passwordConfirmation, passwordConfirmationValue === "" || passwordConfirmationValue !== passwordValue, "Passwords do not match or invalid");

  localStorage.setItem("name", usernameValue);
  localStorage.setItem("email", emailValue);
  localStorage.setItem("college", collegeValue);
  localStorage.setItem("course", courseValue);
  localStorage.setItem("year", yearValue);
  localStorage.setItem("contact", contactnumberValue);

  // Clear the form when we successfully submit on button
  form.reset();
  updateUIFromLocalStorage(); // Update UI with new data
};

// Function to validate a field and set error/success styles
const validateField = (field, condition, errorMessage) => {
  if (condition) {
    setError(field, errorMessage);
  } else {
    setSuccess(field);
  }
};

// Function to set error message and styles
const setError = (el, message) => {
  const inputControl = el.parentElement;
  const errorDisplay = inputControl.querySelector(".error");
  errorDisplay.innerText = message;
  inputControl.classList.add("error");
  inputControl.classList.remove("success");
};

// Function to clear error message and set success styles
const setSuccess = (el) => {
  const inputControl = el.parentElement;
  const errorDisplay = inputControl.querySelector(".error");
  errorDisplay.innerText = "";
  inputControl.classList.add("success");
  inputControl.classList.remove("error");
};

// Function to validate email format
const isValidEmail = (email) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};
