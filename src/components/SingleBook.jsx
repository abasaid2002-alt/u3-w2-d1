import { Component } from "react"
import Card from "react-bootstrap/Card"

class SingleBook extends Component {
  render() {
    const { book, selected, onSelect } = this.props
    // book = oggetto libro (img, title, price, asin...)
    // selected = true/false se questo libro è selezionato
    // onSelect = funzione che seleziona/deseleziona (arriva dal padre)

    return (
      <Card
        className="w-100 h-100 d-flex flex-column"
        style={{
          height: "520px", // altezza fissa della card
          border: selected ? "3px solid red" : "1px solid #dee2e6", // se selezionato evidenzio
          cursor: "pointer", // cursore “cliccabile”
        }}
      >
        <Card.Img
          variant="top"
          src={book.img} // immagine dal libro
          alt={book.title}
          onClick={onSelect} // quando clicco l’immagine seleziono/deseleziono
          style={{ height: "280px", objectFit: "cover" }} // immagine alta fissa e ritaglio corretto
        />

        <Card.Body className="d-flex flex-column">
          <Card.Title
            style={{
              display: "-webkit-box", // trucco per troncare testo
              WebkitLineClamp: 2, // massimo 2 righe
              WebkitBoxOrient: "vertical",
              overflow: "hidden", // nascondo il resto
              lineHeight: "1.2",
              minHeight: "2.4em", // mantiene spazio per 2 righe anche se titolo corto
            }}
          >
            {book.title} {/* titolo del libro */}
          </Card.Title>

          {/* mt-auto spinge il prezzo in basso dentro il body */}
          <p className="mt-auto mb-0 fw-semibold">Prezzo: {book.price}€</p>
        </Card.Body>
      </Card>
    )
  }
}

export default SingleBook
