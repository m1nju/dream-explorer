import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
} from 'react-router-dom'

import './App.css'

import Intro from './components/Intro'
import DreamMap from './components/DreamMap'
import Game from './components/Game'
import DreamBackground from './components/DreamBackground'
import LuckyHyeoni from './components/LuckyHyeoni'
import WishSky from './components/WishSky'
import Guestbook from './components/Guestbook'
import BirthdayCafe from './components/BirthdayCafe'


function AppRoutes() {
  const navigate = useNavigate()

  return (
    <main className="dream-page">

      <Routes>

        {/* =========================
            INTRO
        ========================== */}

        <Route
          path="/"
          element={
            <div className="dream-shell">

              <DreamBackground />

              <div className="dream-content">

                <Intro
                  onEnter={() =>
                    navigate('/map')
                  }
                />

              </div>

            </div>
          }
        />


        {/* =========================
            DREAM MAP
        ========================== */}

        <Route
          path="/map"
          element={
            <div className="dream-shell">

              <DreamBackground />

              <div className="dream-content">

                <DreamMap
                  onBack={() =>
                    navigate(-1)
                  }

                  onGame={() =>
                    navigate('/game')
                  }

                  onLucky={() =>
                    navigate('/lucky')
                  }

                  onGuestbook={() =>
                    navigate('/guestbook')
                  }

                  onCafe={() =>
                    navigate('/cafe')
                  }
                />

              </div>

            </div>
          }
        />


        {/* =========================
            LUCKY HYEONI
        ========================== */}

        <Route
          path="/lucky"
          element={
            <div className="dream-shell">

              <DreamBackground />

              <div className="dream-content">

                <LuckyHyeoni
                  onBack={() =>
                    navigate(-1)
                  }

                  onGo={() =>
                    navigate('/wishes')
                  }
                />

              </div>

            </div>
          }
        />


        {/* =========================
            WISH SKY
        ========================== */}

        <Route
          path="/wishes"
          element={
            <div className="dream-shell">

              <DreamBackground />

              <div className="dream-content">

                <WishSky
                  onBack={() =>
                    navigate(-1)
                  }
                />

              </div>

            </div>
          }
        />


        {/* =========================
            GUESTBOOK
        ========================== */}

        <Route
          path="/guestbook"
          element={
            <div className="dream-shell">

              <DreamBackground />

              <div className="dream-content">

                <Guestbook
                  onBack={() =>
                    navigate(-1)
                  }
                />

              </div>

            </div>
          }
        />


        {/* =========================
            BIRTHDAY CAFE
        ========================== */}

        <Route
          path="/cafe"
          element={
            <div className="dream-shell">

              <DreamBackground />

              <div className="dream-content">

                <BirthdayCafe
                  onBack={() =>
                    navigate(-1)
                  }
                />

              </div>

            </div>
          }
        />


        {/* =========================
            GAME
        ========================== */}

        <Route
          path="/game"
          element={
            <Game
              onBack={() =>
                navigate(-1)
              }
            />
          }
        />


        {/* =========================
            잘못된 주소
        ========================== */}

        <Route
          path="*"
          element={
            <div className="dream-shell">

              <DreamBackground />

              <div className="dream-content">

                <Intro
                  onEnter={() =>
                    navigate('/map')
                  }
                />

              </div>

            </div>
          }
        />

      </Routes>

    </main>
  )
}


function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}


export default App