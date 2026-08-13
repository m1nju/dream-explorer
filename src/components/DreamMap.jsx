// DreamMap.jsx
import './DreamMap.css'

function DreamMap({ onBack, onGame }) {
  return (
    <section className="dream-map">
      <h1>DREAM MAP</h1>

      <p>꿈의 세계에 도착했습니다</p>

      <button onClick={onGame}>
        START GAME
      </button>

      <button onClick={onBack}>
        ← BACK
      </button>
    </section>
  )
}

export default DreamMap