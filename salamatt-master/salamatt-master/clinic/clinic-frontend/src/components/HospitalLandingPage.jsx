import React, { useState } from 'react';
import { Container, Row, Col, Button, Form, Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function HospitalLandingPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className={`app ${sidebarOpen ? 'sidebar-open' : ''}`}>
      <div className="sidebar">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/complaints">Complaints</Link>
          </li>
        </ul>
      </div>

      <div class="content">
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="/">Pau Clinic</Navbar.Brand>
            <Navbar.Toggle onClick={toggleSidebar} />
            <Navbar.Collapse className="justify-content-end">
              <Nav>
                <Nav.Link as={Link} to="/">Home</Nav.Link>
                <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
                <Nav.Link as={Link} to="/complaints">Complaints</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <header class="text-white text-center py-5">
          
            <h1>Welcome to Pan-Atlantic University Clinic</h1>
            <p>We provide high-quality healthcare services.</p>
            <Button variant="light">Learn More</Button>
         
        </header>

        <section class="bg-light py-5">
         
            <Row>
              <Col md={6}>
                <h2>Register</h2>
                <Form>
                  {/* Register form fields */}
                </Form>
                <p class="text-center">
                  Already have an account? <Link to="/login">Login</Link>
                </p>
              </Col>
              <Col md={6}>
                <h2>Login</h2>
                <Form>
                  {/* Login form fields */}
                </Form>
                <p class="text-center">
                  Don't have an account yet? <Link to="/register">Register</Link>
                </p>
              </Col>
            </Row>
          
        </section>

        <section class="py-5">
         
            <Row>
              <Col md={6}>
                <h2>About Us</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                <Button variant="primary">Read More</Button>
              </Col>
              <Col md={6}>
                <img src="/path/to/image" alt="About" className="img-fluid" />
              </Col>
            </Row>
         
        </section>

        <footer className="bg-dark text-white text-center py-3">
          
            <p>&copy; {new Date().getFullYear()} Hospital Name. All rights reserved.</p>
         
        </footer>
      </div>
    </div>
  );
}

export default HospitalLandingPage;
