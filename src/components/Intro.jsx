import { useEffect, useRef, useState } from 'react'
import dogStar from '../assets/dog-star.png'
import spaceBg from '../assets/space-bg.jpg'
import spaceBg2 from '../assets/bg2.png'
import spaceBg3 from '../assets/bf.jpeg'

function Intro({ onEnter }) {
  const [started, setStarted] = useState(false)
  const [particles, setParticles] = useState([])

  const dogRef = useRef(null)

  useEffect(() => {
    if (started) return

    const startTime = Date.now()

    const particleInterval = setInterval(() => {
      const dog = dogRef.current

      if (!dog) return

      const elapsed = Date.now() - startTime

      // 강아지가 날아다니는 3.2초 동안만 파티클 생성
      if (elapsed > 3200) {
        clearInterval(particleInterval)
        return
      }

      const rect = dog.getBoundingClientRect()

      const colors = [
        '#ff9fc5', // 핑크
        '#ff7faa', // 진한 핑크
        '#9feeff', // 하늘
        '#62dff7', // 청록 하늘
        '#c995ff', // 연보라
        '#965cff', // 보라
        '#ffe96f', // 노랑
        '#fff4b0', // 연노랑
        '#ffffff', // 흰색
      ]

      const color =
        colors[Math.floor(Math.random() * colors.length)]

      const random = Math.random()

      let type = 'pixel'

      if (random > 0.82) {
        type = 'cross'
      } else if (random > 0.62) {
        type = 'mini-comet'
      }

      const newParticle = {
        id: `${Date.now()}-${Math.random()}`,

        type,
        color,

        // 강아지 별 뒤쪽 근처
        x: rect.left + rect.width * 0.18 + Math.random() * 14,
        y: rect.top + rect.height * 0.72 + Math.random() * 16 - 8,

        size:
          type === 'cross'
            ? Math.floor(Math.random() * 3 + 3)
            : Math.floor(Math.random() * 3 + 2),

        offsetX: Math.random() * 28 - 14,
        offsetY: Math.random() * 28 - 14,

        duration: Math.random() * 0.4 + 0.7,
      }

      setParticles((prev) => [...prev, newParticle])

      // 파티클 정리
      setTimeout(() => {
        setParticles((prev) =>
          prev.filter(
            (particle) => particle.id !== newParticle.id
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
      style={{ backgroundImage: `url(${spaceBg2})` }}
    >
      {/* 배경 빛 */}
      <div className="space-glow glow-one" />
      <div className="space-glow glow-two" />

      {/* 배경 별 */}
      <div className="star star-1">✦</div>
      <div className="star star-2">·</div>
      <div className="star star-3">✧</div>
      <div className="star star-4">⋆</div>
      <div className="star star-5">✦</div>

  
{/* 픽셀 별똥별 */}
<div className="shooting-star shooting-star-1" />
<div className="shooting-star shooting-star-2" />
<div className="shooting-star shooting-star-3" />
<div className="shooting-star shooting-star-4" />
<div className="shooting-star shooting-star-5" />
<div className="shooting-star shooting-star-6" />
<div className="shooting-star shooting-star-7" />

      {/* 강아지가 지나간 자리에 남는 픽셀 파티클 */}
      <div className="trail-layer">
        {particles.map((particle) => (
          <span
            key={particle.id}
            className={`trail-particle ${particle.type}`}
            style={{
              left: `${particle.x}px`,
              top: `${particle.y}px`,

              '--pixel-size': `${particle.size}px`,
              '--particle-color': particle.color,

              '--move-x': `${particle.offsetX}px`,
              '--move-y': `${particle.offsetY}px`,
              '--duration': `${particle.duration}s`,
            }}
          />
        ))}
      </div>

      {/* 클릭 전 : 강아지 */}
      {!started && (
        <div className="dog-flight" ref={dogRef}>
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
          </button>

          <p className="dog-guide">
            CLICK TO START YOUR DREAM
          </p>
        </div>
      )}

      {/* 클릭 후 : 타이포 */}
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

          <button
            className="enter-button intro-line line-4"
            onClick={onEnter}
          >
            ENTER DREAM
          </button>
        </div>
      )}
    </section>
  )
}

export default Intro