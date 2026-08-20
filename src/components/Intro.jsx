import { useEffect, useRef, useState } from 'react'

import dogStar from '../assets/dog-star.png'

import './Intro.css'


function Intro({ onEnter }) {
  const [started, setStarted] = useState(false)
  const [particles, setParticles] = useState([])

  const dogRef = useRef(null)


  // ==============================
  // 강아지 비행 파티클
  // ==============================

  useEffect(() => {
    /*
      강아지를 클릭해서
      타이포 화면으로 넘어가면
      더 이상 비행 파티클 생성 안 함
    */

    if (started) return


    const startTime = Date.now()


    const particleInterval =
      setInterval(() => {

        const dog =
          dogRef.current

        if (!dog) return


        const elapsed =
          Date.now() - startTime


        /*
          강아지 비행시간
          CSS dogFlight와 동일
        */

        if (elapsed > 3200) {
          clearInterval(
            particleInterval
          )

          return
        }


        const rect =
          dog.getBoundingClientRect()


        // 파티클 색상

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


        /*
          기본:
          작은 픽셀
        */

        let type = 'pixel'


        /*
          일부는 십자 별
        */

        if (random > 0.82) {
          type = 'cross'
        }


        /*
          일부는 작은 별똥별
        */

        else if (random > 0.62) {
          type = 'mini-comet'
        }


        const newParticle = {
          id:
            `${Date.now()}-${Math.random()}`,

          type,
          color,


          /*
            강아지 별 뒤쪽에 생성
          */

          x:
            rect.left +
            rect.width * 0.18 +
            Math.random() * 14,

          y:
            rect.top +
            rect.height * 0.72 +
            Math.random() * 16 -
            8,


          /*
            파티클 크기
          */

          size:
            type === 'cross'
              ? Math.floor(
                  Math.random() * 3 + 3
                )
              : Math.floor(
                  Math.random() * 3 + 2
                ),


          /*
            사라질 때
            살짝 흩어지는 방향
          */

          offsetX:
            Math.random() * 28 - 14,

          offsetY:
            Math.random() * 28 - 14,


          /*
            파티클마다
            사라지는 속도 조금씩 다르게
          */

          duration:
            Math.random() * 0.4 + 0.7,
        }


        setParticles(
          (prev) => [
            ...prev,
            newParticle,
          ]
        )


        /*
          사용 끝난 파티클 제거
        */

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


  // ==============================
  // 화면
  // ==============================

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
          클릭 전 : 강아지
      ========================== */}

      {!started && (

        <div
          className="dog-flight"
          ref={dogRef}
        >

          <button
            className="dog-button"

            onClick={() =>
              setStarted(true)
            }

            aria-label="꿈 탐험 시작"
          >

            <img
              className="dog-star"

              src={dogStar}

              alt="별을 타고 있는 강아지"
            />


            {/* 중앙 도착 후
                주변에 떠다니는 픽셀 */}

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
            className="
              enter-button
              intro-line
              line-4
            "

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