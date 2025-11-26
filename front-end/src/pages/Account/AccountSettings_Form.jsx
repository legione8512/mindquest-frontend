import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function AccountSettingsForm({ accountSettings, setAccountSetting, onSubmit, onCancel }) {

    // Toggle visibility function for password fields
    const [passwordVisible1, setPasswordVisible1] = useState(false); // Update pass field.
    const [passwordVisible2, setPasswordVisible2] = useState(false); // Verify pass field.

    // Update Password field
    const togglePassword1Visibility = () => {
        setPasswordVisible1(visibile => !visibile);
    };

    // Verify Password field
    const togglePassword2Visibility = () => {
        setPasswordVisible2(visible => !visible);
    };



    // ========================================  ACCOUNT SETTINGS FORM ======================================== //s
    return (
        <section className="account_settings_form_section" >

            {/* HEADING AND SUBHEADING */}
            <section className="account_settings_form_top" >
                <h2>Your Settings</h2>
                <p>Account settings</p>
            </section>

            {/* TEXT FIELDS */}
            < section className="account_settings_form_bottom" >
                <form className="account_settings_form" onSubmit={onSubmit}>

                    {/* UserName */}
                    <h4>Update Username:</h4>
                    <input
                        type="text"
                        value={accountSettings.username}
                        onChange={setAccountSetting("username")}
                    />

                    {/* Email */}
                    <h4>Update Email:</h4>
                    <input
                        type="text"
                        value={accountSettings.email}
                        onChange={setAccountSetting("email")}
                    />

                    {/* Phone number */}
                    <h4>Update Phone Number:</h4>
                    <input
                        type="text"
                        value={accountSettings.phone_no}
                        onChange={setAccountSetting("phone_no")}
                    />

                    {/* Update Password */}
                    <section className="password-wrapper">
                        <h4>Update Password:</h4>
                        <section className="password-field">
                            <input
                                type={passwordVisible1 ? "text" : "password"}
                                placeholder="Enter new password"
                                value={accountSettings.password}
                                onChange={setAccountSetting("password")}
                            />

                            {/* Visibility Icon*/}
                            <span
                                className="visibility-icon"
                                data-testid="toggle-icon"
                                onClick={togglePassword1Visibility}
                            >
                                {passwordVisible1 ? <Eye size={20} /> : <EyeOff size={20} />}
                            </span>
                        </section>
                    </section>

                    {/* Verify Password */}
                    <section className="password-wrapper">
                        <h4>*Verify Current Password:</h4>
                        <section className="password-field">
                            <input
                                type={passwordVisible2 ? "text" : "password"}
                                placeholder="Enter old password"
                                value={accountSettings.verify_password}
                                onChange={setAccountSetting("verify_password")}
                            />

                            {/* Visibility Icon */}
                            <span
                                className="visibility-icon"
                                data-testid="toggle-icon"
                                onClick={togglePassword2Visibility}
                            >
                                {passwordVisible2 ? <Eye size={20} /> : <EyeOff size={20} />}
                            </span>
                        </section>
                    </section>

                    {/* Submit and cancel button section */}
                    <section className="submit_buttons">
                        <button type="button" id="delete_account">Delete Account</button>
                        <button type="button" id="cancel" onClick={onCancel}>Cancel</button>
                        <button type="submit" id="submit">Submit</button>
                    </section>
                </form>
            </section >
        </section >
    );
};