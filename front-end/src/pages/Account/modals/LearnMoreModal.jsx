import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function VerifyAccountModal({ show, onHide }) {

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

    // Handler for cancel button - clear file and close
    const handleCancel = () => {
        setFile(null);
        onHide();
    }

    return (

        <Modal show={show} onHide={handleCancel} centered size="lg">

            <Modal.Header>
                <Modal.Title>Verify your account</Modal.Title>
                <button className="modalCloseButton" onClick={handleCancel}>
                    <i className="fa fa-times"></i>
                </button>
            </Modal.Header>

            <Modal.Body>
                <h5>What does account verification mean?:</h5>

                <ul>
                    <li>Your account will be recognised as an official partnered mental health organisation throughout the site.</li>
                    <li>You will be able to create local hubs & events for users to join.</li>
                    <li>You will be able to create quests and challenges for users.</li>
                    <li>You will be able to provide users with badges upon successful event or challenge completion!</li>
                </ul>

                <h5>What do you need to do to get verified?</h5>
                <p>Upload a PDF with the following information: </p>
                <ul>
                    <li>Your organisation's name.</li>
                    <li>Your organisation's proof of address.</li>
                    <li>Your organisation's Business License</li>
                    <li>A brief description of what your organisation does, and why you want verification on MindQuest.</li>
                </ul>

                {/* Upload button */}
                <label htmlFor="uploadFile" className="uploadFileButton">
                    <i className="fa fa-upload"></i> Upload PDF File
                </label>
                <input
                    id="uploadFile"
                    type="file"
                    accept="application/pdf"
                    onChange={handleFileChange}
                    hidden
                />

                {/* Show the file currently being uploaded */}
                {file && <p>Selected: <strong>{file.name}</strong></p>}
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={handleCancel}>Cancel</Button>
                <Button variant="primary" onClick={handleSubmit}>Submit</Button>
            </Modal.Footer>
        </Modal>
    );
}