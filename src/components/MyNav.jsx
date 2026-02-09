import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"

const MyNav = function (props) {
  return (
    // Navbar bootstrap: scura, responsive, si chiude dopo un click su mobile
    <Navbar collapseOnSelect expand="md" bg="dark" data-bs-theme="dark">
      {/* container fluido = prende tutta la larghezza */}
      <Container fluid={true}>
        {/* titolo/logo a sinistra (arriva da props.title) */}
        <Navbar.Brand href="#home">{props.title}</Navbar.Brand>

        {/* bottone hamburger che appare sotto md */}
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

        {/* menu che si apre/chiude su schermi piccoli */}
        <Navbar.Collapse id="responsive-navbar-nav">
          {/* ms-2 = margine a sinistra */}
          <Nav className="ms-2">
            {/* ciclo i link passati in props.links e creo un Nav.Link per ognuno */}
            {props.links.map((link) => (
              <Nav.Link key={link.text} href={link.href}>
                {link.text} {/* testo del link */}
              </Nav.Link>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default MyNav
