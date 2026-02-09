import "bootstrap/dist/css/bootstrap.min.css" // importo lo stile di Bootstrap (una volta sola)

import Container from "react-bootstrap/Container"
import MyNav from "./components/MyNav"
import Welcome from "./components/Welcome"
import MyFooter from "./components/MyFooter"
import BookList from "./components/BookList"

import fantasyBooks from "./data/fantasy.json" // array di libri (dati)

function App() {
  return (
    // layout principale: colonna + altezza minima schermo (per footer in basso)
    <div className="d-flex flex-column min-vh-100">
      {/* navbar: passo titolo e lista link come props */}
      <MyNav
        title="EpiBooks"
        links={[
          { text: "Home", href: "#home" },
          { text: "About", href: "#about" },
          { text: "Browse", href: "#browse" },
        ]}
      />

      {/* sezione di benvenuto (mostra il messaggio) */}
      <Welcome subtitle="Qui trovi i tuoi libri fantasy preferiti." />

      {/* container centrale con margine sopra/sotto */}
      <Container className="my-4">
        {/* passo l'array di libri a BookList tramite props */}
        <BookList books={fantasyBooks} />
      </Container>

      {/* footer in fondo */}
      <MyFooter />
    </div>
  )
}

export default App
