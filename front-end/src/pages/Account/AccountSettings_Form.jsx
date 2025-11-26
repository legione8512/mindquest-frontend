

export default function AccountSettingsForm({ accountSettings, setAccountSetting, onSubmit }) {

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

                    {/* Password */}
                    <h4>Update Password:</h4>
                    <input
                        type="text"
                        value={accountSettings.password}
                        name="password"
                        onChange={setAccountSetting("password")}
                    />

                    {/* Password */}
                    <h4>*Verify Current Password:</h4>
                    <input
                        type="text"
                        value={accountSettings.verify_password}
                        onChange={setAccountSetting("verify_password")}
                    />

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