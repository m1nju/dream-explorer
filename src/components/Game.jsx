import { useEffect, useRef, useState } from 'react'
import './Game.css'

import run1 from '../assets/run-1.png'
import run2 from '../assets/run-2.png'
import jumpImg from '../assets/jump.png'
import slideImg from '../assets/slide.png'

function Game({ onBack }) {
  const [isRunning, setIsRunning] = useState(false)
  const [isGameOver, setIsGameOver] = useState(false)

  const [score, setScore] = useState(0)

  const [isSliding, setIsSliding] = useState(false)
  const [isJumping, setIsJumping] = useState(false)

  const [runFrame, setRunFrame] = useState(0)

  // 화면에 표시할 장애물
  const [obstacles, setObstacles] = useState([])

  // ==============================
  // 플레이어 DOM
  // ==============================

  const playerRef = useRef(null)
  const playerHitboxRef = useRef(null)

  // ==============================
  // 플레이어 물리
  // ==============================

  const yRef = useRef(0)
  const velocityRef = useRef(0)

  // ==============================
  // 슬라이드
  // ==============================

  // 실제 슬라이드 상태
  const isSlidingRef = useRef(false)

  // SLIDE 버튼을 현재 누르고 있는지
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
  // 랜덤 장애물 생성
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

    lastTimeRef.current = null

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

    // 슬라이드 중이면 점프 금지
    if (isSlidingRef.current) return

    // 공중 점프 금지
    if (yRef.current > 2) return

    velocityRef.current = 690

    setIsJumping(true)
  }

  // ==============================
  // 슬라이드 시작
  // ==============================

  const startSlide = () => {
    if (!isRunning || isGameOver) return

    // 버튼을 누르고 있다는 상태
    slidePressedRef.current = true

    // 이미지 / 충돌박스는 즉시 슬라이드로 전환
    isSlidingRef.current = true
    setIsSliding(true)

    // 공중에서 누르면
    // 순간이동하지 않고 빠르게 아래로 내려감
    if (yRef.current > 2) {
      velocityRef.current = -950

      // 점프 이미지를 바로 슬라이드 이미지로 변경
      setIsJumping(false)
    }
  }

  // ==============================
  // 슬라이드 종료
  // ==============================

  const stopSlide = () => {
    slidePressedRef.current = false

    // 땅에 있을 때만 바로 슬라이드 해제
    if (yRef.current <= 2) {
      isSlidingRef.current = false
      setIsSliding(false)
    }

    /*
      공중에서 버튼을 뗀 경우에는
      당장 달리기 포즈로 바꾸지 않음.

      아래 게임 루프에서
      착지하는 순간 자동으로 해제됨.
    */
  }

  // ==============================
  // 달리기 프레임
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

    // 시작 속도
    const baseSpeed = 44

    // 최대 속도
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
      // 게임 시간
      // ==============================

      gameTimeRef.current += delta

      // ==============================
      // 시간이 지날수록 속도 증가
      // ==============================

      const currentSpeed = Math.min(
        baseSpeed +
          gameTimeRef.current * 1.7,
        maxSpeed
      )

      const speedMultiplier =
        currentSpeed / baseSpeed

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
          공중에서 SLIDE 눌렀다가
          착지하기 전에 버튼을 뗀 경우

          착지하자마자 달리기로 돌아감
        */

        if (
          isSlidingRef.current &&
          !slidePressedRef.current
        ) {
          isSlidingRef.current = false
          setIsSliding(false)
        }
      }

      // 실제 캐릭터 위치
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

        /*
          시간이 지날수록
          장애물 등장 간격 감소
        */

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

        /*
          player-hitbox 자체를
          CSS에서 작게 잡았으므로
          padding은 너무 크게 줄 필요 없음
        */

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
      // React 화면 업데이트
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

      // 슬라이드
      if (event.code === 'ArrowDown') {
        event.preventDefault()

        // 키 반복 입력 방지
        if (event.repeat) return

        startSlide()
      }
    }

    const handleKeyUp = (event) => {
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
  // 현재 캐릭터 이미지
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
              data-obstacle-id={obstacle.id}

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

        {/* 땅 */}

        <div className="game-ground">
          <div className="ground-line" />
        </div>

      </div>

      {/* =========================
          모바일 조작 버튼
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
              event.stopPropagation()

              /*
                pointer capture를 걸어두면
                손가락이 버튼 밖으로 살짝 나가도
                pointerUp을 안정적으로 받을 수 있음
              */

              event.currentTarget.setPointerCapture(
                event.pointerId
              )

              startSlide()
            }}

            onPointerUp={(event) => {
              event.stopPropagation()

              stopSlide()
            }}

            onPointerCancel={() => {
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