import Card from "react-bootstrap/Card"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import fantasyBooks from "../data/fantasy.json" // importo la lista di libri (array di oggetti)

function AllTheBooks() {
  return (
    // Row crea la griglia responsive (cambia colonne in base allo schermo)
    <Row xs={1} sm={2} md={3} lg={5} className="g-2">
      {/* ciclo tutti i libri e per ognuno creo una card */}
      {fantasyBooks.map((book) => (
        // Col è una colonna della griglia, key serve a React per gestire la lista
        <Col key={book.asin} className="d-flex">
          {/* Card occupa tutta l’altezza e larghezza della colonna */}
          <Card className="h-100 w-100">
            {/* immagine del libro */}
            <Card.Img
              style={{ height: "350px", objectFit: "cover" }} // altezza fissa + immagine ritagliata bene
              variant="top"
              src={book.img} // url immagine dal json
              alt={book.title} // testo alternativo
            />

            {/* body in colonna per mettere il prezzo in fondo */}
            <Card.Body className="d-flex flex-column">
              {/* titolo del libro */}
              <Card.Title>{book.title}</Card.Title>

              {/* mt-auto spinge il prezzo in basso (in fondo alla card) */}
              <Card.Text className="mt-auto mb-0">Prezzo: {book.price}€</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  )
}

export default AllTheBooks
