document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');
    const errorText = document.getElementById('errorText');

    form.addEventListener('submit', function (event) {
        errorText.innerHTML = '';
        event.preventDefault();

        const fullName = form.querySelector('#fullName').value.trim();
        const dob = form.querySelector('#dob').value.trim();
        const gender = form.querySelector('input[name="gender"]:checked');
        const email = form.querySelector('#email').value.trim();
        const phone = form.querySelector('#phone').value.trim();
        const password = form.querySelector('#password').value.trim();
        const confirmPassword = form.querySelector('#confirmPassword').value.trim();
        let hasErrors = false;

        // Validation functions
        function showError(message) {
            errorText.innerHTML = message;
            hasErrors = true;
        }

        function validatePhoneNumber(phone) {
            return /^[0-9]{10}$/.test(phone);
        }

        function validatePasswordComplexity(password) {
            return /(?=.*[A-Z])(?=.*[0-9])(?=.*[&$#@]).{7,}/.test(password);
        }

        function validateEmailFormat(email) {
            return /^[a-zA-Z0-9._-]+@[a-zA-Z]+\.[a-zA-Z]{2,3}$/.test(email);
        }

        function validateDateOfBirth(dob) {
            const currentDate = new Date();
            const selectedDate = new Date(dob);
            const minDOB = new Date(currentDate.getFullYear() - 18, currentDate.getMonth(), currentDate.getDate());

            return selectedDate <= currentDate && selectedDate <= minDOB;
        }

        // Perform validations
        if (!fullName || !dob || !gender || !email || !phone || !password || !confirmPassword) {
            showError('All fields are required.');
            return;
        }

        if (!validateDateOfBirth(dob)) {
            showError('You should be atleast 18 years old in order to register');
            return;
        }

        if (!validatePhoneNumber(phone)) {
            showError('Phone number must be 10 digits.');
            return;
        }

        if (!validatePasswordComplexity(password)) {
            showError('Password must be at least 7 characters, including one uppercase letter, one digit, and one special character (&,$,#@).');
            return;
        }

        if (password !== confirmPassword) {
            showError('Password and Confirm Password do not match.');
            return;
        }

        if (!validateEmailFormat(email)) {
            showError('Invalid email format.');
            return;
        }

        // If no errors, submit the form
        if (!hasErrors) {
            form.submit();
        }
    });
});
