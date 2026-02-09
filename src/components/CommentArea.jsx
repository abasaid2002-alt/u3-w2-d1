import { Component } from "react"
import Card from "react-bootstrap/Card"
import { COMMENTS_URL, authHeaders } from "../striveConfig"
import CommentsList from "./CommentsList"
import AddComment from "./AddComment"

class CommentArea extends Component {
  state = {
    comments: [], // qui salvo i commenti presi dal server
    loading: false, // true mentre sto caricando
    error: false, // true se c'è un errore
  }

  getComments = () => {
    // prima di chiamare la GET: imposto loading e resetto l'errore
    this.setState({ loading: true, error: false })

    // GET: prendo i commenti del libro con asin attuale
    fetch(COMMENTS_URL + this.props.asin, { headers: authHeaders })
      .then((resp) => {
        if (resp.ok) return resp.json() // converto risposta in JSON
        throw new Error("Errore GET commenti")
      })
      .then((data) => {
        // salvo i commenti nello state e fermo il loading
        this.setState({ comments: data, loading: false })
      })
      .catch((err) => {
        // se errore: segno error e fermo loading
        console.log(err)
        this.setState({ error: true, loading: false })
      })
  }

  deleteComment = (commentId) => {
    // DELETE: elimino un commento usando il suo id
    fetch(COMMENTS_URL + commentId, {
      method: "DELETE",
      headers: authHeaders, // token/authorization
    })
      .then((resp) => {
        if (resp.ok) {
          // se ok: ricarico la lista aggiornata
          this.getComments()
        } else {
          throw new Error("Errore DELETE")
        }
      })
      .catch((err) => {
        console.log(err)
        alert("Errore eliminazione commento")
      })
  }

  componentDidMount() {
    // carico solo se ho già un asin (di solito no all'inizio)
    if (this.props.asin) {
      this.getComments()
    }
  }

  componentDidUpdate(prevProps) {
    // quando cambia asin, ricarico i commenti del nuovo libro
    if (prevProps.asin !== this.props.asin) {
      if (this.props.asin) {
        // se ho un asin valido: carico i commenti del libro selezionato
        this.getComments()
      } else {
        // se nessun libro selezionato, pulisco
        this.setState({ comments: [], loading: false, error: false })
      }
    }
  }

  render() {
    // sempre visibile, ma senza contenuto se non ho asin
    if (!this.props.asin) {
      return (
        <Card>
          <Card.Body>
            <Card.Title>Recensioni</Card.Title>
            <p className="text-muted mb-0">Seleziona un libro per vedere i commenti.</p>
          </Card.Body>
        </Card>
      )
    }

    return (
      <Card className="mt-2">
        <Card.Body>
          <Card.Title>Recensioni</Card.Title>

          {/* stati UI: loading / errore */}
          {this.state.loading && <p>Caricamento...</p>}
          {this.state.error && <p style={{ color: "red" }}>Errore nel caricamento dei commenti</p>}

          {/* se tutto ok: mostro la lista commenti e passo la funzione delete */}
          {!this.state.loading && !this.state.error && (
            <CommentsList
              comments={this.state.comments} // lista commenti
              onDelete={this.deleteComment} // funzione per eliminare
            />
          )}

          {/* form per aggiungere un commento:
              - asin serve per collegarlo al libro
              - refreshComments serve per ricaricare la lista dopo la POST */}
          <AddComment asin={this.props.asin} refreshComments={this.getComments} />
        </Card.Body>
      </Card>
    )
  }
}

export default CommentArea
