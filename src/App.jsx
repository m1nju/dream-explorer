import { useState } from 'react'
import './App.css'

import Intro from './components/Intro'
import DreamMap from './components/DreamMap'
import Game from './components/Game'

function App() {
  const [page, setPage] = useState('intro')

  return (
    <main className="dream-page">
      {page === 'intro' && (
        <Intro
          onEnter={() => setPage('map')}
        />
      )}

      {page === 'map' && (
        <DreamMap
          onBack={() => setPage('intro')}
          onGame={() => setPage('game')}
        />
      )}

      {page === 'game' && (
        <Game
          onBack={() => setPage('map')}
        />
      )}
    </main>
  )
}

export default App