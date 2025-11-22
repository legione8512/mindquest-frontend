import "./account.css";
import profile from "../assets/example_profile_picture.jpg";

export default function Account() {
    return (
        <>

            {/* Site Settings banner */}
            <section className="site_settings_banner">
                <h1>Site Settings</h1>
            </section>

            {/* Main Body Section */}

            <section className="account_page_body">

                {/* Box containing profile picture, points, and streak */}
                <section className="account_box">

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

                <p>Manage your account settings here.</p>
            </section>


        </>
    )
}