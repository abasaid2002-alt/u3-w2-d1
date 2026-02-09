import { Component } from "react"
import SingleComment from "./SingleComment"

class CommentsList extends Component {
  render() {
    const { comments, onDelete } = this.props
    // comments = array di commenti
    // onDelete = funzione per eliminare (arriva dal padre)

    // se non ci sono commenti, mostro un messaggio
    if (comments.length === 0) {
      return <p className="text-muted">Nessun commento per questo libro.</p>
    }

    return (
      // lista HTML che conterrà tutti i commenti
      <ul className="mb-0 ps-3">
        {/* ciclo tutti i commenti e per ognuno creo un SingleComment */}
        {comments.map((c) => (
          <SingleComment
            key={c._id} // key unica per React (id del commento)
            commentObj={c} // passo tutto l’oggetto commento al figlio
            onDelete={onDelete} // passo la funzione delete al figlio
          />
        ))}
      </ul>
    )
  }
}

export default CommentsList
