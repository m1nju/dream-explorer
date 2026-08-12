import { useState } from 'react'
import './App.css'

import Intro from './components/Intro'
import DreamMap from './components/DreamMap'

function App() {
  const [page, setPage] = useState('intro')

  return (
    <main className="dream-page">
      {page === 'intro' ? (
        <Intro onEnter={() => setPage('map')} />
      ) : (
        <DreamMap onBack={() => setPage('intro')} />
      )}
    </main>
  )
}

export default App