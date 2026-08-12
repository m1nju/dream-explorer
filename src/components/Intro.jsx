import { useState } from 'react'

function Intro({ onEnter }) {
  const [started, setStarted] = useState(false)

  return (
    <section className={`intro-screen ${started ? 'started' : ''}`}>
      <div className="space-glow glow-one" />
      <div className="space-glow glow-two" />

      <div className="star star-1">✦</div>
      <div className="star star-2">·</div>
      <div className="star star-3">✧</div>
      <div className="star star-4">⋆</div>
      <div className="star star-5">✦</div>

      <div className="shooting-star shooting-star-1" />
      <div className="shooting-star shooting-star-2" />

      {!started && (
        <div className="rocket-area">
          <p className="rocket-guide">CLICK TO START YOUR DREAM</p>

          <button
            className="rocket-button"
            onClick={() => setStarted(true)}
            aria-label="꿈 탐험 시작"
          >
            🚀
          </button>
        </div>
      )}

      {started && (
        <div className="intro-typography">
          <p className="intro-line line-1">
            상상만 했던 너의 소원은 뭐야?
          </p>

          <p className="intro-line line-2">
            그 꿈이 이루어지는 오늘!
          </p>

          <h1 className="intro-line line-3">
            상상이 현실이 되는
            <br />
            <strong>상현이날</strong>
          </h1>

          <button className="enter-button intro-line line-4" onClick={onEnter}>
            ENTER DREAM
          </button>
        </div>
      )}
    </section>
  )
}

export default Intro