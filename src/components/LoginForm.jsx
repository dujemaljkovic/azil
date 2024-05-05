import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import "./RegistrationForm.css";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(null); // Add error state

  const { setIsAdmin } = useContext(UserContext);
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError(null)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Resetting error state")
    setError(null); // Reset error state
    try {
      const response = await axios.post("http://localhost:3000/users/login", formData);
      console.log("Login successful:", response.data);
      localStorage.setItem('token', response.data.token); // Store the token in local storage
  
      // Fetch user role after successful login
      axios.get("http://localhost:3000/users/role", {
        headers: {
          Authorization: `Bearer ${response.data.token}`
        }
      })
      .then(roleResponse => {
        const userIsAdmin = roleResponse.data.role === 'admin';
        setIsAdmin(userIsAdmin);
        localStorage.setItem('isAdmin', userIsAdmin.toString()); // Store the isAdmin status as a string
        navigate("/about");
      })
      .catch(error => {
        console.error("Failed to fetch user role:", error);
        // Handle error
      });
    } catch (error) {
      console.error("Login failed:", error);
      setError("Invalid email or password. Please try again."); // Set error state
    }
    // Reset form fields
    setFormData({
      email: "",
      password: "",
    });
  };
  

  return (
    <Container className="custom-container">
      <Row className="justify-content-center">
        <Col>
          <h2>Login</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <br/>
            <Button variant="primary" type="submit">
              Login
            </Button>
            <br/>
            {error && <Alert variant="danger">{error}</Alert>} {/* Display error message */}
            <p>Don&apos;t have an account? <Link to="/">Register</Link></p>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginForm;
