import { Link } from "react-router-dom";

export default function SiteSettingsForm({ userSiteSettings, setSiteSetting, onSubmit, onCancel }) {
    
    return (
        <section className="site_settings_form_section" >

            {/* HEADING AND SUBHEADING */}
            <section className="site_settings_form_top" >
                <h2>Your Settings</h2>
                <p>Site settings</p>
            </section>

            {/* DROPDOWN OPTIONS */}
            < section className="site_settings_form_bottom" >
                <form className="settings_form" onSubmit={onSubmit}>

                    {/* Theme */}
                    <h4>Theme:</h4>
                    <select value={userSiteSettings.theme} onChange={setSiteSetting('theme')}>
                        <option value="MindQuest Default">MindQuest Default</option>
                        <option value="Light">Light</option>
                        <option value="Dark">Dark</option>
                    </select>

                    {/* Notification Preferences */}
                    <h4>Notification Preferences:</h4>
                    <select value={userSiteSettings.notification} onChange={setSiteSetting('notification')}>
                        <option value="None">None</option>
                        <option value="Email Only">Email Only</option>
                        <option value="SMS Only">SMS Only</option>
                        <option value="Email and SMS">Email and SMS</option>
                    </select>

                    {/* Time Zone */}
                    <h4>Time Zone:</h4>
                    <select value={userSiteSettings.timeZone} onChange={setSiteSetting('timeZone')}>
                        <option value="London Time">(UTC +00:00) Dublin, Edinburgh, Lisbon, London</option>
                        <option value="US Eastern Time">(UTC-05:00) Eastern Time, US and Canada</option>
                        <option value="US Central Time">(UTC-06:00) Central Time, US and Canada</option>
                        <option value="US Pacific Time">(UTC -08:00) Pacific Time, US and Canada</option>
                        <option value="Austraila Time">(UTC+10:00) Brisbane, Australia</option>
                    </select>

                    {/* Verify account section */}
                    <section className="verification_box">
                        <h5>Verify your account as an organisation.</h5>
                        <Link className="verification_button" title="Learn about Account Verification" to="">Learn More</Link>
                    </section>

                    {/* Submit and cancel button section */}
                    <section className="form_buttons">
                        <button type="button" id="cancel" onClick={onCancel}>Cancel</button>
                        <button type="submit" id="submit">Submit</button>
                    </section>
                </form>
            </section >
        </section >
    );
};