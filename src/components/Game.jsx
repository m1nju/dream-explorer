import { useEffect, useRef, useState } from 'react'
import './Game.css'

import run1 from '../assets/run-1.png'
import run2 from '../assets/run-2.png'
import jumpImg from '../assets/jump.png'
import slideImg from '../assets/slide.png'

import gameBg from '../assets/game-bg.png'
import gameGr from '../assets/game-gr.png'


function Game({ onBack }) {
  const [isRunning, setIsRunning] = useState(false)
  const [isGameOver, setIsGameOver] = useState(false)

  const [score, setScore] = useState(0)

  const [isSliding, setIsSliding] = useState(false)
  const [isJumping, setIsJumping] = useState(false)

  const [runFrame, setRunFrame] = useState(0)

  const [obstacles, setObstacles] = useState([])


  // ==============================
  // 플레이어
  // ==============================

  const playerRef = useRef(null)
  const playerHitboxRef = useRef(null)

  const yRef = useRef(0)
  const velocityRef = useRef(0)


  // ==============================
  // 슬라이드
  // ==============================

  const isSlidingRef = useRef(false)
  const slidePressedRef = useRef(false)


  // ==============================
  // 게임 시간 / 거리
  // ==============================

  const gameTimeRef = useRef(0)
  const distanceRef = useRef(0)


  // ==============================
  // 장애물
  // ==============================

  const obstaclesRef = useRef([])
  const nextSpawnRef = useRef(1.8)


  // ==============================
  // 게임 루프
  // ==============================

  const animationRef = useRef(null)
  const lastTimeRef = useRef(null)


  // ==============================
  // 배경 / 바닥
  // ==============================

  const backgroundRef = useRef(null)
  const backgroundXRef = useRef(0)

  const groundRef = useRef(null)
  const groundXRef = useRef(0)


  // ==============================
  // 장애물 종류
  // ==============================

  const obstacleTypes = {
    cloud: {
      icon: '☁️',
      className: 'obstacle-cloud',
    },

    star: {
      icon: '⭐',
      className: 'obstacle-star',
    },

    moon: {
      icon: '🌙',
      className: 'obstacle-moon',
    },

    ufo: {
      icon: '🛸',
      className: 'obstacle-ufo',
    },
  }


  // ==============================
  // 장애물 생성
  // ==============================

  const spawnObstacle = () => {
    const types = [
      'cloud',
      'cloud',
      'star',
      'moon',
      'ufo',
      'ufo',
    ]

    const type =
      types[Math.floor(Math.random() * types.length)]

    const newObstacle = {
      id: `${Date.now()}-${Math.random()}`,
      type,
      x: 110,
    }

    obstaclesRef.current = [
      ...obstaclesRef.current,
      newObstacle,
    ]
  }


  // ==============================
  // 게임 시작
  // ==============================

  const startGame = () => {
    yRef.current = 0
    velocityRef.current = 0

    isSlidingRef.current = false
    slidePressedRef.current = false

    gameTimeRef.current = 0
    distanceRef.current = 0

    obstaclesRef.current = []
    nextSpawnRef.current = 1.6

    backgroundXRef.current = 0
    groundXRef.current = 0

    lastTimeRef.current = null

    if (backgroundRef.current) {
      backgroundRef.current.style.backgroundPositionX =
        '0px'
    }

    if (groundRef.current) {
      groundRef.current.style.backgroundPositionX =
        '0px'
    }

    setScore(0)

    setIsSliding(false)
    setIsJumping(false)

    setRunFrame(0)
    setObstacles([])

    setIsGameOver(false)
    setIsRunning(true)
  }


  // ==============================
  // 점프
  // ==============================

  const jump = () => {
    if (!isRunning || isGameOver) return

    // 슬라이드 중 점프 불가
    if (isSlidingRef.current) return

    // 1단 점프
    if (yRef.current > 2) return

    velocityRef.current = 690

    setIsJumping(true)
  }


  // ==============================
  // 슬라이드 시작
  // ==============================

  const startSlide = () => {
    if (!isRunning || isGameOver) return

    slidePressedRef.current = true

    isSlidingRef.current = true
    setIsSliding(true)

    /*
      점프 중 SLIDE를 누르면
      뚝 떨어지는 게 아니라
      빠르게 슉 내려옴
    */
    if (yRef.current > 2) {
      velocityRef.current = -950

      setIsJumping(false)
    }
  }


  // ==============================
  // 슬라이드 종료
  // ==============================

  const stopSlide = () => {
    slidePressedRef.current = false

    /*
      땅에 있으면 바로 달리기로 복귀

      공중이면 착지할 때
      게임 루프에서 자동 해제
    */
    if (yRef.current <= 2) {
      isSlidingRef.current = false
      setIsSliding(false)
    }
  }


  // ==============================
  // 달리기 이미지 프레임
  // ==============================

  useEffect(() => {
    if (
      !isRunning ||
      isGameOver ||
      isSliding ||
      isJumping
    ) {
      return
    }

    const interval = setInterval(() => {
      setRunFrame((prev) =>
        prev === 0 ? 1 : 0
      )
    }, 120)

    return () => {
      clearInterval(interval)
    }
  }, [
    isRunning,
    isGameOver,
    isSliding,
    isJumping,
  ])


  // ==============================
  // GAME LOOP
  // ==============================

  useEffect(() => {
    if (!isRunning || isGameOver) return

    const gravity = 1800

    const baseSpeed = 44
    const maxSpeed = 145


    const gameLoop = (time) => {
      if (!lastTimeRef.current) {
        lastTimeRef.current = time
      }

      const delta = Math.min(
        (time - lastTimeRef.current) / 1000,
        0.032
      )

      lastTimeRef.current = time


      // ==============================
      // 시간
      // ==============================

      gameTimeRef.current += delta


      // ==============================
      // 속도 증가
      // ==============================

      const currentSpeed = Math.min(
        baseSpeed +
          gameTimeRef.current * 1.7,
        maxSpeed
      )

      const speedMultiplier =
        currentSpeed / baseSpeed


      // ==============================
      // 배경 스크롤
      // ==============================

      backgroundXRef.current -=
        currentSpeed * 0.35 * delta

      if (backgroundRef.current) {
        backgroundRef.current.style.backgroundPositionX =
          `${backgroundXRef.current}px`
      }


      // ==============================
      // 바닥 스크롤
      // ==============================

      groundXRef.current -=
        currentSpeed * 1.15 * delta

      if (groundRef.current) {
        groundRef.current.style.backgroundPositionX =
          `${groundXRef.current}px`
      }


      // ==============================
      // 거리
      // ==============================

      distanceRef.current +=
        20 *
        speedMultiplier *
        delta

      const newScore =
        Math.floor(distanceRef.current)

      setScore((prev) => {
        if (prev === newScore) {
          return prev
        }

        return newScore
      })


      // ==============================
      // 플레이어 물리
      // ==============================

      velocityRef.current -=
        gravity * delta

      yRef.current +=
        velocityRef.current * delta


      // ==============================
      // 착지
      // ==============================

      if (yRef.current <= 0) {
        const wasInAir =
          yRef.current !== 0 ||
          velocityRef.current !== 0

        yRef.current = 0
        velocityRef.current = 0

        if (wasInAir) {
          setIsJumping(false)
        }

        /*
          점프 중 SLIDE를 눌렀다가
          착지하기 전에 손을 뗐다면
          착지와 동시에 달리기로
        */
        if (
          isSlidingRef.current &&
          !slidePressedRef.current
        ) {
          isSlidingRef.current = false
          setIsSliding(false)
        }
      }


      // ==============================
      // 실제 캐릭터 위치
      // ==============================

      if (playerRef.current) {
        playerRef.current.style.transform =
          `translateY(${-yRef.current}px)`
      }


      // ==============================
      // 장애물 생성
      // ==============================

      nextSpawnRef.current -= delta

      if (nextSpawnRef.current <= 0) {
        spawnObstacle()

        const difficulty = Math.min(
          gameTimeRef.current / 45,
          1
        )

        const minGap =
          1.35 -
          difficulty * 0.7

        const randomGap =
          0.55 -
          difficulty * 0.2

        nextSpawnRef.current =
          minGap +
          Math.random() * randomGap
      }


      // ==============================
      // 장애물 이동
      // ==============================

      obstaclesRef.current =
        obstaclesRef.current
          .map((obstacle) => ({
            ...obstacle,

            x:
              obstacle.x -
              currentSpeed * delta,
          }))
          .filter(
            (obstacle) =>
              obstacle.x > -25
          )


      // ==============================
      // 충돌 판정
      // ==============================

      if (
        playerRef.current &&
        playerHitboxRef.current
      ) {
        const playerRect =
          playerHitboxRef.current.getBoundingClientRect()

        const playerPaddingX = 3
        const playerPaddingY = 2

        for (
          const obstacle
          of obstaclesRef.current
        ) {
          const obstacleElement =
            document.querySelector(
              `[data-obstacle-id="${obstacle.id}"]`
            )

          if (!obstacleElement) continue

          const obstacleRect =
            obstacleElement.getBoundingClientRect()

          const obstaclePaddingX = 7
          const obstaclePaddingY = 5

          const hit =
            playerRect.left +
                playerPaddingX <
              obstacleRect.right -
                obstaclePaddingX &&

            playerRect.right -
                playerPaddingX >
              obstacleRect.left +
                obstaclePaddingX &&

            playerRect.top +
                playerPaddingY <
              obstacleRect.bottom -
                obstaclePaddingY &&

            playerRect.bottom -
                playerPaddingY >
              obstacleRect.top +
                obstaclePaddingY

          if (hit) {
            setIsGameOver(true)
            setIsRunning(false)

            slidePressedRef.current = false
            isSlidingRef.current = false

            setIsSliding(false)
            setIsJumping(false)

            cancelAnimationFrame(
              animationRef.current
            )

            return
          }
        }
      }


      // ==============================
      // 화면 업데이트
      // ==============================

      setObstacles([
        ...obstaclesRef.current,
      ])

      animationRef.current =
        requestAnimationFrame(gameLoop)
    }


    animationRef.current =
      requestAnimationFrame(gameLoop)


    return () => {
      cancelAnimationFrame(
        animationRef.current
      )

      lastTimeRef.current = null
    }
  }, [isRunning, isGameOver])


  // ==============================
  // PC 키보드
  // ==============================

  useEffect(() => {
    const handleKeyDown = (event) => {
      // 점프
      if (
        event.code === 'Space' ||
        event.code === 'ArrowUp'
      ) {
        event.preventDefault()

        jump()
      }


      // ↓ 누르면 슬라이드
      if (event.code === 'ArrowDown') {
        event.preventDefault()

        if (event.repeat) return

        startSlide()
      }
    }


    const handleKeyUp = (event) => {
      // ↓ 떼면 슬라이드 종료
      if (event.code === 'ArrowDown') {
        stopSlide()
      }
    }


    window.addEventListener(
      'keydown',
      handleKeyDown
    )

    window.addEventListener(
      'keyup',
      handleKeyUp
    )


    return () => {
      window.removeEventListener(
        'keydown',
        handleKeyDown
      )

      window.removeEventListener(
        'keyup',
        handleKeyUp
      )
    }
  }, [isRunning, isGameOver])


  // ==============================
  // 캐릭터 이미지
  // ==============================

  let playerImage = run1

  if (isSliding) {
    playerImage = slideImg
  } else if (isJumping) {
    playerImage = jumpImg
  } else if (runFrame === 1) {
    playerImage = run2
  }


  // ==============================
  // 화면
  // ==============================

  return (
    <section className="game-page">

      {/* =========================
          상단 UI
      ========================== */}

      <div className="game-ui">

        <button
          className="game-back"
          onClick={onBack}
        >
          ← BACK
        </button>


        <div className="game-status">

          <div className="game-score">
            DREAM{' '}
            {String(score).padStart(4, '0')}m
          </div>

        </div>

      </div>


      {/* =========================
          게임 공간
      ========================== */}

      <div className="game-world">

        {/* 움직이는 배경 */}

        <div
          ref={backgroundRef}
          className="game-scroll-background"
          style={{
            backgroundImage:
              `url(${gameBg})`,
          }}
        />


        {/* 플레이어 */}

        <div
          ref={playerRef}

          className={`
            game-player
            ${
              isSliding
                ? 'sliding'
                : isJumping
                ? 'jumping'
                : 'running'
            }
          `}
        >

          <img
            className="game-player-image"
            src={playerImage}
            alt=""
          />

          <div
            ref={playerHitboxRef}
            className="player-hitbox"
          />

        </div>


        {/* 장애물 */}

        {obstacles.map((obstacle) => {
          const config =
            obstacleTypes[obstacle.type]

          return (
            <div
              key={obstacle.id}

              data-obstacle-id={
                obstacle.id
              }

              className={`
                game-obstacle
                ${config.className}
              `}

              style={{
                left: `${obstacle.x}%`,
              }}
            >
              {config.icon}
            </div>
          )
        })}


        {/* 움직이는 바닥 */}

        <div
          ref={groundRef}

          className="game-ground"

          style={{
            backgroundImage:
              `url(${gameGr})`,
          }}
        />

      </div>


      {/* =========================
          JUMP / SLIDE 버튼
      ========================== */}

      {isRunning && (
        <div className="game-controls">

          {/* JUMP */}

          <button
            className="
              control-button
              jump-button
            "

            onPointerDown={(event) => {
              event.preventDefault()
              event.stopPropagation()

              jump()
            }}
          >
            ▲

            <span>
              JUMP
            </span>
          </button>


          {/* SLIDE */}

          <button
            className="
              control-button
              slide-button
            "

            onPointerDown={(event) => {
              event.preventDefault()
              event.stopPropagation()

              event.currentTarget.setPointerCapture(
                event.pointerId
              )

              startSlide()
            }}

            onPointerUp={(event) => {
              event.preventDefault()
              event.stopPropagation()

              stopSlide()
            }}

            onPointerCancel={() => {
              stopSlide()
            }}

            onLostPointerCapture={() => {
              stopSlide()
            }}
          >
            ▼

            <span>
              SLIDE
            </span>
          </button>

        </div>
      )}


      {/* =========================
          START
      ========================== */}

      {!isRunning && !isGameOver && (
        <div className="game-start-screen">

          <h1>
            DREAM RUN
          </h1>

          <p>
            JUMP OVER
          </p>

          <p>
            SLIDE UNDER
          </p>

          <p className="game-help">
            SURVIVE AS LONG AS YOU CAN
          </p>

          <button
            onClick={startGame}
          >
            START
          </button>

        </div>
      )}


      {/* =========================
          GAME OVER
      ========================== */}

      {isGameOver && (
        <div className="game-over-screen">

          <p className="game-over-label">
            GAME OVER
          </p>

          <h2>
            DREAM{' '}
            {String(score).padStart(4, '0')}m
          </h2>

          <button
            onClick={startGame}
          >
            RETRY
          </button>

          <button
            className="game-over-back"
            onClick={onBack}
          >
            BACK
          </button>

        </div>
      )}

    </section>
  )
}

export default Game