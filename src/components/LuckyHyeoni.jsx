import {
  useEffect,
  useRef,
  useState,
} from 'react'

import { supabase } from '../lib/supabase'

import lamp from '../assets/lamp.png'
import hyeoniGenie from '../assets/hyeoni-genie.png'

import './LuckyHyeoni.css'


function LuckyHyeoni({
    onBack,
    onGo,
    }) {

  const [rubAmount, setRubAmount] =
    useState(0)

  const [summonReady, setSummonReady] =
    useState(false)

  const [isSummoned, setIsSummoned] =
    useState(false)

  const [wish, setWish] =
    useState('')


  const isRubbingRef =
    useRef(false)

  const lastXRef =
    useRef(null)

    const [wishSaving, setWishSaving] = useState(false)
    const [wishSaved, setWishSaved] = useState(false)


  /* ==============================
     반짝이 개수
  ============================== */

  const sparkleCount =
    Math.floor(rubAmount / 10)


  /* ==============================
     100% → 소환 연출
  ============================== */

  useEffect(() => {
    if (rubAmount < 100) return

    setSummonReady(true)

    const timer = setTimeout(() => {
      setIsSummoned(true)
    }, 900)

    return () => {
      clearTimeout(timer)
    }
  }, [rubAmount])


  /* ==============================
     문지르기 시작
  ============================== */

  const handleRubStart = (event) => {
    if (summonReady) return

    isRubbingRef.current = true
    lastXRef.current =
      event.clientX

    event.currentTarget
      .setPointerCapture?.(
        event.pointerId
      )
  }


  /* ==============================
     문지르기
  ============================== */

  const handleRubMove = (event) => {
    if (summonReady) return

    if (!isRubbingRef.current) {
      return
    }

    if (
      lastXRef.current === null
    ) {
      return
    }


    const distance =
      Math.abs(
        event.clientX -
        lastXRef.current
      )


    if (distance > 2) {
      setRubAmount((prev) =>
        Math.min(
          prev +
            distance * 0.12,
          100
        )
      )

      lastXRef.current =
        event.clientX
    }
  }


  /* ==============================
     문지르기 종료
  ============================== */

  const handleRubEnd = () => {
    isRubbingRef.current = false
    lastXRef.current = null
  }


  /* ==============================
     소원 입력
     지금은 UI 동작만
  ============================== */

  const handleWishSubmit = async () => {
  const trimmedWish =
    wish.trim()

  if (!trimmedWish) return
  if (wishSaving || wishSaved) return

  setWishSaving(true)

  const { error } = await supabase
    .from('wishes')
    .insert({
      wish: trimmedWish,
    })

  if (error) {
    console.error(
      '소원 저장 실패:',
      error
    )

    setWishSaving(false)
    return
  }

  setWishSaving(false)
  setWishSaved(true)
}


  return (
    <section className="lucky-hyeoni">

      {/* =========================
          HEADER
      ========================== */}

      <div className="lucky-header">

        <p className="lucky-small">
          MAKE A WISH
        </p>

        <h1 className="lucky-title">
          LUCKY HYEONI
        </h1>

      </div>


      {/* =========================
          등장 전
      ========================== */}

      {!isSummoned && (
        <div className="lucky-before-summon">

          <p className="lucky-guide">
            요술램프를 문질문질해봐!
          </p>


          <div
            className={`
              lamp-area
              ${
                summonReady
                  ? 'summon-ready'
                  : ''
              }
            `}
          >

            <img
              className="magic-lamp"
              src={lamp}
              alt="요술램프"
              draggable="false"

              onPointerDown={
                handleRubStart
              }

              onPointerMove={
                handleRubMove
              }

              onPointerUp={
                handleRubEnd
              }

              onPointerCancel={
                handleRubEnd
              }

              onPointerLeave={
                handleRubEnd
              }
            />


            {/* 문지르는 동안 반짝이 */}

            <div className="lamp-sparkles">

              {Array.from({
                length:
                  sparkleCount,
              }).map(
                (_, index) => (

                  <span
                    key={index}

                    className={`
                      lamp-sparkle
                      sparkle-${
                        index % 8
                      }
                    `}
                  >
                    ✦
                  </span>

                )
              )}

            </div>


            {/* 소환 직전 팡 효과 */}

            {summonReady && (
              <div className="summon-burst">
                <span>✦</span>
                <span>✦</span>
                <span>✦</span>
                <span>✦</span>
                <span>✦</span>
                <span>✦</span>
              </div>
            )}

          </div>

        </div>
      )}


      {/* =========================
          혀니 등장 후
      ========================== */}

      {isSummoned && (
        <div className="summoned-content">

          {/* 말풍선 */}

          <div className="hyeoni-speech">
            {!wishSaved ? (
                <p>
                소원이 뭐야?
                <br />
                행운강아지 혀니가
                <br />
                다~~ 이루어줄게 😵‍💫
                </p>
            ) : (
                <p>
                접수 완료!
                <br />
                다른 사람의 소원도
                <br />
                구경할래?
                </p>
            )}
            </div>


          {/* 혀니 + 주전자 */}

          <div className="hyeoni-image-area">

            <img
              className="hyeoni-genie"
              src={hyeoniGenie}
              alt="행운강아지 혀니"
              draggable="false"
            />

          </div>

          {/* =====================
    소원 입력 / 완료 버튼
====================== */}

{!wishSaved ? (

  /* 저장 전 */

  <div className="wish-dialogue">

    <p className="wish-prefix">
      내 소원은...
    </p>

    <div className="wish-input-row">

      <input
        className="wish-input"
        type="text"
        value={wish}
        maxLength={40}
        placeholder="소원을 적어줘"
        disabled={wishSaving}

        onChange={(event) => {
          setWish(event.target.value)
        }}

        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            handleWishSubmit()
          }
        }}
      />

      <button
        className="wish-submit"
        type="button"
        onClick={handleWishSubmit}
        disabled={
          !wish.trim() ||
          wishSaving
        }
      >
        {wishSaving ? '...' : '▶'}
      </button>

    </div>

  </div>

) : (

  /* 저장 완료 후 */

  <div className="wish-complete-buttons">

    <button
      className="wish-complete-button"
      type="button"
      onClick={onGo}
    >
      GO
    </button>

    <button
      className="wish-complete-button"
      type="button"
      onClick={onBack}
    >
      MAIN
    </button>

  </div>

)}


        </div>
      )}


      {/* =========================
          BACK
      ========================== */}

      <button
        className="lucky-back"
        type="button"
        onClick={onBack}
      >
        ← BACK
      </button>

    </section>
  )
}


export default LuckyHyeoni