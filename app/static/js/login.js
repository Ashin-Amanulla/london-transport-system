const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});



// to check password mismatch 
let signupForm = document.getElementById("signup-form");
signupForm.addEventListener('submit', (e) => {

	let password = document.getElementById("password").value.trim();
	let repeatPassword = document.getElementById("repeat-password").value.trim();
	if (password !== repeatPassword) {
		alert('Passwords do not match');
		e.preventDefault();
	}

})


