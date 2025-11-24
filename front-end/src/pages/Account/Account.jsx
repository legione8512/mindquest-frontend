import { useState } from "react";
import "./Account.css";
import profile from "../../assets/example_profile_picture.jpg";
import SiteSettingsForm from "./SiteSettings_Form";
import AccountSettingsForm from "./AccountSettings_Form";

export default function Account() {

    // ***************  SITE SETTINGS FORM DROPDOWN LOGIC *************** //

    // Default values for demo purposes.
    const [values, setValues] = useState({
        theme: 'Default',
        notification: 'None',
        timeZone: 'London Time'
    });

    // Change handler to change dropdown values.
    const setSiteSetting = name => {
        return ({ target: { value } }) => {
            setValues(oldValues => ({ ...oldValues, [name]: value }));
        }
    };

    // Submit button [FOR DEMO PURPOSES]
    const onSubmit = (event) => {
        event.preventDefault(); // Prevent refresh of page.
        const { theme, notification, timeZone } = values;
        alert(`Your site settings were successfully updated!\n\nTheme: ${theme}\nNotification Preferences: ${notification}\nTimeZone: ${timeZone}`);
    };

    // Cancel button [FOR DEMO PURPOSES] ///////////////////////////////////////////////// TODO: Add functionality that reverts to previous submitted values, not default.
    const onCancel = (event) => {
        event.preventDefault(); // Prevent refresh of page.

        // Reset the values to default (in practice, this will be the previous values entered)
        setValues({
            theme: 'Default',
            notification: 'None',
            timeZone: 'London Time'
        });
        alert("Changes cancelled, no settings changed.")
    }

    // Logout button [FOR DEMO PURPOSES]
    const onLogOut =() => {
        alert("Logging user out...");
    }

    // State to handle forms
    const [currentForm, setcurrentForm] = useState('accountSettings')

    // Form button click handler.
    const handleFormButtonClick = (form) => {
        setcurrentForm(form);
    }

    return (
        <>
            {/* BANNER */}
            <section className="site_settings_banner">
                <h1>{currentForm === 'accountSettings' ? 'Account Settings' : 'Site Settings'}</h1>
            </section>

            {/* ACCOUNT PAGE CONTENT */}
            <section className="account_page_body">

                {/* LEFT SIDE SECTION: PROFILE, POINTS, STREAK, PAGE NAVIGATION BUTTONS */}
                <section className="account_left">

                    {/* Left side box */}
                    <section className="account_box">
                        <section className="account_box_top">
                            <img src={profile} alt="Profile Picture" /> {/* Profile Picture */}
                            <section className="account_text_section"> {/* Username and level */}
                                <h3>AdamD6567</h3>
                                <p>Level 1</p>
                            </section>
                        </section>
                        <section className="account_box_bottom">
                            {/* Points bar */}
                            <section className="Points_section">
                                <h3>My Points</h3>
                                <h3>0</h3>
                            </section>
                            {/* Streak bar */}
                            <section className="Streak_section">
                                <h3>My Streak</h3>
                                <h3>0d</h3>
                            </section>
                        </section>
                    </section>

                    {/* Change form and logout buttons */}
                    <section className="change_page_buttons">
                        <button className={
                            currentForm === 'accountSettings' ? 'active' : ''} 
                            onClick={() => handleFormButtonClick('accountSettings')}>
                            Account Settings
                        </button>
                        <button className={
                            currentForm === 'siteSettings' ? 'active' : ''}
                             onClick={() => handleFormButtonClick('siteSettings')}>
                            Site Settings
                        </button>
                        <button onClick={(onLogOut)}>Logout</button>
                    </section>
                </section>

                {/* RIGHT SIDE SECTION: FORMS */}
                <section className="site_settings_right">
                    {currentForm === 'accountSettings' && <AccountSettingsForm />}
                    {currentForm === 'siteSettings' && <SiteSettingsForm values={values} setSiteSetting={setSiteSetting} onSubmit={onSubmit} onCancel={onCancel} />}
                </section>
            </section>
        </>
    )
}