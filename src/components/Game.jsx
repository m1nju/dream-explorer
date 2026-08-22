import { useEffect, useRef, useState } from 'react'
import './Game.css'

import { supabase } from '../lib/supabase'

import run1 from '../assets/run-1.png'
import run2 from '../assets/run-2.png'
import jumpImg from '../assets/jump.png'
import slideImg from '../assets/slide.png'

import gameBg from '../assets/game-bg.png'
import gameGr from '../assets/game-gr.png'
import rockImg from '../assets/rock.png'
import hangingStarImg from '../assets/hangingstar.png'
import cloudImg from '../assets/cloud.png'
import starImg from '../assets/star.png'

import boingSound from '../assets/boing.mp3'
import slideSound from '../assets/slide.mp3'
import bgmSound from '../assets/bgm.mp3'
import overSound from '../assets/over.mp3'


function Game({ onBack }) {
  const [isRunning, setIsRunning] = useState(false)
  const [isGameOver, setIsGameOver] = useState(false)

  const [score, setScore] = useState(0)

  const [isSliding, setIsSliding] = useState(false)
  const [isJumping, setIsJumping] = useState(false)

  const [runFrame, setRunFrame] = useState(0)

  const [obstacles, setObstacles] = useState([])

  const [particles, setParticles] = useState([])

  const boingAudioRef = useRef(null)
  const slideAudioRef = useRef(null)
  const bgmAudioRef = useRef(null)
  const overAudioRef = useRef(null)

  

  // ==============================
// 랭킹 UI
// ==============================

const [nickname, setNickname] = useState(() => {
  return localStorage.getItem('dreamNickname') || ''
})

const [scoreSaved, setScoreSaved] = useState(false)
const [nicknameError, setNicknameError] = useState('')
const [rankingMode, setRankingMode] = useState(null)
// null = 게임오버 기본창
// 'top' = 1~5등
// 'mine' = 내 순위 주변

const [playerId] = useState(() => {
  let id =
    localStorage.getItem('dreamPlayerId')

  if (!id) {
    if (
      typeof crypto !== 'undefined' &&
      typeof crypto.randomUUID === 'function'
    ) {
      id = crypto.randomUUID()
    } else {
      id =
        `${Date.now()}-${Math.random()
          .toString(36)
          .slice(2)}-${Math.random()
          .toString(36)
          .slice(2)}`
    }

    localStorage.setItem(
      'dreamPlayerId',
      id
    )
  }

  return id
})

// ==============================
// 랭킹 데이터
// ==============================

const [ranking, setRanking] = useState([])
const [myRanking, setMyRanking] = useState([])
const [myRankNumber, setMyRankNumber] = useState(null)

const [rankingLoading, setRankingLoading] = useState(false)
const [scoreSaving, setScoreSaving] = useState(false)


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

  /*
    직전에 나온 장애물 기억

    cloud = rock.png
    moon  = cloud.png
    ufo   = hangingstar.png

    이름은 기존 그대로 유지
  */
  const lastObstacleTypeRef = useRef(null)
  const sameObstacleCountRef = useRef(0)


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

  const particleIdRef = useRef(0)


  // ==============================
  // 장애물 종류
  // ==============================

  const obstacleTypes = {
    cloud: {
      image: rockImg,
      className: 'obstacle-cloud',
    },

    star: {
      image: starImg,
      className: 'obstacle-star',
    },

    moon: {
      image: cloudImg,
      className: 'obstacle-moon',
    },

    ufo: {
      image: hangingStarImg,
      className: 'obstacle-ufo',
    },
  }


  // ==============================
  // 장애물 생성
  // ==============================

  const spawnObstacle = () => {
  const time = gameTimeRef.current

  let types


  // ==============================
  // 초반 0 ~ 15초
  // 아직 비교적 쉬움
  // STAR 비율은 기존보다 높임
  // ==============================

  if (time < 15) {
    types = [
      'cloud',
      'cloud',
      'cloud',

      'star',
      'star',
      'star',

      'moon',
    ]
  }


  // ==============================
  // 중반 15 ~ 35초
  //
  // STAR 비율 증가
  // UFO도 본격 등장
  // ==============================

  else if (time < 35) {
    types = [
      'cloud',
      'cloud',

      'moon',
      'moon',

      'star',
      'star',
      'star',
      'star',

      'ufo',
      'ufo',
    ]
  }


  // ==============================
  // 후반 35초 ~
  //
  // STAR / UFO 비율 높음
  // 연속 패턴 허용
  // ==============================

  else {
    types = [
      'cloud',
      'cloud',

      'moon',
      'moon',

      'star',
      'star',
      'star',
      'star',
      'star',

      'ufo',
      'ufo',
      'ufo',
    ]
  }


  const lastType =
    lastObstacleTypeRef.current


  // ==============================
  // 큰 점프 장애물만 연속 방지
  // ==============================


  /*
    중요:

    ufo → ufo
    star → star
    star → ufo
    ufo → star

    전부 허용.

    그래서 기존에 있던

    if (lastType === 'ufo') {
      ...
    }

    코드는 삭제함.
  */


  if (types.length === 0) {
    types = ['cloud']
  }


/*
  같은 장애물이 이미 2번 연속 나왔다면
  세 번째부터는 후보에서 제거
*/
if (sameObstacleCountRef.current >= 2) {
  types = types.filter(
    (type) => type !== lastType
  )
}


  

  const type =
    types[
      Math.floor(
        Math.random() * types.length
      )
    ]


  const newObstacle = {
    id: `${Date.now()}-${Math.random()}`,
    type,
    x: 110,
  }


  obstaclesRef.current = [
    ...obstaclesRef.current,
    newObstacle,
  ]


  // 같은 장애물이 연속으로 나온 경우
if (type === lastObstacleTypeRef.current) {
  sameObstacleCountRef.current += 1
}

// 다른 장애물이 나온 경우
else {
  sameObstacleCountRef.current = 1
}

lastObstacleTypeRef.current = type
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

    /*
      이전 판의 장애물 기록 초기화
    */
    lastObstacleTypeRef.current = null
    sameObstacleCountRef.current = 0

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

    setScoreSaved(false)

    setRankingMode(null)

    setIsGameOver(false)
    setIsRunning(true)

    // BGM 시작
    if (bgmAudioRef.current) {
      bgmAudioRef.current.currentTime = 0
      bgmAudioRef.current.volume = 0.4

      bgmAudioRef.current
        .play()
        .catch(() => {})
    }
  }


// ==============================
// TOP 5 랭킹 불러오기
// ==============================

const loadRanking = async () => {
  setRankingLoading(true)

  const { data, error } = await supabase
    .from('scores')
    .select('id, nickname, score, player_id, created_at')
    .order('score', {
      ascending: false,
    })
    .order('created_at', {
      ascending: true,
    })
    .limit(5)

  if (error) {
    console.error(
      '랭킹 불러오기 실패:',
      error
    )

    setRanking([])
    setRankingLoading(false)
    return
  }

  setRanking(data || [])
  setRankingLoading(false)
}


// ==============================
// 내 순위 주변 랭킹 불러오기
// 위 2명 + 나 + 아래 2명
// ==============================

const loadMyRanking = async () => {
  setRankingLoading(true)

  const { data, error } = await supabase
    .from('scores')
    .select('id, nickname, score, player_id, created_at')
    .order('score', {
      ascending: false,
    })
    .order('created_at', {
      ascending: true,
    })

  if (error) {
    console.error(
      '내 랭킹 불러오기 실패:',
      error
    )

    setMyRanking([])
    setMyRankNumber(null)
    setRankingLoading(false)
    return
  }

  const rows = data || []

  const myIndex = rows.findIndex(
    (row) =>
      row.player_id === playerId
  )

  if (myIndex === -1) {
    setMyRanking([])
    setMyRankNumber(null)
    setRankingLoading(false)
    return
  }

  const startIndex =
    Math.max(0, myIndex - 2)

  const endIndex =
    Math.min(
      rows.length,
      myIndex + 3
    )

  const nearbyRows =
    rows
      .slice(
        startIndex,
        endIndex
      )
      .map((row, index) => ({
        ...row,
        rank:
          startIndex +
          index +
          1,
      }))

  setMyRanking(nearbyRows)
  setMyRankNumber(myIndex + 1)

  setRankingLoading(false)
}


// ==============================
// 실제 점수 저장
// ==============================


const saveScore = async () => {
  const trimmedNickname =
    nickname.trim()

  if (!trimmedNickname) return
  if (scoreSaved || scoreSaving) return


  setScoreSaving(true)
  setNicknameError('')


  const normalizedNickname =
    trimmedNickname.toUpperCase()

  const playTime =
    gameTimeRef.current


  const { data, error } =
    await supabase.rpc(
      'submit_game_score',
      {
        p_nickname:
          normalizedNickname,

        p_score:
          score,

        p_player_id:
          playerId,

        p_play_time:
          playTime,
      }
    )


  if (error) {
    console.error(
      '점수 저장 실패:',
      error
    )

    setNicknameError(
      '점수를 저장하지 못했어요'
    )

    setScoreSaving(false)

    return
  }


  if (
    data ===
    'nickname_taken'
  ) {
    setNicknameError(
      '이미 사용 중인 닉네임이에요'
    )

    setScoreSaving(false)

    return
  }


  if (
    data ===
    'invalid_score'
  ) {
    setNicknameError(
      '올바르지 않은 점수예요'
    )

    setScoreSaving(false)

    return
  }


  setScoreSaved(true)
  setScoreSaving(false)

  await loadMyRanking()

  setRankingMode('mine')
}

  // ==============================
  // 점프
  // ==============================

  const jump = () => {
  if (!isRunning || isGameOver) return
  if (isSlidingRef.current) return
  if (yRef.current > 2) return

const isMobile =
  window.innerWidth <= 600

velocityRef.current =
  isMobile
    ? 670
    : 690

  setIsJumping(true)

  // 점프 효과음
  if (boingAudioRef.current) {
    boingAudioRef.current.currentTime = 0
    boingAudioRef.current.volume = 0.35
    boingAudioRef.current.play().catch(() => {})
  }
}


  // ==============================
  // 슬라이드 시작
  // ==============================

  const startSlide = () => {
  if (!isRunning || isGameOver) return

  slidePressedRef.current = true

  isSlidingRef.current = true
  setIsSliding(true)

  // 슬라이드 효과음
  if (slideAudioRef.current) {
    slideAudioRef.current.currentTime = 0
    slideAudioRef.current
      .play()
      .catch(() => {})
  }

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
// 달리기 파티클
// ==============================

useEffect(() => {
  if (
    !isRunning ||
    isGameOver ||
    isJumping ||
    isSliding
  ) {
    return
  }

  const interval = setInterval(() => {
    /*
      혹시 실제 물리상 공중이면 생성 안 함
    */
    if (yRef.current > 2) return

    const id =
      particleIdRef.current++

    /*
      두 종류 중 랜덤
      dust = 작은 픽셀
      sparkle = 작은 별
    */
    const type =
      Math.random() > 0.72
        ? 'sparkle'
        : 'dust'

    const newParticle = {
      id,
      type,

      /*
        매번 똑같은 곳에서 나오면
        너무 기계적으로 보여서 살짝 랜덤
      */
      offsetX:
        Math.random() * 8 - 4,

      offsetY:
        Math.random() * 5,
    }

    setParticles((prev) => [
      ...prev,
      newParticle,
    ])

    /*
      애니메이션 끝난 뒤 삭제
    */
    setTimeout(() => {
      setParticles((prev) =>
        prev.filter(
          (particle) =>
            particle.id !== id
        )
      )
    }, 500)

  }, 110)

  return () => {
    clearInterval(interval)
  }
}, [
  isRunning,
  isGameOver,
  isJumping,
  isSliding,
])


  // ==============================
  // GAME LOOP
  // ==============================

  useEffect(() => {
    if (!isRunning || isGameOver) return

const gravity =
  window.innerWidth <= 600
    ? 1900
    : 1800

    // 초반 속도는 기존보다 빠르게
    // 대신 시간이 지날수록 빨라지는 속도는 완만하게
    const baseSpeed = 58
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
          gameTimeRef.current * 1.1,
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


        /*
          이제 시간에 따라 간격을
          무한정 줄이지 않음.

          후반에도 플레이어가
          착지/자세 복귀할 시간을
          확보하도록 최소 간격 유지.
        */

          const time =
  gameTimeRef.current

const lastType =
  lastObstacleTypeRef.current

let minGap
let randomGap


// 초반
if (time < 15) {
  minGap = 1.45
  randomGap = 0.50
}


// 중반
else if (time < 35) {
  minGap = 1.15
  randomGap = 0.40
}


// 후반
else {
  minGap = 0.90
  randomGap = 0.35
}


// 큰 점프 장애물 뒤에는
// 아주 최소한의 착지 여유만
if (lastType === 'moon') {
  minGap += 0.20
}


// rock / star / ufo는
// 추가 여유 없음


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


          const isRock =
            obstacle.type === 'cloud'

          const isMoon =
            obstacle.type === 'moon'

          const isUfo =
            obstacle.type === 'ufo'


          /*
            X는 좌우 패딩,
            Top / Bottom을 따로 둬서
            행잉스타 히트박스만 위로 올릴 수 있게 함
          */

          let obstaclePaddingX = 7
          let obstaclePaddingTop = 5
          let obstaclePaddingBottom = 5


          // rock

          if (isRock) {
            obstaclePaddingX = 2
            obstaclePaddingTop = 2
            obstaclePaddingBottom = 2
          }

          if (isMoon) {
            obstaclePaddingX =
              obstacleRect.width * 0.12

            // 위쪽은 많이 잘라서 점프로 넘기 쉽게
            obstaclePaddingTop =
              obstacleRect.height * 0.35

            // 아래쪽은 거의 유지해서 슬라이드 통과 방지
            obstaclePaddingBottom =
              obstacleRect.height * 0.02
          }

          // hangingstar.png (코드상 ufo)
          // 이미지는 현재 위치 그대로 두고
          // 충돌박스의 아랫부분만 많이 잘라서 위로 올림

          if (isUfo) {
            obstaclePaddingX = 10
            obstaclePaddingTop = 5
            obstaclePaddingBottom = 25
          }


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
                obstaclePaddingBottom &&

            playerRect.bottom -
                playerPaddingY >
              obstacleRect.top +
                obstaclePaddingTop


          if (hit) {
            setIsGameOver(true)
            setIsRunning(false)

              if (bgmAudioRef.current) {
                bgmAudioRef.current.pause()
              }

          if (overAudioRef.current) {
              overAudioRef.current.currentTime = 0
              overAudioRef.current.volume = 0.6

              overAudioRef.current
                .play()
                .catch(() => {})
            }

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

      {/* 오디오  */}

        <audio
      ref={boingAudioRef}
      src={boingSound}
      preload="auto"
    />

    <audio
      ref={slideAudioRef}
      src={slideSound}
      preload="auto"
    />

    <audio
      ref={bgmAudioRef}
      src={bgmSound}
      preload="auto"
      loop
    />

    <audio
      ref={overAudioRef}
      src={overSound}
      preload="auto"
    />

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

        {/* 달리기 파티클 */}

<div className="running-particles">

  {particles.map((particle) => (
    <span
      key={particle.id}

      className={`
        running-particle
        particle-${particle.type}
      `}

      style={{
        '--particle-x':
          `${particle.offsetX}px`,

        '--particle-y':
          `${particle.offsetY}px`,
      }}
    />
  ))}

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

              {config.image ? (
                <img
                  src={config.image}
                  alt=""
                  className="obstacle-image"
                />
              ) : (
                config.icon
              )}

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

    <div className="game-start-window">

      <p className="game-start-title">
        DREAM RUN
      </p>

      <div className="game-start-stars">
        ✦　·　✦
      </div>

      <div className="game-start-guide">

        <p>
          <span>▲</span>
          JUMP OVER
        </p>

        <p>
          <span>▼</span>
          SLIDE UNDER
        </p>

      </div>

      <p className="game-start-help">
        EXPLORE YOUR DREAM ROAD
      </p>

      <button
        className="game-start-button"
        onClick={startGame}
      >
        START
      </button>

    </div>

  </div>
)}



{/* =========================
    GAME OVER / RANKING
========================== */}

{isGameOver && (
  <div className="game-over-screen">

    <div className="game-over-window">

      {rankingMode === null && (
        <>
          <p className="game-over-title">
            GAME OVER
          </p>

          <div className="game-over-stars">
            ✦　·　✦
          </div>

          <p className="game-over-score-label">
            YOUR DREAM ROAD
          </p>

          <p className="game-over-score">
            {String(score).padStart(4, '0')}m
          </p>

          <div className="score-save-area">

            <input
              className="ranking-nickname-input"
              type="text"
              value={nickname}
              maxLength={10}
              placeholder="NICKNAME"

              onChange={(event) => {
                const value =
                  event.target.value

                setNickname(value)
                setNicknameError('')

                localStorage.setItem(
                  'dreamNickname',
                  value
                )
              }}

              onKeyDown={(event) => {
                if (
                  event.key === 'Enter'
                ) {
                  saveScore()
                }
              }}
            />

            {nicknameError && (
              <p className="nickname-error">
                {nicknameError}
              </p>
            )}

            <button
              className="save-score-button"
              onClick={saveScore}
              disabled={
                !nickname.trim() ||
                scoreSaved ||
                scoreSaving
              }
            >
              {scoreSaving
                ? 'SAVING...'
                : scoreSaved
                ? 'SAVED!'
                : 'SAVE SCORE'}
            </button>

          </div>

          <div className="ranking-choice-buttons">

            <button
              className="ranking-open-button"
              onClick={async () => {
                await loadRanking()
                setRankingMode('top')
              }}
            >
              TOP RANKING
            </button>

            <button
              className="ranking-open-button"
              onClick={async () => {
                await loadMyRanking()
                setRankingMode('mine')
              }}
            >
              MY RANKING
            </button>

          </div>

          <div className="game-over-buttons">

            <button
              className="game-over-retry"
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
        </>
      )}

      {rankingMode === 'top' && (
        <>
          <p className="ranking-title">
            DREAM RANKING
          </p>

          <div className="game-over-stars">
            ✦　·　✦
          </div>

          <div className="ranking-list">

            {rankingLoading ? (
              <p className="ranking-empty">
                LOADING...
              </p>
            ) : ranking.length === 0 ? (
              <p className="ranking-empty">
                NO RECORDS
              </p>
            ) : (
              ranking.map(
                (record, index) => (
                  <div
                    className="ranking-row"
                    key={record.id}
                  >
                    <span className="ranking-number">
                      {index + 1}
                    </span>

                    <span className="ranking-name">
                      {record.nickname}
                    </span>

                    <span className="ranking-score">
                      {String(
                        record.score
                      ).padStart(4, '0')}m
                    </span>
                  </div>
                )
              )
            )}

          </div>

          <button
            className="ranking-close-button"
            onClick={() => {
              setRankingMode(null)
            }}
          >
            BACK
          </button>
        </>
      )}

      {rankingMode === 'mine' && (
        <>
          <p className="ranking-title">
            MY RANKING
          </p>

          <div className="game-over-stars">
            ✦　·　✦
          </div>

          {rankingLoading ? (
            <p className="ranking-empty">
              LOADING...
            </p>
          ) : myRankNumber === null ? (
            <p className="ranking-empty">
              SAVE YOUR SCORE FIRST
            </p>
          ) : (
            <>
              <p className="my-rank-label">
                YOUR RANK
              </p>

              <p className="my-rank-number">
                #{myRankNumber}
              </p>

              <div className="ranking-list">

                {myRanking.map(
                  (record) => {
                    const isMe =
                      record.player_id ===
                      playerId

                    return (
                      <div
                        className={`
                          ranking-row
                          ${
                            isMe
                              ? 'my-ranking-row'
                              : ''
                          }
                        `}
                        key={record.id}
                      >
                        <span className="ranking-number">
                          {record.rank}
                        </span>

                        <span className="ranking-name">
                          {record.nickname}
                        </span>

                        <span className="ranking-score">
                          {String(
                            record.score
                          ).padStart(4, '0')}m
                        </span>
                      </div>
                    )
                  }
                )}

              </div>
            </>
          )}

          <button
            className="ranking-close-button"
            onClick={() => {
              setRankingMode(null)
            }}
          >
            BACK
          </button>
        </>
      )}

    </div>

  </div>
)}

      <div className="pixel-screen-overlay" />

    </section>
  )
}


export default Game