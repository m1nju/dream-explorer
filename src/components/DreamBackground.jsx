import spaceBg2 from '../assets/bg2.png'
import './DreamBackground.css'

function DreamBackground() {
  return (
    <div
      className="dream-background"
      style={{
        backgroundImage: `url(${spaceBg2})`,
      }}
    >
      {/* =========================
          배경 빛
      ========================== */}

      <div className="space-glow glow-one" />
      <div className="space-glow glow-two" />


      {/* =========================
          픽셀 배경 별
      ========================== */}

      <div className="bg-pixel-star pixel-cross star-1 pixel-pop" />
      <div className="bg-pixel-star pixel-dot star-2" />
      <div className="bg-pixel-star pixel-diamond star-3 pixel-pop" />
      <div className="bg-pixel-star pixel-cluster star-4" />
      <div className="bg-pixel-star pixel-cross star-5 pixel-pop" />
      <div className="bg-pixel-star pixel-dot star-6" />
      <div className="bg-pixel-star pixel-diamond star-7" />
      <div className="bg-pixel-star pixel-cluster star-8 pixel-pop" />
      <div className="bg-pixel-star pixel-cross star-9" />
      <div className="bg-pixel-star pixel-dot star-10 pixel-pop" />


      {/* =========================
          픽셀 별똥별
      ========================== */}

      <div className="shooting-star shooting-star-1" />
      <div className="shooting-star shooting-star-2" />
      <div className="shooting-star shooting-star-3" />
      <div className="shooting-star shooting-star-4" />
      <div className="shooting-star shooting-star-5" />
      <div className="shooting-star shooting-star-6" />
      <div className="shooting-star shooting-star-7" />


      {/* =========================
          화면 전체 픽셀 스캔
      ========================== */}

      <div className="pixel-screen-overlay" />
    </div>
  )
}

export default DreamBackground