import { Alert } from "react-bootstrap" // importo il componente Alert di Bootstrap

const Welcome = () => (
  // Alert = box evidenziato (stile bootstrap)
  <Alert className="text-center">
    {/* testo centrato */}
    <h1>Benvenuti in EpiBooks!</h1>
  </Alert>
)

export default Welcome // esporto il componente per usarlo in altre parti (es. App.jsx)
