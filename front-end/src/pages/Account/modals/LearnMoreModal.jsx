import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function VerifyAccountModal({ show, onHide, onSubmit }) {
    
    const [file, setFile] = useState(null);

    // Handler for file upload (only accept pdf)
    const handleFileChange = (e) => {
        const uploaded = e.target.files[0];
        if (uploaded && uploaded.type === "application/pdf") {
            setFile(uploaded);
        }

        else {
            alert("Please upload a valid PDF.");
        }

    };

    // Handler for submit button
    const handleSubmit = () => {
        if (!file) {
            alert("Upload your PDF first!")
            return;
        }

        alert("PDF Submitted!\n\nWe will respond to your request within 7-14 days.\n\nThank you for your request!")
        setFile(null);
        onHide();
    }

    return (

        <Modal show={show} onHide={onHide} centered>

            <Modal.Header>
                <Modal.Title>Verify your account</Modal.Title>
                <button className="modalCloseButton" onClick={onHide}>
                    <i className="fa fa-times"></i>
                </button>
            </Modal.Header>

            <Modal.Body>
                <h5>What does account verification mean?:</h5>

                <ul>
                    <li>Your account will be recognised as an official partnered mental health organisation throughout the site.</li>
                    <li>Your organisation will be able to create local hubs & events for users to join.</li>
                    <li>Your organisation will be able to create quests and challenges for users.</li>
                    <li>Your organisation can provide users with badges upon successful event or challenge completion!</li>
                </ul>

                <h5>Select a PDF to upload:</h5>
                
                {/* Input button */}
                <input
                    type="file"
                    accept="application/pdf"
                    onChange={handleFileChange}
                />

                {file && <p>Selected: <strong>{file.name}</strong></p>}
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>Cancel</Button>
                <Button variant="primary" onClick={handleSubmit}>Submit</Button>
            </Modal.Footer>
        </Modal>
    );
}