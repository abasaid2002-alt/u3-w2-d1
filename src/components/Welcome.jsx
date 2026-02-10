import { Alert } from "react-bootstrap" // importo il componente Alert di Bootstrap

const Welcome = ({ subtitle }) => (
  // Alert = box evidenziato (stile bootstrap)
  <Alert className="text-center">
    <h1 className="mb-1">Benvenuti in EpiBooks!</h1>

    {/* se mi passi subtitle da App, lo mostro */}
    {subtitle && <p className="mb-0">{subtitle}</p>}
  </Alert>
)

export default Welcome
