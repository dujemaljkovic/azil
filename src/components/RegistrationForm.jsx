import { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';


const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user"  
  });

  const [error, setError] = useState(null);  // For user-friendly error handling

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Form validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
  
    if (formData.role !== 'user' && formData.role !== 'admin') {
      setError('Invalid role');
      return;
    }
  
    try {
      const response = await axios.post(
        "http://localhost:3000/users/register",
        formData
      );
  
      // Extract token from response
      const token = response.data.token;
  
      // Store token in local storage
      localStorage.setItem('token', token);
  
      console.log("Registration successful:", response.data);
      navigate("/login"); // Redirect to login page after successful registration
    } catch (error) {
      console.error("Registration failed:", error);
      // Handle registration failure
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
        setError(error.response.data.message);  // Show error message to user
      } else if (error.request) {
        // The request was made but no response was received
        console.error("Request data:", error.request);
        setError('No response from server');
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error message:", error.message);
        setError(error.message);
      }
    }
  
    // Reset form fields
    setFormData({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "user"
    });
  };
  
  return (
    <Container className="custom-container">
      <Row className="justify-content-center">
        <Col>
          <h2>Registration</h2>
          {error && <p className="error">{error}</p>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </Form.Group>
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
            <Form.Group controlId="formConfirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formRole">
              <Form.Label>Role</Form.Label>
              <Form.Control
                as="select"
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
              >
                <option value="">Select Role</option>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </Form.Control>
            </Form.Group>
            <br/>
            <Button variant="primary" type="submit">
              Register
            </Button>
            <p>Already have an account? <Link to="/login">Login</Link></p>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default RegistrationForm;
