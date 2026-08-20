import {
  useEffect,
  useRef,
  useState,
} from 'react'

import dogStar from '../assets/dog-star.png'

import './Intro.css'


function Intro({ onEnter }) {
  const [started, setStarted] =
    useState(false)

  const [particles, setParticles] =
    useState([])

  const dogRef =
    useRef(null)


  /* ==============================
     강아지 비행 파티클
  ============================== */

  useEffect(() => {
    if (started) return

    const startTime =
      Date.now()


    const particleInterval =
      setInterval(() => {
        const dog =
          dogRef.current

        if (!dog) return


        const elapsed =
          Date.now() -
          startTime


        if (elapsed > 3200) {
          clearInterval(
            particleInterval
          )

          return
        }


        const rect =
          dog.getBoundingClientRect()


        const colors = [
          '#ff9fc5',
          '#ff7faa',
          '#9feeff',
          '#62dff7',
          '#c995ff',
          '#965cff',
          '#ffe96f',
          '#fff4b0',
          '#ffffff',
        ]


        const color =
          colors[
            Math.floor(
              Math.random() *
              colors.length
            )
          ]


        const random =
          Math.random()


        let type =
          'pixel'


        if (random > 0.82) {
          type =
            'cross'
        }

        else if (
          random > 0.62
        ) {
          type =
            'mini-comet'
        }


        const newParticle = {
          id:
            `${Date.now()}-${Math.random()}`,

          type,
          color,

          x:
            rect.left +
            rect.width * 0.18 +
            Math.random() * 14,

          y:
            rect.top +
            rect.height * 0.72 +
            Math.random() * 16 -
            8,

          size:
            type === 'cross'
              ? Math.floor(
                  Math.random() *
                    3 +
                    3
                )
              : Math.floor(
                  Math.random() *
                    3 +
                    2
                ),

          offsetX:
            Math.random() *
              28 -
            14,

          offsetY:
            Math.random() *
              28 -
            14,

          duration:
            Math.random() *
              0.4 +
            0.7,
        }


        setParticles(
          (prev) => [
            ...prev,
            newParticle,
          ]
        )


        setTimeout(() => {
          setParticles(
            (prev) =>
              prev.filter(
                (particle) =>
                  particle.id !==
                  newParticle.id
              )
          )
        }, 1200)

      }, 25)


    return () => {
      clearInterval(
        particleInterval
      )
    }

  }, [started])


  return (
    <section className="intro-screen">

      {/* =========================
          강아지 비행 흔적
      ========================== */}

      <div className="trail-layer">

        {particles.map(
          (particle) => (

            <span
              key={particle.id}

              className={`
                trail-particle
                ${particle.type}
              `}

              style={{
                left:
                  `${particle.x}px`,

                top:
                  `${particle.y}px`,

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

          )
        )}

      </div>


      {/* =========================
          클릭 전
      ========================== */}

      {!started && (

        <div
          className="dog-flight"
          ref={dogRef}
        >

          <button
            className="dog-button"

            type="button"

            onClick={() =>
              setStarted(true)
            }

            aria-label="꿈 탐험 시작"
          >

            <img
              className="dog-star"

              src={dogStar}

              alt="별을 타고 있는 강아지"

              draggable="false"
            />


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

            <span>
              CLICK TO START
            </span>

            <strong>
              YOUR DREAM
            </strong>

            <i className="guide-arrow">
              ▼
            </i>

          </p>

        </div>

      )}


      {/* =========================
          클릭 후 타이포
      ========================== */}

      {started && (
  <div className="intro-typography">

    <div className="intro-line line-1">
      <p
        className="dream-text dream-text-small"
        data-text="상상만 했던 너의 소원은 뭐야?"
      >
        상상만 했던 너의 소원은 뭐야?
      </p>
    </div>


    <div className="intro-line line-2">
      <p
        className="dream-text dream-text-medium"
        data-text="그 꿈이 이루어지는 오늘!"
      >
        그 꿈이 이루어지는 오늘!
      </p>
    </div>


    <div className="intro-line line-3">

      <p
        className="dream-text dream-text-medium"
        data-text="상상이 현실이 되는"
      >
        상상이 현실이 되는
      </p>


      <h1
        className="dream-text dream-main-title"
        data-text="상현이날"
      >
        상현이날
      </h1>

    </div>


    <button
      className="enter-button intro-line line-4"
      type="button"
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