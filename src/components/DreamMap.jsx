import { useEffect, useState } from 'react'
import './DreamMap.css'


function DreamMap({
  onBack,
  onGame,
  onLucky,
  onGuestbook,
  onCafe,
}) {
  const [mapReady, setMapReady] =
    useState(false)


  useEffect(() => {
    const timer = setTimeout(() => {
      setMapReady(true)
    }, 400)

    return () => {
      clearTimeout(timer)
    }
  }, [])


  return (
    <section className="dream-map">

      {/* =========================
          HEADER
      ========================== */}

      <div className="dream-map-header">

        <p className="dream-map-small">
          EXPLORE YOUR DREAM
        </p>

        <h1 className="dream-map-title">
          DREAM MAP
        </h1>

      </div>


      {/* =========================
          CONSTELLATION
      ========================== */}

      <div className="constellation-map">

        {/* 연결선 */}

        <svg
          className="constellation-lines"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >

          {/* GAME → GUESTBOOK */}
          <line
            x1="52"
            y1="17"
            x2="77"
            y2="57"
          />

          {/* GAME → LUCKY */}
          <line
            x1="52"
            y1="17"
            x2="30"
            y2="40"
          />

          {/* LUCKY → CAFE */}
          <line
            x1="30"
            y1="40"
            x2="48"
            y2="79"
          />

          {/* GUESTBOOK → CAFE */}
          <line
            x1="77"
            y1="57"
            x2="48"
            y2="79"
          />

        </svg>


        {/* =====================
            GAME
        ====================== */}

        <button
          className="
            map-point
            map-game
          "
          type="button"

          disabled={!mapReady}

          onClick={() => {
            if (!mapReady) return

            onGame()
          }}
        >

          <span className="map-label">
            GAME
          </span>

          <span className="map-star">
            ★
          </span>

        </button>


        {/* =====================
            LUCKY HYEONI
        ====================== */}

        <button
          className="
            map-point
            map-lucky
          "
          type="button"

          disabled={!mapReady}

          onClick={() => {
            if (!mapReady) return

            onLucky()
          }}
        >

          <span className="map-star">
            ★
          </span>

          <span className="map-label">
            LUCKY HYEONI
          </span>

        </button>


        {/* =====================
            GUESTBOOK
        ====================== */}

        <button
          className="
            map-point
            map-guestbook
          "
          type="button"
          onClick={onGuestbook}

          disabled={!mapReady}
        >

          <span className="map-star">
            ★
          </span>

          <span className="map-label">
            GUESTBOOK
          </span>

        </button>


        {/* =====================
            BIRTHDAY CAFE
        ====================== */}

        <button
          className="map-point map-cafe"
          type="button"
          onClick={() => {
            console.log('CAFE CLICK')
            onCafe()
          }}
        >
          <span className="map-star">
            ★
          </span>

          <span className="map-label">
            BIRTHDAY CAFE
          </span>
        </button>


        {/* =====================
            DECORATION
        ====================== */}

        <span className="
          map-dust
          dust-1
        ">
          ✦
        </span>

        <span className="
          map-dust
          dust-2
        ">
          ·
        </span>

        <span className="
          map-dust
          dust-3
        ">
          ✦
        </span>

        <span className="
          map-dust
          dust-4
        ">
          ·
        </span>

        <span className="
          map-dust
          dust-5
        ">
          ✦
        </span>

      </div>


      {/* =========================
          BACK
      ========================== */}

      <button
        className="dream-map-back"
        onClick={onBack}
      >
        ← BACK
      </button>

    </section>
  )
}


export default DreamMap