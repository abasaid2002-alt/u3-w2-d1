import "bootstrap/dist/css/bootstrap.min.css" // importo lo stile di Bootstrap (una volta sola)

import { useState } from "react"
import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import Form from "react-bootstrap/Form"

import MyNav from "./components/MyNav"
import Welcome from "./components/Welcome"
import MyFooter from "./components/MyFooter"
import BookList from "./components/BookList"

import fantasyBooks from "./data/fantasy.json"
import historyBooks from "./data/history.json"
import horrorBooks from "./data/horror.json"
import romanceBooks from "./data/romance.json"
import scifiBooks from "./data/scifi.json"

// elenco generi
const GENRES = [
  { key: "fantasy", label: "Fantasy", books: fantasyBooks, subtitle: "Qui trovi i tuoi libri fantasy preferiti." },
  { key: "history", label: "History", books: historyBooks, subtitle: "Qui trovi i tuoi libri storici preferiti." },
  { key: "horror", label: "Horror", books: horrorBooks, subtitle: "Qui trovi i tuoi libri horror preferiti." },
  { key: "romance", label: "Romance", books: romanceBooks, subtitle: "Qui trovi i tuoi libri romantici preferiti." },
  { key: "scifi", label: "Sci-Fi", books: scifiBooks, subtitle: "Qui trovi i tuoi libri di fantascienza preferiti." },
]

function App() {
  // stato: quale genere sto guardando
  const [genre, setGenre] = useState("fantasy")

  // recupero il genere corrente
  const currentGenre = GENRES.find((g) => g.key === genre)

  return (
    <div className="d-flex flex-column min-vh-100">
      <MyNav
        title="EpiBooks"
        links={[
          { text: "Home", href: "#home" },
          { text: "About", href: "#about" },
          { text: "Browse", href: "#browse" },
        ]}
      />

      {/* sezione di benvenuto */}
      <Welcome subtitle={currentGenre.subtitle} />

      {/* Selezione genere: mobile dropdown, desktop pills */}
      <Container className="my-3">
        {/* MOBILE: select (più fluido) */}
        <div className="d-md-none">
          <Form.Select
            value={genre} // valore controllato dallo state
            onChange={(e) => setGenre(e.target.value)} // cambio genere quando seleziono una option
          >
            {GENRES.map((g) => (
              // ogni genere diventa una option, key serve a React per le liste
              <option key={g.key} value={g.key}>
                {g.label} {/* nome del genere */}
              </option>
            ))}
          </Form.Select>
        </div>

        {/* DESKTOP/TABLET: pills */}
        <div className="d-none d-md-flex justify-content-center">
          {/* contenitore “pill”: sfondo bianco, bordo e ombra leggera */}
          <div
            className="bg-white border shadow-sm px-2 py-2"
            style={{ borderRadius: "999px" }} // borderRadius alto per ottenere forma "pill"
          >
            {/* Nav a pills: usa genre come chiave attiva e aggiorna lo state con onSelect */}
            <Nav
              variant="pills"
              activeKey={genre} // genere attualmente selezionato
              onSelect={(k) => setGenre(k)} // quando clicco un pill, cambio genere
              className="gap-2 flex-nowrap" // gap tra pill + non andare a capo
              style={{ overflowX: "auto", whiteSpace: "nowrap" }} // se non ci sta, scroll orizzontale
            >
              {GENRES.map((g) => (
                // ogni genere diventa un Nav.Item, key serve a React per le liste
                <Nav.Item key={g.key}>
                  <Nav.Link
                    eventKey={g.key} // valore che Nav usa per capire quale item è attivo
                    className="rounded-pill px-3" // stile pill
                  >
                    {g.label} {/* nome del genere */}
                  </Nav.Link>
                </Nav.Item>
              ))}
            </Nav>
          </div>
        </div>
      </Container>

      {/* lista libri (key per “resettare” BookList quando cambio genere) */}
      <Container className="my-4">
        <BookList key={genre} books={currentGenre.books} />
      </Container>

      <MyFooter />
    </div>
  )
}

export default App
