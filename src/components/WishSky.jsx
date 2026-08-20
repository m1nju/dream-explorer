import {
  useEffect,
  useRef,
  useState,
} from 'react'

import { supabase } from '../lib/supabase'

import lamp from '../assets/lamp.png'

import './WishSky.css'


function WishSky({ onBack }) {
  const [wishes, setWishes] =
    useState([])

  const [floatingWishes, setFloatingWishes] =
    useState([])

  const [loading, setLoading] =
    useState(true)

  const wishesRef =
    useRef([])


  /* ==============================
     서버에서 소원 가져오기
  ============================== */

  useEffect(() => {
    const loadWishes = async () => {
      setLoading(true)

      const {
        data,
        error,
      } = await supabase
        .from('wishes')
        .select(
          'id, wish, created_at'
        )
        .order(
          'created_at',
          {
            ascending: false,
          }
        )
        .limit(100)

      if (error) {
        console.error(
          '소원 불러오기 실패:',
          error
        )

        setLoading(false)
        return
      }

      const loaded =
        data || []

      setWishes(loaded)

      wishesRef.current =
        loaded

      setLoading(false)
    }

    loadWishes()
  }, [])


  /* ==============================
     소원을 하나씩 띄우기
  ============================== */

  useEffect(() => {
    if (wishes.length === 0) {
      return
    }


    const createFloatingWish = () => {
      const list =
        wishesRef.current

      if (list.length === 0) {
        return
      }


      /* 서버 소원 중 랜덤 선택 */

      const wish =
        list[
          Math.floor(
            Math.random() *
            list.length
          )
        ]


      /* 화면 위치 */

      const left =
        6 +
        Math.random() * 70


      /* 올라가는 시간
         숫자가 클수록 느림 */

      const duration =
        15 +
        Math.random() * 9


      /* 투명도 */

      const opacity =
        0.45 +
        Math.random() * 0.35


      /* 글자 크기 */

      const fontSize =
        11 +
        Math.random() * 3


      /* 좌우로 살짝 움직일 거리 */

      const drift =
        -18 +
        Math.random() * 36


      const floatingWish = {
        key:
          `${wish.id}-${Date.now()}-${Math.random()}`,

        text:
          wish.wish,

        left,
        duration,
        opacity,
        fontSize,
        drift,
      }


      setFloatingWishes(
        (prev) => [
          ...prev,
          floatingWish,
        ]
      )


      /*
        애니메이션 끝난 후
        DOM에서 제거
      */

      setTimeout(() => {

        setFloatingWishes(
          (prev) =>
            prev.filter(
              (item) =>
                item.key !==
                floatingWish.key
            )
        )

      }, (duration + 1) * 1000)
    }


    /*
      처음 들어왔을 때
      텅 비어있지 않게 하나 생성
    */

    createFloatingWish()


    /*
      ★ 핵심

      3~6초마다 소원 하나만 생성
    */

    let timer


    const scheduleNext = () => {

      const delay =
        1800 +
        Math.random() * 1700


      timer = setTimeout(() => {

        createFloatingWish()

        setTimeout(() => {
        createFloatingWish()
        }, 600)

        setTimeout(() => {
        createFloatingWish()
        }, 1300)

        scheduleNext()

      }, delay)

    }


    scheduleNext()


    return () => {
      clearTimeout(timer)
    }

  }, [wishes])


  return (
    <section className="wish-sky">

      {/* =========================
          HEADER
      ========================== */}

      <div className="wish-sky-header">

        <p className="wish-sky-small">
          EVERYONE'S WISH
        </p>

        <h1 className="wish-sky-title">
          WISH SKY
        </h1>

      </div>


      {/* =========================
          떠다니는 소원
      ========================== */}

      <div className="wish-cloud-area">

        {loading && (
          <p className="wish-sky-loading">
            LOADING...
          </p>
        )}


        {!loading &&
          wishes.length === 0 && (

            <p className="wish-sky-loading">
              아직 소원이 없어
            </p>

          )}


        {floatingWishes.map(
          (item) => (

            <span
              key={item.key}

              className="floating-wish"

              style={{
                '--wish-left':
                  `${item.left}%`,

                '--wish-duration':
                  `${item.duration}s`,

                '--wish-opacity':
                  item.opacity,

                '--wish-size':
                  `${item.fontSize}px`,

                '--wish-drift':
                  `${item.drift}px`,
              }}
            >
              {item.text}
            </span>

          )
        )}

      </div>


      {/* =========================
          LAMP
      ========================== */}

      <div className="wish-sky-lamp-area">

        <img
          className="wish-sky-lamp"
          src={lamp}
          alt="요술램프"
          draggable="false"
        />

      </div>


      {/* =========================
          BACK
      ========================== */}

      <button
        className="wish-sky-back"
        type="button"
        onClick={onBack}
      >
        ← BACK
      </button>

    </section>
  )
}


export default WishSky