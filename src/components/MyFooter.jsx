import Container from "react-bootstrap/Container"

const MyFooter = function () {
  return (
    // footer con stile scuro + testo chiaro + padding e margine sopra
    <footer
      className="bg-dark text-light py-4 mt-5"
      style={{
        position: "sticky", // resta "attaccato" in basso quando serve
        top: "100vh", // trucco: lo spinge giù quando la pagina è corta
        zIndex: 1, // sta sopra ad altri elementi se si sovrappongono
      }}
    >
      {/* container per centrarmi il contenuto */}
      <Container className="d-flex flex-column align-items-center gap-3">
        {/* bottone semplice (al momento non fa nulla perché non ha onClick) */}
        <button className="btn btn-outline-secondary">Contattaci</button>

        {/* anno dinamico: prende l'anno attuale */}
        <div className="small text-center">© {new Date().getFullYear()} EpiBooks • Tutti i diritti riservati</div>
      </Container>
    </footer>
  )
}

export default MyFooter
