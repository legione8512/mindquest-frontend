import { useState } from "react";
import mindquestLogo from "../../assets/Navigation/mindquest_logo.png";
import "./Register.css";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    repPassword: "",
    tos: false,
  });

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    const emailFormat = /\S+@\S+\.\S+/;

    if (loginEmail.trim() === "") {
      alert("Please enter your email.");
      return;
    }

    if (!emailFormat.test(loginEmail)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (loginPassword.trim() === "") {
      alert("Please enter your password.");
      return;
    }

    if (loginPassword.length < 8) {
      alert("Password must be at least 8 characters.");
      return;
    }

    alert("Login Successful! (Backend integration coming later)");
  };

  const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  function handleChangeText(event) {
    const { name, value, type, checked } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function validateForm() {
    let formValid = false;

    if (formData.name === "" || formData.email === "") {
      alert("Please fill in all text fields.");
    } else if (!formData.email.match(mailformat)) {
      alert("Invalid e-mail address. Please enter your e-mail again.");
    } else if (formData.password.length < 8) {
      alert("Password is too short. Please select another password.");
    } else if (formData.password !== formData.repPassword) {
      alert("Passwords do not match. Please retry.");
    } else if (!formData.tos) {
      alert("Please agree to the Terms and Conditions, and Privacy Policy.");
    } else {
      formValid = true;
    }

    return formValid;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const dataToSend = (({ name, email, password }) => ({
      name,
      email,
      password,
    }))(formData);

    if (validateForm()) {
      alert("Registration successful!");
      console.log(dataToSend);
    }
  };

  return (
    <section className="registerPage">
      {/* LEFT SIDE — LOGO */}
      <section className="registerLeft">
        <img
          src={mindquestLogo}
          className="registerLogo"
          alt="MindQuest Logo"
        />
      </section>

      {/* RIGHT SIDE — FORM */}
      <section className="registerRight">
        <section className="loginBox">
          <h2>Log In</h2>

          <form onSubmit={handleLoginSubmit}>
            <label className="labelText">Email:</label>
            <input
              className="inputText"
              type="email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
            />

            <label className="labelText">Password:</label>
            <input
              className="inputText"
              type="password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
            />

            <button className="registerButton">Submit</button>
          </form>
        </section>
        <section className="registerBox">
          <h2>Create Your Account</h2>

          <form className="registration" noValidate>
            <label className="labelText">Name:</label>
            <input
              type="text"
              name="name"
              className="inputText"
              value={formData.name}
              onChange={handleChangeText}
              required
              autoComplete="off"
            />

            <label className="labelText">Email:</label>
            <input
              type="email"
              name="email"
              className="inputText"
              value={formData.email}
              onChange={handleChangeText}
              required
              autoComplete="off"
            />

            <label className="labelText">Password:</label>
            <input
              type="password"
              name="password"
              className="inputText"
              value={formData.password}
              onChange={handleChangeText}
              required
              minLength={8}
            />

            <label className="labelText">Re-type password:</label>
            <input
              type="password"
              name="repPassword"
              className="inputText"
              value={formData.repPassword}
              onChange={handleChangeText}
              required
            />

            <section className="checkboxRow">
              <input
                type="checkbox"
                name="tos"
                checked={formData.tos}
                onChange={handleChangeText}
                required
              />
              <label>I agree to the Terms of Use and Privacy Policy.</label>
            </section>

            <button className="registerButton" onClick={handleSubmit}>
              Submit
            </button>
          </form>
        </section>
      </section>
    </section>
  );
}
