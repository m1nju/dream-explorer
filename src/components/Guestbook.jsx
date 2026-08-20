import {
  useEffect,
  useState,
} from 'react'

import { supabase } from '../lib/supabase'

import './Guestbook.css'


function Guestbook({ onBack }) {
  const [nickname, setNickname] =
    useState('')

  const [message, setMessage] =
    useState('')

  const [entries, setEntries] =
    useState([])

  const [loading, setLoading] =
    useState(true)

  const [saving, setSaving] =
    useState(false)


  /* ==============================
     방명록 불러오기
  ============================== */

  const loadGuestbook = async () => {
    setLoading(true)

    const {
      data,
      error,
    } = await supabase
      .from('guestbook')
      .select(
        'id, nickname, message, created_at'
      )
      .order(
        'created_at',
        {
          ascending: false,
        }
      )
      .limit(50)

    if (error) {
      console.error(
        '방명록 불러오기 실패:',
        error
      )

      setLoading(false)
      return
    }

    setEntries(data || [])
    setLoading(false)
  }


  useEffect(() => {
    loadGuestbook()
  }, [])


  /* ==============================
     방명록 저장
  ============================== */

  const handleSubmit = async () => {
    const trimmedNickname =
      nickname.trim()

    const trimmedMessage =
      message.trim()

    if (
      !trimmedNickname ||
      !trimmedMessage ||
      saving
    ) {
      return
    }

    setSaving(true)

    const {
      data,
      error,
    } = await supabase
      .from('guestbook')
      .insert({
        nickname:
          trimmedNickname,

        message:
          trimmedMessage,
      })
      .select()
      .single()

    if (error) {
      console.error(
        '방명록 저장 실패:',
        error
      )

      setSaving(false)
      return
    }

    setEntries((prev) => [
      data,
      ...prev,
    ])

    setNickname('')
    setMessage('')

    setSaving(false)
  }


  return (
    <section className="guestbook">

      {/* =========================
          PIXEL WINDOW
      ========================== */}

      <div className="guestbook-window">


        {/* =====================
            WINDOW TITLE BAR
        ====================== */}

        <div className="guestbook-window-bar">

          <div className="window-title">

            <span className="window-heart">
              ♥
            </span>

            <span>
              GUESTBOOK.EXE
            </span>

          </div>


          <div className="window-controls">

            <span className="window-control">
              _
            </span>

            <span className="window-control window-maximize">
            <i />
            </span>

            <button
              className="window-control window-close"
              type="button"
              onClick={onBack}
              aria-label="닫기"
            >
              ×
            </button>

          </div>

        </div>


        {/* =====================
            WINDOW CONTENT
        ====================== */}

        <div className="guestbook-window-content">


          {/* HEADER */}

          <div className="guestbook-header">

            <p className="guestbook-small">
              LEAVE YOUR MESSAGE
            </p>

            <h1 className="guestbook-title">
              방명록
            </h1>

            <p className="guestbook-description">
              상현이에게 생일 축하 메시지를 남겨줘!
            </p>

          </div>


          {/* =====================
              WRITE
          ====================== */}

          <div className="guestbook-write">

            <div className="guestbook-name-row">

              <span className="guestbook-label">
                FROM.
              </span>

              <input
                className="guestbook-name-input"
                type="text"

                value={nickname}

                maxLength={12}

                placeholder="닉네임"

                onChange={(event) => {
                  setNickname(
                    event.target.value
                  )
                }}
              />

            </div>


            <textarea
              className="guestbook-message-input"

              value={message}

              maxLength={100}

              placeholder="축하 메시지를 입력해줘..."

              onChange={(event) => {
                setMessage(
                  event.target.value
                )
              }}
            />


            <div className="guestbook-write-bottom">

              <span className="guestbook-count">
                {message.length}/100
              </span>


              <button
                className="guestbook-submit"
                type="button"

                disabled={
                  !nickname.trim() ||
                  !message.trim() ||
                  saving
                }

                onClick={
                  handleSubmit
                }
              >
                {saving
                  ? '...'
                  : 'WRITE'}
              </button>

            </div>

          </div>


          {/* =====================
              DIVIDER
          ====================== */}

          <div className="guestbook-divider">

            <span>
              ✦ MESSAGES ✦
            </span>

          </div>


          {/* =====================
              MESSAGE LIST
          ====================== */}

          <div className="guestbook-list">

            {loading ? (

              <p className="guestbook-status">
                LOADING...
              </p>

            ) : entries.length === 0 ? (

              <p className="guestbook-status">
                첫 번째 메시지를 남겨줘!
              </p>

            ) : (

              entries.map(
                (entry) => (

                  <article
                    className="guestbook-entry"
                    key={entry.id}
                  >

                    <div className="guestbook-entry-top">

                      <span className="guestbook-entry-name">
                        {entry.nickname}
                      </span>

                      <span className="guestbook-entry-star">
                        ✦
                      </span>

                    </div>


                    <p className="guestbook-entry-message">
                      {entry.message}
                    </p>

                  </article>

                )
              )

            )}

          </div>

        </div>

      </div>


      {/* BACK */}

      <button
        className="guestbook-back"
        type="button"
        onClick={onBack}
      >
        ← BACK
      </button>

    </section>
  )
}


export default Guestbook