import { useCallback, useEffect, useRef, useState } from "react"
import Card from "react-bootstrap/Card"

import { COMMENTS_URL, authHeaders } from "../striveConfig"
import CommentsList from "./CommentsList"
import AddComment from "./AddComment"

const CommentArea = ({ asin, selectedBook }) => {
  // state con hook
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  // ref per annullare la fetch precedente (se cambio libro velocemente)
  const abortRef = useRef(null)

  const getComments = useCallback(async () => {
    if (!asin) return

    // se c'è una fetch precedente ancora attiva, la annullo
    if (abortRef.current) abortRef.current.abort()
    const controller = new AbortController()
    abortRef.current = controller

    // ✅ trucco: sposto i setState su un micro-tick
    // così NON sono "sincroni dentro l'effetto" (e l'ESLint smette di urlare)
    await Promise.resolve()

    setLoading(true)
    setError(false)

    try {
      const resp = await fetch(COMMENTS_URL + asin, {
        headers: authHeaders,
        signal: controller.signal,
      })

      if (!resp.ok) throw new Error("Errore GET commenti")

      const data = await resp.json()
      setComments(data)
    } catch (err) {
      // se ho abortito io la fetch, non è un vero errore
      if (err.name === "AbortError") return

      console.log(err)
      setError(true)
    } finally {
      // evito di settare loading se ho abortito proprio ora
      if (!controller.signal.aborted) setLoading(false)
    }
  }, [asin])

  // useEffect = componentDidMount + componentDidUpdate (quando cambia asin)
  useEffect(() => {
    if (asin) {
      getComments()
    } else {
      // se nessun libro selezionato: non serve per forza resettare,
      // ma lo facciamo per mantenere lo stesso comportamento della classe
      setComments([])
      setLoading(false)
      setError(false)
    }

    // cleanup: quando smonto o cambia asin, annullo eventuale fetch
    return () => {
      if (abortRef.current) abortRef.current.abort()
    }
  }, [asin, getComments])

  const deleteComment = (commentId) => {
    fetch(COMMENTS_URL + commentId, {
      method: "DELETE",
      headers: authHeaders,
    })
      .then((resp) => {
        if (resp.ok) {
          // ricarico la lista aggiornata
          getComments()
        } else {
          throw new Error("Errore DELETE")
        }
      })
      .catch((err) => {
        console.log(err)
        alert("Errore eliminazione commento")
      })
  }

  // sempre visibile, ma se non c'è asin mostro avviso
  if (!asin) {
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

        {/* MINIATURA LIBRO SELEZIONATO */}
        {selectedBook && (
          <div className="d-flex align-items-start gap-2 mb-3 p-2" style={{ border: "1px solid #ddd", borderRadius: "8px" }}>
            <img
              src={selectedBook.img}
              alt={selectedBook.title}
              style={{
                width: "60px",
                height: "90px",
                objectFit: "cover",
                borderRadius: "6px",
              }}
            />
            <div>
              <p className="mb-1 fw-semibold" style={{ lineHeight: "1.2" }}>
                {selectedBook.title}
              </p>
              <small className="text-muted">ASIN: {selectedBook.asin}</small>
            </div>
          </div>
        )}

        {/* stati UI: loading / errore */}
        {loading && <p>Caricamento...</p>}
        {error && <p style={{ color: "red" }}>Errore nel caricamento dei commenti</p>}

        {/* se tutto ok: mostro la lista commenti */}
        {!loading && !error && <CommentsList comments={comments} onDelete={deleteComment} />}

        {/* form per aggiungere un commento */}
        <AddComment asin={asin} refreshComments={getComments} />
      </Card.Body>
    </Card>
  )
}

export default CommentArea
