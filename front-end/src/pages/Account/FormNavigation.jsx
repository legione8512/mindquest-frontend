export default function FormNavigation({ currentForm, switchForm, onLogOut }) {

    return (
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
            <button onClick={onLogOut}>Logout</button>
        </section>
    );

}