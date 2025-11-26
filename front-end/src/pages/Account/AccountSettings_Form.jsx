

export default function AccountSettingsForm() {
    
    return (
        <section className="account_settings_form_section" >

            {/* HEADING AND SUBHEADING */}
            <section className="account_settings_form_top" >
                <h2>Your Settings</h2>
                <p>Account settings</p>
            </section>

            {/* TEXT FIELDS */}
            < section className="account_settings_form_bottom" >
                <form className="account_settings_form">

                    {/* UserName */}
                    <h4>Update Username:</h4>
                    <input type="text" name="username" />

                    {/* Email */}
                    <h4>Update Email:</h4>
                    <input type="text" name="email" />

                    {/* Phone number */}
                    <h4>Update Phone Number:</h4>
                    <input type="text" name="phone_no" />

                    {/* Password */}
                    <h4>Update Password:</h4>
                    <input type="text" name="password" />

                    {/* Password */}
                    <h4>*Verify Current Password:</h4>
                    <input type="text" name="verify_password" />

                    {/* Submit and cancel button section */}
                    <section className="submit_buttons">
                        <button type="button" id="delete_account">Delete Account</button>
                            <button type="button" id="cancel">Cancel</button>
                            <button type="submit" id="submit">Submit</button>
                    </section>
                </form>
            </section >
        </section >
    );
};