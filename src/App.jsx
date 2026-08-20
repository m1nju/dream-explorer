import { useState } from 'react'
import './App.css'

import Intro from './components/Intro'
import DreamMap from './components/DreamMap'
import Game from './components/Game'
import DreamBackground from './components/DreamBackground'
import LuckyHyeoni from './components/LuckyHyeoni'
import WishSky from './components/WishSky'
import Guestbook from './components/Guestbook'
import BirthdayCafe from './components/BirthdayCafe'



function App() {
  const [page, setPage] = useState('intro')

  const isDreamPage =
  page === 'intro' ||
  page === 'map' ||
  page === 'lucky' ||
  page === 'wishSky' ||
  page === 'guestbook' ||
  page === 'cafe'

  return (
    <main className="dream-page">

      {/* =========================
          INTRO / DREAM MAP
          공통 배경 유지
      ========================== */}

      {isDreamPage && (
        <div className="dream-shell">

          <DreamBackground />

          <div className="dream-content">

            {page === 'intro' && (
              <Intro
                onEnter={() =>
                  setPage('map')
                }
              />
            )}


            {page === 'map' && (
            <DreamMap
              onBack={() =>
                setPage('intro')
              }

              onGame={() =>
                setPage('game')
              }

              onLucky={() =>
                setPage('lucky')
              }

              onGuestbook={() =>
                setPage('guestbook')
              }

              onCafe={() =>
              setPage('cafe')
            }
            />
          )}

              {page === 'lucky' && (
                <LuckyHyeoni
                  onBack={() =>
                    setPage('map')
                  }

                  onGo={() =>
                    setPage('wishSky')
                  }
                />
              )}

              {page === 'wishSky' && (
                <WishSky
                  onBack={() =>
                    setPage('map')
                  }
                />
              )}

              {page === 'guestbook' && (
              <Guestbook
                onBack={() =>
                  setPage('map')
                }
              />
            )}

            {page === 'cafe' && (
          <BirthdayCafe
            onBack={() =>
              setPage('map')
            }
          />
        )}

          </div>

        </div>
      )}


      {/* =========================
          GAME
      ========================== */}

      {page === 'game' && (
        <Game
          onBack={() =>
            setPage('map')
          }
        />
      )}

    </main>
  )
}


export default App