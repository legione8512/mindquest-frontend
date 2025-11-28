// This is the account page file. The purpose of this page is to allow users to update their data, including
// username, profile picture, email, phone number, password, and site settings. It uses two forms: Account Settings and
// Form settings, which contain different data and can be updated independently via the submit button.

import { useState } from "react";
import "./Account.css";

// Image imports.
import DefaultImage from "../../assets/example_profile_picture.jpg";
import EmptyImage from "../../assets/empty_image.png";

// Form imports.
import AccountSettingsForm from "./AccountSettings_Form";
import SiteSettingsForm from "./SiteSettings_Form";

// Profile box and navigation imports.
import ProfileBox from "./ProfileBox";
import FormNavigation from "./FormNavigation";

// Modal imports
import DeleteAccountModal from "./DeleteAccountModal";

// Validation imports.
import { validateAccountSettings } from "./validation/accountValidation";

export default function Account() {

    // ======================================== PROFILE BOX STATE LOGIC ======================================== //
    const [profileImage, setProfileImage] = useState(DefaultImage);
    const [username, setUsername] = useState('AdamD6567'); // Username Placeholder (DEMO PURPOSES).
    const userLevel = "1"; // Level Placeholder (DEMO PURPOSES).


    // ======================================== SWITCHING FORMS ======================================== //
    const [currentForm, setCurrentForm] = useState('accountSettings')

    // Switch between forms on button click.
    const switchForm = (formName) => {
        setCurrentForm(formName);
    }

    // Log out alert (DEMO PURPOSES)
    const onLogOut = () => {
        alert("Logging user out...");
    }


    // ========================================  ACCOUNT SETTINGS FORM ======================================== //

    // Dummy values (DEMO PURPOSES)
    const dummyUsernames = ["Adam", "Marius", "Harshil", "Alex", "Aayisha"];
    const dummyEmails = ["Adam@brunel.ac.uk", "Marius@brunel.ac.uk", "Harshil@brunel.ac.uk", "Alex@brunel.ac.uk", "Aayisha@brunel.ac.uk"];
    const dummyPhones = ["07115201776", "07289994594", "07530773350", "07523697780", "07457319635"];
    const [dummyPassword, setDummyPassword] = useState("Password123!");

    // Set the default state of the Account form.
    const [accountSettings, setAccountSettings] = useState({
        username: "AdamD6567",
        email: "2425290@brunel.ac.uk",
        phone_no: "07827753053",
        password: "",
        verify_password: ""
    })

    // Tracks previously submitted settings values (DEMO PURPOSES)
    const [savedAccountSettings, setSavedAccountSettings] = useState({
        username: "AdamD6567",
        email: "2425290@brunel.ac.uk",
        phone_no: "07827753053"
    });

    // Change handler when inputting values.
    const setAccountSetting = field => {
        return ({ target: { value } }) => {
            setAccountSettings(prevValue => ({ ...prevValue, [field]: value }));
        };
    };

    // Submit button
    const onSubmitAccountSettings = (e) => {
        e.preventDefault();

        // Validate all fields in the form on submit.
        const error = validateAccountSettings(
            accountSettings,
            {
                dummyUsernames,
                dummyEmails,
                dummyPhones,
                dummyPassword
            }
        );

        // Display an error if there is one.
        if (error) {
            alert(error);
            return;
        }

        // UPDATE USER DATA UPON SUCCESSFUL VALIDATION //
        setUsername(accountSettings.username);

        // Only update dummy password if the user changed it.
        if (accountSettings.password.trim() != "") {
            setDummyPassword(accountSettings.password);
        }

        // Save submitted account settings for tracking (DEMO PURPOSES)
        setSavedAccountSettings({
            username: accountSettings.username,
            email: accountSettings.email,
            phone_no: accountSettings.phone_no
        });

        // Refresh form with new values.
        setAccountSettings({
            username: accountSettings.username,
            email: accountSettings.email,
            phone_no: accountSettings.phone_no,
            password: "",
            verify_password: ""
        });

        alert("Your account settings have been updated!");

    };

    // Cancel button
    const onCancelAccountSettings = (e) => {
        e.preventDefault();

        // Revert to previously submitted settings.
        setAccountSettings({
            ...savedAccountSettings,
            password: "",
            verify_password: ""
        });

        alert("Changes cancelled, no settings changed.")

    }

    // ======================================== DELETE ACCOUNT LOGIC ======================================== //

    // Show the modal box
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    // Delete Account button.
    const deleteAccount = () => {

        // Set all values as empty (DEMO PURPOSES)
        setAccountSettings({
            username: "",
            email: "",
            phone_no: "",
            password: "",
            verify_password: ""
        });
        setUserSiteSettings({
            theme: "",
            notification: "",
            timeZone: ""
        });
        setUsername("");
        setProfileImage(EmptyImage);

        alert("You have deleted your account. Goodbye!");
        setShowDeleteModal(false);

    }



    // ========================================  SITE SETTINGS FORM ======================================== //

    // Default state settings (DEMO PURPOSES)
    const [userSiteSettings, setUserSiteSettings] = useState({
        theme: 'MindQuest Default',
        notification: 'None',
        timeZone: 'London Time'
    });

    // Tracks previously submitted settings values (DEMO PURPOSES)
    const [savedSiteSettings, setSavedSiteSettings] = useState({
        userSiteSettings
    });

    // Change handler when inputting values.
    const setSiteSetting = field => {
        return ({ target: { value } }) => {
            setUserSiteSettings(prevValue => ({ ...prevValue, [field]: value }));
        }
    };

    // Submit button
    const onSubmitSiteSettings = (e) => {
        e.preventDefault();

        // Check if the user has an associated phone number if they want to use SMS notifications.
        if (userSiteSettings.notification == "SMS Only" && savedAccountSettings.phone_no == "" ||
            userSiteSettings.notification === "Email and SMS" && savedAccountSettings.phone_no == "") {

            alert("You do not have an associated phone number. Enter a phone number, or select a different option.")

            return;

        }

        // UPDATE USER DATA UPON SUCCESSFUL VALIDATION //
        const { theme, notification, timeZone } = userSiteSettings;
        setSavedSiteSettings(userSiteSettings);

        alert(`Your site settings were successfully updated!\n\nTheme: ${theme}\nNotification Preferences: ${notification}\nTimeZone: ${timeZone}`);

    };

    // Cancel button.
    const onCancelSiteSettings = (e) => {
        e.preventDefault();

        // Revert to previously submitted settings.
        setUserSiteSettings(savedSiteSettings);

        alert("Changes cancelled, no settings changed.")

    }


    // ========================================  ACCOUNT PAGE RENDER ======================================== //
    return (
        <>
            {/* PAGE BANNER */}
            <section className="account_page_banner">
                <h1> {currentForm === 'accountSettings' ? 'Account Settings' : 'Site Settings'} </h1>
            </section>

            {/* PAGE CONTENT */}
            <section className="account_page">

                {/* LEFT SIDE SECTION: Mini Profile + Navigation/Logout buttons */}
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

                {/* RIGHT SIDE SECTION: Forms */}
                <section className="account_page_right">

                    {currentForm === 'accountSettings' &&
                        <AccountSettingsForm
                            accountSettings={accountSettings}
                            setAccountSetting={setAccountSetting}
                            onSubmit={onSubmitAccountSettings}
                            onCancel={onCancelAccountSettings}
                            onDelete={() => setShowDeleteModal(true)}

                        />}

                    {currentForm === 'siteSettings' &&
                        <SiteSettingsForm
                            userSiteSettings={userSiteSettings}
                            setSiteSetting={setSiteSetting}
                            onSubmit={onSubmitSiteSettings}
                            onCancel={onCancelSiteSettings}
                        />}

                </section>

            </section>

            {/* CONFIRM DELETE MODAL BOX */}
            <DeleteAccountModal
                show={showDeleteModal}
                onHide={() => setShowDeleteModal(false)}
                onConfirm={deleteAccount}
                dummyPassword={dummyPassword}
            />
        </>
    )
}