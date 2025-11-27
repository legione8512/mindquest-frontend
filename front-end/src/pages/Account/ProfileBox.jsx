import { useRef } from "react";

export default function ProfileBox({ profileImage, setProfileImage, username, userLevel }) {

    const fileUploadRef = useRef(null);

    // Opening file explorer when button is pressed
    const openFileExplorer = (e) => {
        e.preventDefault();
        fileUploadRef.current.click();
    }

    // Handler for changing the image
    const handleImageChange = () => {
        const uploadedFile = fileUploadRef.current.files[0];
        const cachedURL = URL.createObjectURL(uploadedFile);
        setProfileImage(cachedURL);
    };


    return (
        <section className="profile_box" >

            <section className="profile_box_top">

                {/* Profile picture */}
                <img src={profileImage} alt="Profile Photo" />

                {/* Upload image button */}
                <button title="Change your Profile Photo" onClick={openFileExplorer}>
                    <i className="fa fa-plus-circle"></i>
                </button>

                {/* Upload file button (hidden) */}
                <input
                    type="file"
                    ref={fileUploadRef}
                    onChange={handleImageChange}
                    hidden
                />

                {/* Username and Level */}
                <section className="profile_text_box">
                    <h3>{username}</h3>
                    <p>Level {userLevel}</p>
                </section>
            </section>

            {/* Points and Streaks section */}
            <section className="profile_box_bottom">
                <section className="points_bar">
                    <h3>My Points</h3>
                    <h3>0</h3>
                </section>
                <section className="streak_bar">
                    <h3>My Streak</h3>
                    <h3>0d</h3>
                </section>
            </section>
        </section>
    );
}