import React from 'react'
import { Container, Nav, NavDropdown, Navbar } from 'react-bootstrap'
import { useAuth } from '../context/auth'
import toast from "react-hot-toast";
import SearchInput from '../Form/SearchInput';
import { useCart } from '../context/cart';
import { Badge } from "antd";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };
  return (
    <>
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand to="/">E commerce</Navbar.Brand>
          <SearchInput />
          <Nav className="ms-auto">
            <Nav.Link href="/">Home</Nav.Link>
            {
              !auth.user ? (
                <>
                  <Nav.Link href="/register">Register</Nav.Link>
                  <Nav.Link href="/login">Login</Nav.Link>
                </>
              ) : (
                <>
                  <NavDropdown title={auth?.user?.name} id="basic-nav-dropdown">
                    <NavDropdown.Item href={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"
                      }`}>Dashboard</NavDropdown.Item>
                    <NavDropdown.Item onClick={handleLogout} href="/login">Logout</NavDropdown.Item>
                  </NavDropdown>
                  {/* <Nav.Link onClick={handleLogout} href="/login">Logout</Nav.Link> */}
                </>
              )
            }
            <Nav.Link href="/cart">
              <Badge count={cart?.length} showZero offset={[10, -5]}>
                Cart
              </Badge>
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  )
}

export default Header