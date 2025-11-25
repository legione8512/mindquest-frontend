import { useState, useRef } from "react";
import "./Account.css";

import DefaultImage from "../../assets/example_profile_picture.jpg";
import SiteSettingsForm from "./SiteSettings_Form";
import AccountSettingsForm from "./AccountSettings_Form";

export default function Account() {

    // ==================== EDITING PROFILE PICTURE ==================== //
    const [profileImage, setProfileImage] = useState(DefaultImage);
    const fileUploadRef = useRef(null);

    // Opening file explorer when button is pressed
    const openFileExplorer = (e) => {
        e.preventDefault();
        fileUploadRef.current.click();
    }

    // Handler for changing the image
    const handleImageChange = () => {
        const uploadedFile = fileUploadRef.current.files[0];
        const cachedURL = URL.createObjectURL(uploadedFile);
        setProfileImage(cachedURL);
    };


    // ==================== SWITCHING FORMS ==================== //
    const [currentForm, setCurrentForm] = useState('accountSettings')

    // Form switching handler.
    const switchForm = (formName) => {
        setCurrentForm(formName);
    }


    // ====================  SITE SETTINGS FORM ==================== //

    // Default values for demo purposes.
    const [values, setValues] = useState({
        theme: 'Default',
        notification: 'None',
        timeZone: 'London Time'
    });

    // Change handler to change dropdown values.
    const setSiteSetting = field => {
        return ({ target: { value } }) => {
            setValues(prevValue => ({ ...prevValue, [field]: value }));
        }
    };

    // Submit button.
    const onSubmit = (e) => {
        e.preventDefault();
        const { theme, notification, timeZone } = values;
        alert(`Your site settings were successfully updated!\n\nTheme: ${theme}\nNotification Preferences: ${notification}\nTimeZone: ${timeZone}`);
    };

    // Cancel button.
    const onCancel = (e) => {
        e.preventDefault();

        setValues({ // TODO: Return to previously entered values instead of returning to default.
            theme: 'Default',
            notification: 'None',
            timeZone: 'London Time'
        });
        alert("Changes cancelled, no settings changed.")
    }

    // Logout button. [Demo only]
    const onLogOut = () => {
        alert("Logging user out...");
    }


    // ====================  ACCOUNT PAGE RENDER ==================== //
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

                    {/* Profile Box */}
                    <section className="profile_box">

                        <section className="profile_box_top">

                            {/* Profile picture */}
                            <img src={profileImage} alt="Profile Photo" />

                            {/* Upload image button */}
                            <button title="Change your Profile Photo" onClick={openFileExplorer}>
                                <i class="fa fa-plus-circle"></i>
                            </button>

                            {/* Upload file button (hidden) */}
                            <input
                                type="file"
                                ref={fileUploadRef}
                                onChange={handleImageChange}
                                hidden
                            />

                            {/* Username and Level */}
                            <section className="profile_text_box">
                                <h3>AdamD6567</h3>
                                <p>Level 1</p>
                            </section>
                        </section>

                        {/* Points and Streaks section */}
                        <section className="profile_box_bottom">
                            <section className="points_section">
                                <h3>My Points</h3>
                                <h3>0</h3>
                            </section>
                            <section className="streak_section">
                                <h3>My Streak</h3>
                                <h3>0d</h3>
                            </section>
                        </section>
                    </section>

                    {/* Form change + Logout buttons */}
                    <section className="change_form_buttons">

                        {/* Account Settings Button */}
                        <button
                            className={currentForm === "accountSettings" ? "active" : ""}
                            onClick={() => switchForm("accountSettings")}>
                            Account Settings
                        </button>

                        {/* Site Settings Button */}
                        <button
                            className={currentForm === 'siteSettings' ? 'active' : ''}
                            onClick={() => switchForm('siteSettings')}>
                            Site Settings
                        </button>

                        {/* Logout Settings Button */}
                        <button onClick={(onLogOut)}>Logout</button>
                    </section>
                </section>

                {/* RIGHT SIDE: Forms */}
                <section className="site_settings_right">
                    {currentForm === 'accountSettings' && <AccountSettingsForm />}
                    {currentForm === 'siteSettings' &&
                        <SiteSettingsForm
                            values={values} 
                            setSiteSetting={setSiteSetting} 
                            onSubmit={onSubmit}
                            onCancel={onCancel} />}
                </section>

            </section>
        </>
    )
}