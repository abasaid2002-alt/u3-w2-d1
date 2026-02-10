import { useEffect, useState } from "react"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import { COMMENTS_URL, authHeaders } from "../striveConfig"

const AddComment = ({ asin, refreshComments }) => {
  // ✅ UN SOLO useState per tutto il form (comment + rate)
  const [formData, setFormData] = useState({
    comment: "",
    rate: "1",
  })

  // success lo tengo separato (non è un campo del form)
  const [success, setSuccess] = useState(false)

  const handleChange = (field) => (e) => {
    // aggiorno SOLO il campo che cambia, copiando l'oggetto
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }))
  }

  const sendComment = (e) => {
    e.preventDefault()

    const newComment = {
      comment: formData.comment,
      rate: formData.rate,
      elementId: asin,
    }

    fetch(COMMENTS_URL, {
      method: "POST",
      headers: {
        ...authHeaders,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newComment),
    })
      .then((resp) => {
        if (!resp.ok) throw new Error("Errore POST")

        // reset form + messaggio successo
        setFormData({ comment: "", rate: "1" })
        setSuccess(true)

        // ricarico commenti nel padre
        refreshComments()
      })
      .catch((err) => {
        console.log(err)
        alert("Errore invio commento")
      })
  }

  // useEffect per nascondere il messaggio dopo 3 secondi (con cleanup)
  useEffect(() => {
    if (!success) return

    const timer = setTimeout(() => setSuccess(false), 3000)
    return () => clearTimeout(timer) // cleanup
  }, [success])

  return (
    <Form onSubmit={sendComment}>
      <h6 className="mt-3">Aggiungi commento</h6>

      {/* messaggio di successo */}
      {success && (
        <div className="alert alert-success py-2" role="alert">
          Commento inviato con successo ✅
        </div>
      )}

      <Form.Group className="mb-2">
        <Form.Label>Commento</Form.Label>
        <Form.Control as="textarea" rows={2} value={formData.comment} onChange={handleChange("comment")} placeholder="Scrivi un commento..." required />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Voto</Form.Label>
        <Form.Select value={formData.rate} onChange={handleChange("rate")}>
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

export default AddComment
