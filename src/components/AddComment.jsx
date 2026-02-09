import { Component } from "react"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import { COMMENTS_URL, authHeaders } from "../striveConfig"

class AddComment extends Component {
  state = {
    comment: "", // testo che scrivo
    rate: "1", // voto selezionato (default 1)
    success: false, // true => mostro messaggio successo
  }

  handleCommentChange = (e) => {
    // aggiorno lo state mentre scrivo
    this.setState({ comment: e.target.value })
  }

  handleRateChange = (e) => {
    // aggiorno lo state quando cambio voto
    this.setState({ rate: e.target.value })
  }

  sendComment = (e) => {
    e.preventDefault() // evito refresh pagina

    // preparo il commento da inviare
    const newComment = {
      comment: this.state.comment, // testo
      rate: this.state.rate, // voto
      elementId: this.props.asin, // id prodotto preso dal padre
    }

    // faccio la POST al server
    fetch(COMMENTS_URL, {
      method: "POST",
      headers: {
        ...authHeaders, // token/authorization
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newComment), // converto in JSON
    })
      .then((resp) => {
        if (resp.ok) {
          // se ok: resetto campi e mostro messaggio successo
          this.setState({ comment: "", rate: "1", success: true })

          // ricarico i commenti (funzione passata dal componente padre)
          this.props.refreshComments()

          // dopo 3 secondi nascondo il messaggio successo
          setTimeout(() => this.setState({ success: false }), 3000)
        } else {
          // se risposta non ok: errore
          throw new Error("Errore POST")
        }
      })
      .catch((err) => {
        // se fallisce rete/server ecc.
        console.log(err)
        alert("Errore invio commento")
      })
  }

  render() {
    return (
      // quando invio il form parte sendComment
      <Form onSubmit={this.sendComment}>
        <h6 className="mt-3">Aggiungi commento</h6>

        {/* messaggio di successo */}
        {this.state.success && (
          <div className="alert alert-success py-2" role="alert">
            Commento inviato con successo ✅
          </div>
        )}

        <Form.Group className="mb-2">
          <Form.Label>Commento</Form.Label>
          <Form.Control
            as="textarea"
            rows={2}
            value={this.state.comment} // input controllato dallo state
            onChange={this.handleCommentChange} // aggiorno mentre scrivo
            placeholder="Scrivi un commento..."
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Voto</Form.Label>
          <Form.Select
            value={this.state.rate} // select controllata dallo state
            onChange={this.handleRateChange} // aggiorno quando cambio voto
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </Form.Select>
        </Form.Group>

        <Button type="submit" className="d-block mx-auto">
          Invia
        </Button>
      </Form>
    )
  }
}

export default AddComment
