import { useEffect, useRef, useState } from 'react'
import dogStar from '../assets/dog-star.png'
import spaceBg2 from '../assets/bg2.png'
// Intro.jsx
import './Intro.css'

function Intro({ onEnter }) {
  const [started, setStarted] = useState(false)
  const [particles, setParticles] = useState([])

  const dogRef = useRef(null)

  useEffect(() => {
    // 강아지를 클릭해서 다음 화면으로 넘어가면
    // 더 이상 비행 파티클을 만들지 않음
    if (started) return

    const startTime = Date.now()

    const particleInterval = setInterval(() => {
      const dog = dogRef.current

      if (!dog) return

      const elapsed = Date.now() - startTime

      // 강아지 비행시간 = CSS와 동일한 3.2초
      if (elapsed > 3200) {
        clearInterval(particleInterval)
        return
      }

      const rect = dog.getBoundingClientRect()

      // 강아지 뒤에 뿌려질 픽셀 색상
      const colors = [
        '#ff9fc5', // 핑크
        '#ff7faa', // 진한 핑크
        '#9feeff', // 하늘
        '#62dff7', // 청록
        '#c995ff', // 연보라
        '#965cff', // 보라
        '#ffe96f', // 노랑
        '#fff4b0', // 연노랑
        '#ffffff', // 흰색
      ]

      const color =
        colors[Math.floor(Math.random() * colors.length)]

      const random = Math.random()

      // 기본은 작은 픽셀
      let type = 'pixel'

      // 일부는 십자 별
      if (random > 0.82) {
        type = 'cross'
      }

      // 일부는 작은 픽셀 별똥별
      else if (random > 0.62) {
        type = 'mini-comet'
      }

      const newParticle = {
        id: `${Date.now()}-${Math.random()}`,

        type,
        color,

        // 강아지 별 뒤쪽 근처에 파티클 생성
        x:
          rect.left +
          rect.width * 0.18 +
          Math.random() * 14,

        y:
          rect.top +
          rect.height * 0.72 +
          Math.random() * 16 -
          8,

        // 파티클 크기
        size:
          type === 'cross'
            ? Math.floor(Math.random() * 3 + 3)
            : Math.floor(Math.random() * 3 + 2),

        // 사라질 때 살짝 흩어지는 방향
        offsetX:
          Math.random() * 28 - 14,

        offsetY:
          Math.random() * 28 - 14,

        // 파티클마다 사라지는 속도 조금씩 다르게
        duration:
          Math.random() * 0.4 + 0.7,
      }

      setParticles((prev) => [
        ...prev,
        newParticle,
      ])

      // 사용 끝난 파티클 제거
      setTimeout(() => {
        setParticles((prev) =>
          prev.filter(
            (particle) =>
              particle.id !== newParticle.id
          )
        )
      }, 1200)
    }, 25)

    return () => {
      clearInterval(particleInterval)
    }
  }, [started])

  return (
    <section
      className="intro-screen"
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
          강아지 비행 흔적
      ========================== */}

      <div className="trail-layer">
        {particles.map((particle) => (
          <span
            key={particle.id}
            className={`trail-particle ${particle.type}`}
            style={{
              left: `${particle.x}px`,
              top: `${particle.y}px`,

              '--pixel-size':
                `${particle.size}px`,

              '--particle-color':
                particle.color,

              '--move-x':
                `${particle.offsetX}px`,

              '--move-y':
                `${particle.offsetY}px`,

              '--duration':
                `${particle.duration}s`,
            }}
          />
        ))}
      </div>


      {/* =========================
          클릭 전 : 강아지
      ========================== */}

      {/* 클릭 전 : 강아지 */}
{!started && (
  <div
    className="dog-flight"
    ref={dogRef}
  >
    <button
      className="dog-button"
      onClick={() => setStarted(true)}
      aria-label="꿈 탐험 시작"
    >
      <img
        className="dog-star"
        src={dogStar}
        alt="별을 타고 있는 강아지"
      />

      {/* 중앙 도착 후 주변에 떠다니는 픽셀 */}
      <div className="idle-particles">
        <span className="idle-pixel idle-1" />
        <span className="idle-pixel idle-2" />
        <span className="idle-pixel idle-3" />
        <span className="idle-pixel idle-4" />
        <span className="idle-pixel idle-5" />
        <span className="idle-pixel idle-6" />
      </div>
    </button>

    <p className="dog-guide">
      <span>CLICK TO START</span>
      <strong>YOUR DREAM</strong>
      <i className="guide-arrow">▼</i>
    </p>
  </div>
)}


      {/* =========================
          클릭 후 : 타이포
      ========================== */}

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

            <strong>
              상현이날
            </strong>
          </h1>

          <button
            className="enter-button intro-line line-4"
            onClick={onEnter}
          >
            ENTER DREAM
          </button>
        </div>
      )}

      {/* 화면 전체 픽셀 스캔 오버레이 */}
<div className="pixel-screen-overlay" />
    </section>
  )
}

export default Intro