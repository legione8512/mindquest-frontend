import React, { useState } from "react";
import "./Account.css";
import profile from "../../assets/example_profile_picture.jpg";
import SiteSettingsForm from "./SiteSettings_Form";

export default function Account() {

    // ***************  SITE SETTINGS FORM DROPDOWN LOGIC *************** //

    // Default values for demo purposes.
    const [values, setValues] = useState({
        theme: 'Default',
        notification: 'None',
        timeZone: 'London Time'
    });

    // Change handler to change dropdown values.
    const set = name => {
        return ({ target: { value } }) => {
            setValues(oldValues => ({ ...oldValues, [name]: value }));
        }
    };

    // Submit button.
    const onSubmit = (event) => {
        event.preventDefault(); // Prevent default submission
        const { theme, notification, timeZone } = values;
        alert(`Your site settings were successfully updated!\n\nTheme: ${theme}\nNotification Preferences: ${notification}\nTimeZone: ${timeZone}`);
    };

    // TODO: ADD LOGIC FOR SWAPPING BETWEEN FORMS HERE.

    return (
        <>
            {/* BANNER */}
            <section className="site_settings_banner">
                <h1>Site Settings</h1>
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
                        <button>Site Settings</button>
                        <button>Account Settings</button>
                        <button>Logout</button>
                    </section>
                </section>

                {/* RIGHT SIDE SECTION: FORMS */}
                <section className="site_settings_right">
                        <SiteSettingsForm values={values} set={set} onSubmit={onSubmit} />
                </section>
            </section>
        </>
    )
}