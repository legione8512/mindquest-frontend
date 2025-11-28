import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function DeleteAccountModal({ show, onHide, onConfirm, dummyPassword }) {

    // Password field state
    const [enteredPassword, setEnteredPassword] = useState("");

    // Handler for confirming the deleting of account.
    const confirmDeleteAccount = () => {
        if (enteredPassword !== dummyPassword) {
            alert("Incorrect password. Account not deleted.");
            return;
        }
        onConfirm();
        setEnteredPassword("");
        return;
    };

    // Handler for cancel button
    const handleCancel = () => {
        setEnteredPassword("");
        onHide();
    };

    return (

        <Modal show={show} onHide={handleCancel} centered size="lg">

            <Modal.Header>
                <Modal.Title>Confirm Account Deletion</Modal.Title>
                <button className="modalCloseButton" onClick={handleCancel}>
                    <i class="fa fa-times"></i>
                </button>
            </Modal.Header>

            <Modal.Body>
                <h4>Warning: Deleting your account will remove all your stored data!</h4>
                <p>This includes losing access to:</p>
                <ul>
                    <li>Your Streaks</li>
                    <li>Your Points</li>
                    <li>Your saved data</li>
                    <li>Our Hubs</li>
                    <li>Our Courses</li>
                </ul>
                <p>If you are still sure you want to delete your account, please enter your password to confirm:</p>

                {/* Password field */}
                <input
                    className="deleteAccountField"
                    type="password"
                    placeholder="Enter password"
                    value={enteredPassword}
                    onChange={(e) => setEnteredPassword(e.target.value)}
                />
            
            </Modal.Body>

            {/* Cancel and submit button */}
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCancel}>
                    Cancel
                </Button>
                <Button variant="danger" onClick={confirmDeleteAccount}>
                    Confirm Delete
                </Button>
            </Modal.Footer>
        </Modal >
    );
}