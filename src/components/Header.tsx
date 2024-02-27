import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import Basket from "../features/basket/Basket";

function Header() {
  return (
    <Navbar expand="lg" bg="light" variant="light" className="mb-4 bg-dark">
      <Container>
        <Navbar.Brand
          as={Link}
          to="/"
          className="text-primary fw-bold larger-font"
        >
          FRSTN.Co
        </Navbar.Brand>

        <Nav className="align-items-center position-relative">
          <Basket />
          <Nav.Link
            as={Link}
            to="/checkout"
            className="text-dark position-absolute end-0"
            style={{ top: "50%", transform: "translateY(-50%)" }}
          ></Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Header;
