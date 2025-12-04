import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./FormStyles.css";
function Form() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://192.168.1.195:8000/api/submit/", {
        name,
        email,
      });
      alert("Form submitted successfully!");
      setName("");
      setEmail("");
    } catch (err) {
      alert("Failed to submit");
      console.error(err);
    }
  };
  return (
    <div className="form-container">
      <form className="styled-form" onSubmit={handleSubmit}>
        <h2>Contact Form</h2>
        <label>Name</label>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <label>Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
        <Link to="/storedData"> Check Stored data</Link>
      </form>
    </div>
  );
}
export default Form;
