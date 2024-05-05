import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { Nav, Navbar, Container, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

export default function Navigation() {
  const { isAdmin, setIsAdmin } = useContext(UserContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    // Perform logout logic here, such as removing token from localStorage
    localStorage.removeItem('token');
    // Reset isAdmin state to false
    setIsAdmin(false);
    // Redirect user to the login page or any other desired route
    navigate("/login");
  };

  return (
    <Navbar bg="light" expand="lg" fixed="top">
      <Container>
        <Navbar.Brand href="/">animal asylum</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="/about">
              <Nav.Link>About Us</Nav.Link>
            </LinkContainer>

            <LinkContainer to="/animalsList">
              <Nav.Link>Animals List</Nav.Link>
            </LinkContainer>

            <LinkContainer to="/donations">
              <Nav.Link>Donations</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/announcements">
              <Nav.Link>Announcements</Nav.Link>
            </LinkContainer>
            {isAdmin && 
              <LinkContainer to="/newentry">
                <Nav.Link>New Entry</Nav.Link>
              </LinkContainer>
            }
          </Nav>
          <Nav>
            <Button variant="outline-primary" onClick={handleLogout}>Logout</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
