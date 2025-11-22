import "./account.css";
import profile from "../assets/example_profile_picture.jpg";

export default function Profile() {
    return (
        <>
            <section className="profile_page_body">

                {/* Box containing profile picture, points, and streak */}
                <section className="profile_box">

                    {/* Profile photo */}
                    <section>
                        <img src={profile} alt="Profile Picture" />
                    </section>

                    {/* Username and level */}
                    <section className="profile_text_section">
                        <h3>AdamD6567</h3>
                        <p>Level 1</p>
                    </section>





                </section>

                <p>Manage your account settings here.</p>
            </section>


        </>
    )
}