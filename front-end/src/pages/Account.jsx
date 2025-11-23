import React, { useState } from "react";
import "./account.css";
import profile from "../assets/example_profile_picture.jpg";

export default function Account() {

    // Setting default values for each dropdown option for demo purposes.
    const [values, setValues] = useState({
        theme: 'Default',
        notification: 'None',
        timeZone: 'London Time'
    });

    // Change handler for dropdown options.
    const set = name => {
        return ({ target: { value } }) => {
            setValues(oldValues => ({ ...oldValues, [name]: value }));
        }
    };

    // Submit button logic.
    const onSubmit = (event) => {
        event.preventDefault(); // Prevent default submission
            const {theme, notification, timeZone} = values;
            alert(`Your site settings were successfully updated!\n\nTheme: ${theme}\nNotification Preferences: ${notification}\nTimeZone: ${timeZone}`);
        };

    return (
        <>

            {/* Site Settings banner */}
            <section className="site_settings_banner">
                <h1>Site Settings</h1>
            </section>

            {/* Main Body Section */}
            <section className="account_page_body">

                {/* Left side content */}
                <section className="site_settings_left">

                    {/* Box containing profile picture, points, and streak */}
                    <section className="account_box">

                        {/* Top Section of Account box */}
                        <section className="account_box_top">

                            {/* Profile photo */}
                            <section>
                                <img src={profile} alt="Profile Picture" />
                            </section>

                            {/* Username and level */}
                            <section className="account_text_section">
                                <h3>AdamD6567</h3>
                                <p>Level 1</p>
                            </section>
                        </section>

                        {/* Bottom Section of Account box */}
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

                    {/* Buttons to change page or logout */}
                    <section className="change_page_buttons">
                        <button>Site Settings</button>
                        <button>Account Settings</button>
                        <button>Logout</button>
                    </section>
                </section>


                {/* Right side content */}
                <section className="site_settings_right">

                    {/* Form for Site Settings */}
                    <section className="site_settings_form_section">

                        {/* Site Settings Heading and Subheading */}
                        <section className="site_settings_form_top">
                            <h2>Your Settings</h2>
                            <p>Site settings</p>
                        </section>

                        {/* Site Settings dropdown options */}
                        <section className="site_settings_form_bottom">
                            <form className="settings_form" onSubmit={onSubmit}>

                                {/* Theme dropdown */}
                                <h4>Theme:</h4>
                                <select value={values.theme} onChange={set('theme')}>
                                    <option value="MindQuest Default">MindQuest Default</option>
                                    <option value="Light">Light</option>
                                    <option value="Dark">Dark</option>
                                </select>

                                {/* Notification Preferences dropdown */}
                                <h4>Notification Preferences:</h4>
                                <select value={values.notification} onChange={set('notification')}>
                                    <option value="None">None</option>
                                    <option value="Email Only">Email Only</option>
                                    <option value="SMS Only">SMS Only</option>
                                    <option value="Email and SMS">Email and SMS</option>
                                </select>

                                {/* Time Zone dropdown */}
                                <h4>Time Zone:</h4>
                                <select value={values.timeZone} onChange={set('timeZone')}>
                                    <option value="London Time">(UTC +00:00) Dublin, Edinburgh, Lisbon, London</option>
                                    <option value="US Eastern Time">(UTC-05:00) Eastern Time, US and Canada</option>
                                    <option value="US Central Time">(UTC-06:00) Central Time, US and Canada</option>
                                    <option value="US Pacific Time">(UTC -08:00) Pacific Time, US and Canada</option>
                                    <option value="Austraila Time">(UTC+10:00) Brisbane, Austraila</option>
                                </select>

                                {/* Submit and Cancel Button */}
                                <section className="submit_buttons">
                                    <button type="button" id="cancel">Cancel</button>
                                    <button type="submit" id="submit">Submit</button>
                                </section>
                            </form>
                        </section>
                    </section>
                </section>
            </section>
        </>
    )
}