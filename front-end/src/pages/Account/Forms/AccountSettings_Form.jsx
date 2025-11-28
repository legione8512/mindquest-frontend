import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import "./AccountSettings.css";
import "./Forms.css";

export default function AccountSettingsForm({ accountSettings, setAccountSetting, onSubmit, onCancel, onDelete }) {

    // Toggle visibility of password fields
    const [passwordVisible1, setPasswordVisible1] = useState(false);
    const [passwordVisible2, setPasswordVisible2] = useState(false);

    // Update field
    const togglePassword1Visibility = () => {
        setPasswordVisible1(visibile => !visibile);
    };

    // Verify field
    const togglePassword2Visibility = () => {
        setPasswordVisible2(visible => !visible);
    };


    // ========================================  ACCOUNT SETTINGS FORM ======================================== //
    return (
        <section className="form_section" >

            {/* FORM HEADING AND SUBHEADING */}
            <section className="form_header" >
                <h2>Your Settings</h2>
                <p>Account settings</p>
            </section>

            {/* INPUT FIELDS */}
            < section className="form_fields">
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
                        placeholder="Add a phone number"
                        value={accountSettings.phone_no}
                        onChange={setAccountSetting("phone_no")}
                    />

                    {/* Update Password */}
                    <section>
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
                                onClick={togglePassword1Visibility}
                            >
                                {passwordVisible1 ? <Eye size={25} /> : <EyeOff size={25} />}
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
                                onClick={togglePassword2Visibility}
                            >
                                {passwordVisible2 ? <Eye size={25} /> : <EyeOff size={25} />}
                            </span>

                        </section>
                    </section>

                    {/* Submission buttons section */}
                    <section className="form_buttons">
                        <button type="button" id="delete_account" onClick={onDelete}>Delete Account</button>
                        <button type="button" id="cancel" onClick={onCancel}>Cancel</button>
                        <button type="submit" id="submit">Submit</button>
                    </section>
                </form>
            </section >
        </section >
    );
};