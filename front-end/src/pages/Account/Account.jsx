import { useState } from "react";
import "./Account.css";

import DefaultImage from "../../assets/example_profile_picture.jpg";
import SiteSettingsForm from "./SiteSettings_Form";
import AccountSettingsForm from "./AccountSettings_Form";
import ProfileBox from "./ProfileBox";
import FormNavigation from "./FormNavigation";

export default function Account() {

    // ======================================== PROFILE BOX STATE LOGIC ======================================== //
    const [profileImage, setProfileImage] = useState(DefaultImage);
    const [username, setUsername] = useState('AdamD6567');
    const [userLevel, setUserLevel] = useState('1');
    const dummyUserNames = ["Adam", "Marius", "Harshil", "Alex", "Aayisha"]; // Dummy usernames for other users (DEMO PURPOSES)
    const dummyEmails = ["Adam@brunel.ac.uk", "Marius@brunel.ac.uk", "Harshil@brunel.ac.uk", "Alex@brunel.ac.uk", "Aayisha@brunel.ac.uk"]; // Dummy emails for other users (DEMO PURPOSES).
    


    // ======================================== SWITCHING FORMS ======================================== //
    const [currentForm, setCurrentForm] = useState('accountSettings')

    // Switching between forms functionality.
    const switchForm = (formName) => {
        setCurrentForm(formName);
    }

    // Logout button alert. [DEMO PURPOSES]
    const onLogOut = () => {
        alert("Logging user out...");
    }



    // ========================================  SITE SETTINGS FORM ======================================== //

    // Default state settings [DEMO PURPOSES]
    const [userSiteSettings, setUserSiteSettings] = useState({
        theme: 'MindQuest Default',
        notification: 'None',
        timeZone: 'London Time'
    });

    // Tracks the state of the previously submitted settings [DEMO PURPOSES]
    const [savedSiteSettings, setSavedSiteSettings] = useState({
        userSiteSettings
    });

    // Change handler for dropdown values.
    const setSiteSetting = field => {
        return ({ target: { value } }) => {
            setUserSiteSettings(prevValue => ({ ...prevValue, [field]: value }));
        }
    };

    // Site settings form submit button.
    const onSubmitSiteSettings = (e) => {
        e.preventDefault();
        const { theme, notification, timeZone } = userSiteSettings; // Update current settings [DEMO PURPOSES]
        setSavedSiteSettings(userSiteSettings); // Save the current settings temporarily [DEMO PURPOSES]
        alert(`Your site settings were successfully updated!\n\nTheme: ${theme}\nNotification Preferences: ${notification}\nTimeZone: ${timeZone}`);
    };

    // Site settings form cancel button.
    const onCancelSiteSettings = (e) => {
        e.preventDefault();
        setUserSiteSettings(savedSiteSettings); // Reverts to previous settings [DEMO PURPOSES]
        alert("Changes cancelled, no settings changed.")
    }



    // ========================================  ACCOUNT SETTINGS FORM ======================================== //
    const [accountSettings, setAccountSettings] = useState({
        username: "AdamD6567",
        email: "2425290@brunel.ac.uk",
        phone_no: "07827753053",
        password: "Password123!",
        verify_password: ""
    })

    // Change handler for input values.
    const setAccountSetting = field => {
        return ({ target: { value } }) => {
            setAccountSettings(prevValue => ({ ...prevValue, [field]: value }));
        };
    };

    // Site settings form submit button.
    const onSubmitAccountSettings = (e) => {
        e.preventDefault();

        // USERNAME VALIDATION //

        // Check if the entered username is empty
        if (!accountSettings.username.trim()) {
            alert("Your username cannot be blank!")
            return;
        }

        // Check if the entered username is already in the "database"
        if (dummyUserNames.some(dataBaseUsername => dataBaseUsername.toLowerCase() === accountSettings.username.trim().toLowerCase())) {
            alert("This username is already taken! Please enter another.");
            return;
        }

        // Check if the username is greater than 12 characters.
        if (accountSettings.username.trim().length > 12) {
            alert("Usernames cannot be longer than 12 characters! Please enter another.")
            return;
        }

        // Check if the username is less than 3 characters.
        if (accountSettings.username.trim().length < 3) {
            alert("Usernames must be at least 3 characters! Please enter another.")
            return;
        }

        // Check if the username contains anything other than letters, numbers, or underscores.
        const usernamePattern = /^(?=.*[A-Za-z\d_])/;
        if (!usernamePattern.test(accountSettings.username)) {
            alert("Your username can only contain letters, numbers, and underscores. No spaces or special characters are allowed. Please enter another.")
            return;
        }

        // Check if the username contains atleast one letter or number.
        const onlyUnderscores = /^(?=.*[A-Za-z\d])/; 
        if (!onlyUnderscores.test(accountSettings.username)) {
            alert("Your username cannot only contain underscores! It must contain atleast one letter or number. Please enter another.")
            return;
        }


        // Update current values if all validation checks passed.
        const { username, email, phone_no, password, verify_password } = accountSettings;
        setUsername(accountSettings.username); // Update username in profile box AFTER submit.
        alert("Your account settings have been updated!");
    };



    // ========================================  ACCOUNT PAGE RENDER ======================================== //
    return (
        <>
            {/* BANNER */}
            <section className="account_page_banner">
                <h1> {currentForm === 'accountSettings' ? 'Account Settings' : 'Site Settings'} </h1>
            </section>

            {/* PAGE LAYOUT */}
            <section className="account_page_main">

                {/* LEFT SIDE SECTION: Mini Profile + Navigation Buttons */}
                <section className="account_page_left">

                    <ProfileBox
                        profileImage={profileImage}
                        setProfileImage={setProfileImage}
                        username={username}
                        userLevel={userLevel}
                    />

                    <FormNavigation
                        currentForm={currentForm}
                        switchForm={switchForm}
                        onLogOut={onLogOut} />

                </section>

                {/* RIGHT SIDE: Forms */}
                <section className="account_page_right">

                    {currentForm === 'accountSettings' &&
                        <AccountSettingsForm
                            accountSettings={accountSettings}
                            setAccountSetting={setAccountSetting}
                            onSubmit={onSubmitAccountSettings}
                        />}

                    {currentForm === 'siteSettings' &&
                        <SiteSettingsForm
                            userSiteSettings={userSiteSettings}
                            setSiteSetting={setSiteSetting}
                            onSubmit={onSubmitSiteSettings}
                            onCancel={onCancelSiteSettings} />}
                            
                </section>

            </section>
        </>
    )
}