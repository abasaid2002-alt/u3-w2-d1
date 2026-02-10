import { useMemo, useState } from "react"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Form from "react-bootstrap/Form"
import Alert from "react-bootstrap/Alert"

import SingleBook from "./SingleBook"
import CommentArea from "./CommentArea"

const BookList = ({ books }) => {
  // state con hook (al posto di this.state)
  const [search, setSearch] = useState("") // testo ricerca
  const [selectedAsin, setSelectedAsin] = useState(null) // asin selezionato

  const selectBook = (asin) => {
    // se clicco lo stesso libro lo deseleziono, altrimenti lo seleziono
    setSelectedAsin((prev) => (prev === asin ? null : asin))
  }

  // filtro libri in base alla search (case-insensitive)
  const filteredBooks = useMemo(() => {
    return books.filter((b) => b.title.toLowerCase().includes(search.toLowerCase()))
  }, [books, search])

  // mostro "nessun risultato" solo se ho scritto qualcosa e non trovo nulla
  const showNoResults = search.trim() !== "" && filteredBooks.length === 0

  // ricavo l'oggetto del libro selezionato (se non c'è selezione -> undefined)
  const selectedBook = useMemo(() => books.find((b) => b.asin === selectedAsin), [books, selectedAsin])

  return (
    <Row className="g-3">
      {/* SINISTRA */}
      <Col xs={12} md={8}>
        {/* input di ricerca controllato dallo state */}
        <Form className="mb-3">
          <Form.Control
            value={search}
            onChange={(e) => setSearch(e.target.value)} // aggiorno mentre scrivo
            placeholder="Cerca un libro..."
          />
        </Form>

        {/* alert quando non ci sono risultati */}
        {showNoResults && (
          <Alert variant="warning" className="text-center">
            Nessun risultato trovato
          </Alert>
        )}

        {/* MOBILE: se non ho selezionato nulla, faccio vedere l’avviso recensioni sotto la search */}
        {!selectedAsin && (
          <div className="d-md-none mb-3">
            <CommentArea asin={selectedAsin} selectedBook={selectedBook} />
          </div>
        )}

        {/* GRIGLIA LIBRI */}
        <Row className="g-2 align-items-start">
          {filteredBooks.map((book) => (
            <Col key={book.asin} xs={12} sm={6} md={4} lg={3}>
              <SingleBook book={book} selected={selectedAsin === book.asin} onSelect={() => selectBook(book.asin)} />

              {/* MOBILE (<md): CommentArea sotto la card selezionata */}
              {selectedAsin === book.asin && (
                <div className="d-md-none mt-2">
                  <CommentArea asin={selectedAsin} selectedBook={selectedBook} />
                </div>
              )}
            </Col>
          ))}
        </Row>
      </Col>

      {/* DESTRA (solo >=768px) */}
      <Col md={4} className="d-none d-md-block">
        <CommentArea asin={selectedAsin} selectedBook={selectedBook} />
      </Col>
    </Row>
  )
}

export default BookList
