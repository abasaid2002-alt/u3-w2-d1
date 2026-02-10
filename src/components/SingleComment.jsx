import Button from "react-bootstrap/Button"

// Function Component: riceve props e renderizza direttamente
const SingleComment = ({ commentObj, onDelete }) => {
  // commentObj = singolo commento (comment, rate, _id, ecc.)
  // onDelete = funzione che elimina (arriva dal padre)

  return (
    <li className="mb-2">
      {/* wrapper flex: testo a sinistra, bottone a destra */}
      <div className="d-flex align-items-center">
        {/* area testo (si allarga) */}
        <div className="flex-grow-1 me-2" style={{ minWidth: 0 }}>
          {/* testo del commento (va a capo se lungo) */}
          <div className="text-break">{commentObj.comment}</div>

          {/* sotto mostro il voto */}
          <small className="d-block mt-1 fw-semibold">
            Voto: <span className="fs-6">{commentObj.rate}/5</span>
          </small>
        </div>

        {/* bottone elimina a destra (non si restringe) */}
        <Button
          className="flex-shrink-0"
          variant="outline-danger"
          size="sm"
          onClick={() => onDelete(commentObj._id)} // quando clicco chiamo delete passando l'id
          title="Elimina"
        >
          🗑️
        </Button>
      </div>
    </li>
  )
}

export default SingleComment
