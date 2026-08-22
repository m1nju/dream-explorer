import {
  useEffect,
  useRef,
  useState,
} from 'react'

import dogStar from '../assets/dog-star.png'

import './Intro.css'


function Intro({
  onEnter,
  onStart,
}) {

  const [started, setStarted] =
    useState(false)

  const [particles, setParticles] =
    useState([])

  const dogRef =
    useRef(null)

  const [introStage, setIntroStage] =
  useState(0)

  const [skipped, setSkipped] =
  useState(false)

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

  /* ==============================
   오프닝 시퀀스
============================== */

useEffect(() => {
  if (!started || skipped) return

  const timers = [
    setTimeout(() => setIntroStage(1), 600),
    setTimeout(() => setIntroStage(2), 3800),
    setTimeout(() => setIntroStage(3), 7200),
    setTimeout(() => setIntroStage(4), 10600),

    setTimeout(() => setIntroStage(5), 11900),

    setTimeout(() => setIntroStage(6), 15900),
    setTimeout(() => setIntroStage(7), 19500),
    setTimeout(() => setIntroStage(8), 23500),
    setTimeout(() => setIntroStage(9), 27900),
    setTimeout(() => setIntroStage(10), 31900),
    setTimeout(() => setIntroStage(11), 35900),

    setTimeout(() => setIntroStage(12), 39900),
  ]

  return () => {
    timers.forEach((timer) =>
      clearTimeout(timer)
    )
  }
}, [started, skipped])


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

            onClick={() => {
              onStart?.()
              setStarted(true)
            }}

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
    클릭 후 오프닝
========================== */}

{started && (
  <div className="opening-sequence">

    {/* 검은 배경 */}
    {introStage <= 4 && (
      <div className="opening-black" />
    )}


    {/* =====================
        첫 번째 나레이션
    ====================== */}

    {introStage === 1 && (
      <p
        key="opening-1"
        className="opening-narration"
      >
        2026년 9월 19일…
      </p>
    )}


    {introStage === 2 && (
      <p
        key="opening-2"
        className="opening-narration"
      >
        20살 첫 생일을 맞은 상현이는
      </p>
    )}


    {introStage === 3 && (
      <p
        key="opening-3"
        className="opening-narration"
      >
        잠에 들게 되는데…
      </p>
    )}


    {/* =====================
        눈 깜빡임
    ====================== */}

    {introStage === 5 && (
      <div className="blink-screen">
        <div className="eyelid eyelid-top" />
        <div className="eyelid eyelid-bottom" />
      </div>
    )}


    {/* =====================
        꿈나라에서 눈 뜸
    ====================== */}

    {introStage === 6 && (
      <p
        key="opening-6"
        className="opening-narration dream-narration"
      >
        눈을 떠 보니까 여긴… 어디?
      </p>
    )}


    {introStage === 7 && (
      <p
        key="opening-7"
        className="opening-narration dream-narration"
      >
        주변에는 구름과 별이
        <br />
        둥둥 떠다니는… 꿈나라?!
      </p>
    )}


    {/* =====================
        세계관 설명
    ====================== */}

    {introStage === 8 && (
      <div
        key="opening-8"
        className="opening-narration dream-narration"
      >
        <p>
          꿈 탐험을 하게 된 상현이
        </p>

        <p>
          그리고 상현이와 같이
          <br />
          꿈나라 탐험을 하게 된 백구단
        </p>
      </div>
    )}


    {introStage === 9 && (
      <p
        key="opening-9"
        className="opening-narration dream-narration"
      >
        과연 상현이가
        <br />
        이루고 싶었던 소원은?
      </p>
    )}


    {introStage === 10 && (
      <p
        key="opening-10"
        className="opening-narration dream-narration"
      >
        소원을 이루어주는
        <br />
        요술램프 지니… 대신
      </p>
    )}


    {introStage === 11 && (
  <p
  key="opening-11"
  className="opening-narration dream-narration"
>
  행운강아지 혀니와 함께해요
</p>
)}


    {/* =====================
        최종 타이틀
    ====================== */}

    {introStage === 12 && (
      <div className="intro-typography final-title">

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
        <span className="enter-star">✦</span>
        탐험하기
        <span className="enter-arrow">→</span>
      </button>

      </div>
    )}


    {/* SKIP */}
    {introStage < 12 && (
      <button
        type="button"
        className="opening-skip"
        onClick={() => {
        setSkipped(true)
        setIntroStage(12)
      }}
      >
        SKIP &gt;
      </button>
    )}

  </div>
)}

    </section>
  )
}


export default Intro