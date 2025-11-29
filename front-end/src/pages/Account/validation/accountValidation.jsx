export function validateAccountSettings(settings, dummyData) {

    // Arrays for data entry.
    const { username, email, phone_no, password, verify_password } = settings;
    const { dummyUsernames, dummyEmails, dummyPhones, dummyPassword } = dummyData;

    // ==================== USERNAME VALIDATION ==================== //

    // Check if the entered username is empty.
    if (!username.trim()) {
        return "Your username cannot be blank!";
    }

    // Check if the username is already taken.
    if (dummyUsernames.some(user => user.toLowerCase() === username.trim().toLowerCase())) {
        return "This username is already taken! Please enter another.";
    }

    // Check if the username is longer than 11 characters.
    if (username.trim().length > 11)
        return "Usernames cannot be longer than 11 characters!";

    // Check if the username is less than 3 characters.
    if (username.trim().length < 3)
        return "Usernames must be at least 3 characters!";

    // Check if the username contains anything other than letters, numbers, or underscores.
    const validCharacters = /^[A-Za-z0-9_]+$/;
    if (!validCharacters.test(username))
        return "Your username can only contain letters, numbers, and underscores.";

    // Check if the username contains at least one letter or number (cannot be only underscores).
    const containsLettersOrNumbers = /^(?=.*[A-Za-z\d])/;
    if (!containsLettersOrNumbers.test(username))
        return "Your username cannot only contain underscores!";


    // ==================== EMAIL VALIDATION ==================== //

    // Check if the entered email is empty.
    if (!email.trim()) {
        return "Your email cannot be blank!";
    }

    // Check if the entered email is already associated with an account.
    if (dummyEmails.some(e => e.toLowerCase() === email.trim().toLowerCase())) {
        return "This email is already in use!";
    }

    // Check if the entered email is valid (within reason).
    const validEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!validEmail.test(email)) {
        return "Your email is invalid. Please check and try again.";
    }


    // ==================== PHONE NUMBER VALIDATION ==================== //

    // Only validate if the field is not blank (user has chosen not to have an associated phone number).
    if (phone_no.trim() !== "") {

        // Check if the entered phone number is already associated with an account.
        if (dummyPhones.includes(phone_no.trim())) {
            return "This phone number is already taken!";
        }

        // Check if the entered phone number is a valid UK phone number (within reason).
        const validPhoneNumber = /^((0|44|\+44|\+44\s*\(0\)|\+44\s*0)\s*)?7(\s*[0-9]){9}$/;
        if (!validPhoneNumber.test(phone_no)) {
            return "Your phone number is not a valid UK phone number.";
        }
    }


    // ==================== UPDATE PASSWORD VALIDATION ==================== //

    // Only validate if the field is not blank (user has chosen not to update their current password).
    if (password.trim() !== "") {

        // Check if the password contains any white spaces.
        if (/\s+/.test(password)) {
            return "Your password cannot contain spaces!";
        }

        // Check if the password is at least 8 characters long.
        if (password.trim().length < 8) {
            return "Your password must be at least 8 characters long.";
        }

        // Check if the password contains at least one uppercase letter.
        if (!/[A-Z]/.test(password)) {
            return "Your password must contain at least one uppercase letter!";
        }

        // Check if the password contains at least one special character.
        const specialChar = /[!@#$%^&*(),.?":{}|<>_\-+=/\[\]\\;'`~]/;
        if (!specialChar.test(password)) {
            return "Your password must contain at least one special character!";
        }

        // Check if the new password is the same as the current password.
        if (password.trim() === dummyPassword) {
            return "Your new password cannot be the same as your old password.";
        }
    }


    // ==================== VERIFY CURRENT PASSWORD ==================== //
    if (verify_password !== dummyPassword) {
        return "Your current password is incorrect.";
    }

    // ==================== SUCCESSFULLY VALIDATED ==================== //
    return null; 
}
