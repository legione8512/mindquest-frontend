import { useState } from "react";
import "./Account.css";

import DefaultImage from "../../assets/example_profile_picture.jpg";
import SiteSettingsForm from "./SiteSettings_Form";
import AccountSettingsForm from "./AccountSettings_Form";
import ProfileBox from "./ProfileBox";
import FormNavigation from "./FormNavigation";

export default function Account() {

    // ==================== CONSTANTS ==================== //
    const [profileImage, setProfileImage] = useState(DefaultImage);
    const [username, setUsername] = useState('AdamD6567');
    const [userLevel, setUserLevel] = useState('1');
    const [currentForm, setCurrentForm] = useState('accountSettings')

    // Default site setting values [DEMO PURPOSES]
    const [userSiteSettings, setUserSiteSettings] = useState({
        theme: 'MindQuest Default',
        notification: 'None',
        timeZone: 'London Time'
    });

    // ==================== SWITCHING FORMS ==================== //

    // Form switching handler.
    const switchForm = (formName) => {
        setCurrentForm(formName);
    }

    // ====================  SITE SETTINGS FORM ==================== //

    // Change handler to change dropdown values.
    const setSiteSetting = field => {
        return ({ target: { value } }) => {
            setUserSiteSettings(prevValue => ({ ...prevValue, [field]: value }));
        }
    };

    // Submit button.
    const onSubmit = (e) => {
        e.preventDefault();
        const { theme, notification, timeZone } = userSiteSettings;
        alert(`Your site settings were successfully updated!\n\nTheme: ${theme}\nNotification Preferences: ${notification}\nTimeZone: ${timeZone}`);
    };

    // Cancel button.
    const onCancel = (e) => {
        e.preventDefault();

        setUserSiteSettings({ // TODO: Return to previously entered values instead of returning to default.
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
                    {currentForm === 'accountSettings' && <AccountSettingsForm />}
                    {currentForm === 'siteSettings' &&
                        <SiteSettingsForm
                            userSiteSettings={userSiteSettings}
                            setSiteSetting={setSiteSetting}
                            onSubmit={onSubmit}
                            onCancel={onCancel} />}
                </section>

            </section>
        </>
    )
}