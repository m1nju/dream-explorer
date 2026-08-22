import {
  useEffect,
  useRef,
  useState,
} from 'react'

import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from 'react-router-dom'

import bgm from './assets/bgm.wav'

import './App.css'

import Intro from './components/Intro'
import DreamMap from './components/DreamMap'
import Game from './components/Game'
import DreamBackground from './components/DreamBackground'
import LuckyHyeoni from './components/LuckyHyeoni'
import WishSky from './components/WishSky'
import DreamCall from './components/DreamCall'
import BirthdayCafe from './components/BirthdayCafe'



function AppRoutes() {
  const navigate = useNavigate()
  const location = useLocation()

  const bgmRef = useRef(null)
  const bgmStartedRef = useRef(false)

  const [bgmMuted, setBgmMuted] =
  useState(false)


  const startBgm = () => {
  const audio = bgmRef.current

  if (!audio) return

  bgmStartedRef.current = true

  audio.volume = 0.35

  if (!bgmMuted) {
    audio.play().catch(() => {})
  }
}

const toggleBgm = () => {
  const audio = bgmRef.current

  if (!audio) return


  setBgmMuted((prev) => {
    const next = !prev

    if (next) {
      // OFF
      audio.pause()
    }

    else {
      // ON
      bgmStartedRef.current = true
      audio.play().catch(() => {})
    }

    return next
  })
}

  useEffect(() => {
  const audio = bgmRef.current

  if (!audio) return


  // 게임에서는 무조건 BGM 정지
  if (location.pathname === '/game') {
    audio.pause()
    return
  }


  // 사용자가 OFF 해놨으면 재생 금지
  if (bgmMuted) {
    audio.pause()
    return
  }


  // 이미 한 번 시작된 BGM만 재생
  if (bgmStartedRef.current) {
    audio.play().catch(() => {})
  }

}, [
  location.pathname,
  bgmMuted,
])
  

  return (
  <>
    <audio
      ref={bgmRef}
      src={bgm}
      loop
      preload="auto"
    />

    <button
  className="bgm-toggle"
  type="button"
  onClick={toggleBgm}
  aria-label={
    bgmMuted
      ? '배경음악 켜기'
      : '배경음악 끄기'
  }
>
  <span className="bgm-toggle-icon">
    {bgmMuted ? '♪' : '♫'}
  </span>

  <span>
    BGM {bgmMuted ? 'OFF' : 'ON'}
  </span>
</button>

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
                  onStart={startBgm}

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

                  onDreamCall={() =>
                    navigate('/dream-call')
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
            DREAM CALL
        ========================== */}

        <Route
          path="/dream-call"
          element={
            <div className="dream-shell">

              <DreamBackground />

              <div className="dream-content">

                <DreamCall
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
                  onStart={startBgm}

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
    </>
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