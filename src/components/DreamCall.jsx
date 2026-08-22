import {
  useEffect,
  useState,
} from 'react'


import './DreamCall.css'
import hyeon1 from '../assets/hyeon1.png'
import hyeon2 from '../assets/hyeon2.png'
import hyeon3 from '../assets/hyeon3.png'
import hyeon4 from '../assets/hyeon4.png'
import hyeon5 from '../assets/hyeon5.png'
import hyeon6 from '../assets/hyeon6.png'
import hyeon7 from '../assets/hyeon7.png'
import hyeon8 from '../assets/hyeon8.png'
import hyeon9 from '../assets/hyeon9.png'

function DreamCall({ onBack }) {

    const [dialogueStep, setDialogueStep] =
  useState('reality-question')

  const [screen, setScreen] =
    useState('incoming')

  const [ignoreCount, setIgnoreCount] =
    useState(0)

  const [showRecord, setShowRecord] =
    useState(false)

  const [foundEndings, setFoundEndings] =
    useState([])

    const [fallingStarActive, setFallingStarActive] =
  useState(false)

const [starCaught, setStarCaught] =
  useState(false)

  const [cloudMemoryStep, setCloudMemoryStep] =
  useState(0)

const [cloudFileOpen, setCloudFileOpen] =
  useState(false)

  const [moonTime, setMoonTime] =
  useState('23:59:57')

const [moonChoiceVisible, setMoonChoiceVisible] =
  useState(false)

const [moonPaused, setMoonPaused] =
  useState(false)

  const [moonContinueStep, setMoonContinueStep] =
  useState(0)

  const [visibleLineCount, setVisibleLineCount] =
  useState(1)

  const [showDialogueOptions, setShowDialogueOptions] =
  useState(false)

  const [hyeonClickCount, setHyeonClickCount] =
  useState(0)

const [hyeonClickMessage, setHyeonClickMessage] =
  useState('')

const [hyeonClickLocked, setHyeonClickLocked] =
  useState(false)

  const [idleMessage, setIdleMessage] =
  useState('')

const [idleStage, setIdleStage] =
  useState(0)


const endingList = [
  { id: 'ending-01', label: 'CATCH A FALLING STAR', icon: '🌟', type: 'normal' },
  { id: 'ending-02', label: 'WISH UPON A STAR', icon: '💫', type: 'normal' },
  { id: 'ending-03', label: 'JUST A STAR', icon: '⭐️', type: 'normal' },
  { id: 'ending-04', label: 'FORGOTTEN DREAM', icon: '☁️', type: 'normal' },
  { id: 'ending-05', label: 'ONE MORE NIGHT', icon: '🌙', type: 'normal' },
  { id: 'ending-06', label: 'TOMORROW, AGAIN', icon: '🌙', type: 'normal' },

  { id: 'bad-01', label: 'MISSED CALL', icon: '😵‍💫', type: 'bad' },
  { id: 'bad-02', label: 'TOP SECRET', icon: '🔒', type: 'bad' },
  { id: 'bad-03', label: 'FALSE ALARM', icon: '💢', type: 'bad' },
  { id: 'bad-04', label: 'DO NOT TOUCH', icon: '✕', type: 'bad' },

  {
    id: 'easter-01',
    label: 'ARE YOU THERE?',
    hint: 'ARE YOU THERE?',
    icon: '📞',
    type: 'easter',
  },
]

  const handleHyeonClick = () => {

  if (hyeonClickLocked) {
    return
  }

  const nextCount =
    hyeonClickCount + 1

  setHyeonClickCount(nextCount)


  /* 3번 */

  if (nextCount === 3) {
    setHyeonClickMessage('왜')

    setTimeout(() => {
      setHyeonClickMessage('')
    }, 1200)

    return
  }


  /* 6번 */

  if (nextCount === 6) {
    setHyeonClickMessage('왜 자꾸 눌러')

    setTimeout(() => {
      setHyeonClickMessage('')
    }, 1400)

    return
  }


  /* 10번 */

  if (nextCount === 10) {

    setHyeonClickLocked(true)
    setHyeonClickMessage('야!!!')

    setTimeout(() => {

      setHyeonClickMessage('')

      saveEnding('bad-04')

      setScreen('bad-04')

    }, 1000)

  }

}


  useEffect(
    () => {
    const saved =
      JSON.parse(
        localStorage.getItem(
          'dream-call-endings'
        ) || '[]'
      )

    setFoundEndings(saved)
  }, [])

useEffect(() => {
  setVisibleLineCount(1)
  setShowDialogueOptions(false)
}, [dialogueStep])

useEffect(() => {
  if (screen !== 'connected') {
    return
  }

  const currentDialogue =
    dialogueData[dialogueStep]

  if (!currentDialogue) {
    return
  }

  if (
    visibleLineCount >=
    currentDialogue.lines.length
  ) {
    return
  }

  const timer = setTimeout(() => {
    setVisibleLineCount(
      (prev) => prev + 1
    )
  }, 900)

  return () => {
    clearTimeout(timer)
  }
}, [
  screen,
  dialogueStep,
  visibleLineCount,
])

useEffect(() => {
  if (
    screen !== 'connected' ||
    !showDialogueOptions
  ) {
    setIdleMessage('')
    setIdleStage(0)
    return
  }

  const timer1 = setTimeout(() => {
    setIdleStage(1)
    setIdleMessage('여보세요?')
  }, 15000)

  const timer2 = setTimeout(() => {
    setIdleStage(2)
    setIdleMessage('듣고 있어?')
  }, 22000)

  const timer3 = setTimeout(() => {
    setIdleStage(3)
    setIdleMessage('설마 자?')
  }, 29000)

  const timer4 = setTimeout(() => {
    setIdleStage(4)
    setIdleMessage('나 혼자 말하고 있었네...')
  }, 36000)

  const timer5 = setTimeout(() => {
    saveEnding('easter-01')
    setScreen('easter-are-you-there')
  }, 39000)

  return () => {
    clearTimeout(timer1)
    clearTimeout(timer2)
    clearTimeout(timer3)
    clearTimeout(timer4)
    clearTimeout(timer5)
  }
}, [
  screen,
  showDialogueOptions,
  dialogueStep,
])

  useEffect(() => {
  if (screen !== 'moon-pause') {
    return
  }

  setMoonTime('23:59:57')
  setMoonPaused(false)

  const timer1 = setTimeout(() => {
    setMoonTime('23:59:58')
  }, 900)

  const timer2 = setTimeout(() => {
    setMoonTime('23:59:59')
  }, 1800)

  const timer3 = setTimeout(() => {
    setMoonPaused(true)
  }, 2700)

  return () => {
    clearTimeout(timer1)
    clearTimeout(timer2)
    clearTimeout(timer3)
  }
}, [screen])

useEffect(() => {
  if (screen !== 'connected') {
    return
  }

  const currentDialogue =
    dialogueData[dialogueStep]

  if (!currentDialogue) {
    return
  }

  if (
    visibleLineCount <
    currentDialogue.lines.length
  ) {
    return
  }

  const timer = setTimeout(() => {
    setShowDialogueOptions(true)
  }, 900)

  return () => {
    clearTimeout(timer)
  }
}, [
  screen,
  dialogueStep,
  visibleLineCount,
])


useEffect(() => {
  if (screen !== 'moon-continue') {
    return
  }

  setMoonTime('23:59:57')
  setMoonContinueStep(0)

  const timer1 = setTimeout(() => {
    setMoonTime('23:59:58')
  }, 900)

  const timer2 = setTimeout(() => {
    setMoonTime('23:59:59')
  }, 1800)

  const timer3 = setTimeout(() => {
    setMoonTime('00:00:00')
    setMoonContinueStep(1)
  }, 2700)

  return () => {
    clearTimeout(timer1)
    clearTimeout(timer2)
    clearTimeout(timer3)
  }
}, [screen])



  useEffect(() => {
  if (screen !== 'moon-clock') {
    return
  }

  setMoonTime('23:59:57')
  setMoonChoiceVisible(false)

  const timer1 = setTimeout(() => {
    setMoonTime('23:59:58')
  }, 1200)

  const timer2 = setTimeout(() => {
    setMoonTime('23:59:59')
  }, 2400)

  const timer3 = setTimeout(() => {
    setMoonChoiceVisible(true)
  }, 3200)

  return () => {
    clearTimeout(timer1)
    clearTimeout(timer2)
    clearTimeout(timer3)
  }
}, [screen])


  const foundCount =
    endingList.filter((ending) =>
      foundEndings.includes(ending.id)
    ).length

  const allEndingsFound =
    foundCount === endingList.length


    const dialogueData = {
  'reality-question': {
    image: hyeon1,

    name: 'HYEONIE',

    lines: [
      '여보세요?',
      '...',
      '혹시 거기 현실이야?',
    ],

    options: [
      {
        label: '나도 모르겠어..',
        next: 'reality-yes',
      },

      {
        label: '아니, 나도 꿈인데?',
        next: 'reality-no',
      },
    ],
  },


  'reality-yes': {
    image: hyeon1,

    name: 'HYEONIE',

    lines: [
      '여긴 아마',
      '누군가의 꿈 속인 것 같아..',
      '근데 길을 잃어버렸어ㅜㅜ',
    ],

    options: [
      {
        label: '그래서 나한테 전화한 거야?',
        next: 'wish-question',
      },
    ],
  },


  'reality-no': {
    image: hyeon1,

    name: 'HYEONIE',

    lines: [
      '진짜?',
      '잘됐다.',
      '나 지금 누군가의 꿈 속에서 길 잃었거든..',
    ],

    options: [
      {
        label: '그럼 어떡해?',
        next: 'wish-question',
      },
    ],
  },


  'wish-question': {
    image: hyeon2,

    name: 'HYEONIE',

    lines: [
      '나는 분명 누군가의 소원을 따라가다가',
      '여기로 왔어.',
      '혹시...',
      '그거 네 거야?',
    ],

    options: [
      {
        label: '응. 내 소원 맞아.',
        next: 'wish-mine',
      },

      {
        label: '글쎄? 비밀인데.',
        next: 'wish-secret',
      },

      {
        label: '난 소원 같은 거 없는데?',
        next: 'wish-none',
      },
    ],
  },


  'wish-mine': {
    image: hyeon3,

    name: 'HYEONIE',

    lines: [
      '역시.',
      '어쩐지 엄청 반짝거리더라.',
      '근데 내용은 안 보여.',
      '무슨 소원인데?',
    ],

    options: [
      {
        label: '사랑하는 사람이 행복했으면 좋겠어',
        next: 'wish-type-happy',
      },

      {
        label: '내가 원하는 일이 이루어졌으면 좋겠어',
        next: 'wish-type-dream',
      },

      {
        label: '소소한 행운이 가득했으면 좋겠어',
        next: 'wish-type-everyone',
      },
    ],
  },


  'wish-secret': {
    image: hyeon6,

    name: 'HYEONIE',

    lines: [
      '뭐야.',
      '나 행운강아지인데.. ㅠㅡㅜ',
      '나한테도 비밀이야?',
    ],

    options: [
      {
        label: '사실 내 거야',
        next: 'wish-mine',
      },

      {
        label: '비밀이지',
        next: 'secret-bad',
      },
    ],
  },


  'wish-none': {
  image: hyeon6,

  name: 'HYEONIE',

  lines: [
    '없다고?',
    '이상한데.',
    '그럼 내가 따라온 건 뭐지?',
    '아..',
    '아직 네가 모르는 네 소원인가 보다.',
  ],

  options: [
    {
      label: '그럴 수도 있겠다.',
      next: 'signal-warning',
    },

    {
      label: '너 헛것 본 거 아니야?ㅋㅋ',
      next: 'hallucination-bad',
    },
  ],
},


'hallucination-bad': {
  image: hyeon9,

  name: 'HYEONIE',

  lines: [
    '뭐?',
    '헛것?',
    '...',
    '나 행운강아지거든?',
    '내가 소원 하나도 못 알아볼 것 같아?',
    '됐어.',
    '네 건 하나도 안 들어줄 거야.',
  ],

  options: [
    {
      label: '미안 ㅋㅋㅋ',
      action: 'bad-03',
    },
  ],
},

  /* ==============================
   STAR ROUTE
================================ */

'star-route': {
  image: hyeon5,

  name: 'HYEONIE',

  lines: [
    '...',
    '어??',
    '저기 별똥별 떨어지는 거 아니야?',
  ],

  options: [
    {
      label: '잡으러 간다',
      special: 'catch-star',
    },

    {
      label: '가만히 바라본다',
      next: 'watch-star',
    },
  ],
},


'watch-star': {
  image: hyeon5,

  name: 'HYEONIE',

  lines: [
    '뭐 해?',
    '혹시 별똥별에 소원 빌려고?',
  ],

  options: [
    {
      label: '소원을 빈다',
      next: 'make-star-wish',
    },

    {
      label: '그냥 끝까지 바라본다',
      special: 'watch-until-gone',
    },
  ],
},


'make-star-wish': {
  image: hyeon5,

  name: 'HYEONIE',

  lines: [
    '뭐 빌었어?',
    '...',
    '잠깐!!',
    '말하지 마.',
    '소원은 말하면 안 이루어진댔어ㅎㅎ',
    '이번엔 나한테도 비밀로 해주라.',
  ],

  options: [
    {
      label: '★',
      action: 'ending-02',
    },
  ],
},

/* ==============================
   CLOUD ROUTE
================================ */

'cloud-route': {
  image: hyeon8,

  name: 'HYEONIE',

  lines: [
    '여기 되게 조용하다.',
    '...',
    '구름은 솜사탕 같지 않아?',
    '아.',
    '근데 꿈에서 구름 사이를 지나가면',
    '기억을 하나씩 두고 가야 한대.',
  ],

  options: [
    {
      label: '기억을 두고 간다고?',
      special: 'cloud-memory',
    },
  ],
},

/* ==============================
   MOON ROUTE
================================ */

'moon-route': {
  image: hyeon8,

  name: 'HYEONIE',

  lines: [
    '오늘은 달이 예쁘게 떴네.',
    '근데 벌써 시간이 이렇게 됐어?',
    '꿈에서도 시간은 가나 봐.',
    '자정이 되면',
    '이 꿈도 끝나려나?',
  ],

  options: [
    {
      label: '시간을 확인해본다',
      special: 'moon-clock',
    },
  ],
},


  'secret-bad': {
    image: hyeon7,

    name: 'HYEONIE',

    lines: [
      'ㅠㅡㅜ',
      '너무해.',
      '뭔지 알아야 내가 들어줄 수 있잖아...',
      '됐어.',
      '안 들어줄 거야.',
    ],

    options: [
      {
        label: '...',
        action: 'bad-02',
      },
    ],
  },


  'wish-type-happy': {
    image: hyeon3,

    name: 'HYEONIE',

    lines: [
      '사랑하는 사람이 행복했으면 좋겠구나.',
      '좋아.',
      '기억해둘게',
      '그럼 나도 행복해지겠네? ㅎㅎㅎ',
    ],

    options: [
      {
        label: '다음',
        next: 'signal-warning',
      },
    ],
  },


  'wish-type-dream': {
    image: hyeon3,

    name: 'HYEONIE',

    lines: [
      '네가 원하는 일이 이루어졌으면 좋겠다구?!',
      '좋아.',
      '1등!! 합격!! 취업!! 승진!! 다 이루어질거야',
    ],

    options: [
      {
        label: '다음',
        next: 'signal-warning',
      },
    ],
  },


  'wish-type-everyone': {
    image: hyeon3,

    name: 'HYEONIE',

    lines: [
      '소소한 행운이 가득했으면 좋겠구나',
      '내일 길가다가 발밑을 유심히 봐봐',
      '돈을.. 주울지도 몰라',
    ],

    options: [
      {
        label: '다음',
        next: 'signal-warning',
      },
    ],
  },


  'signal-warning': {
    image: hyeon4,

    name: 'HYEONIE',

    lines: [
      '어?',
      '잠깐!!',
      '전화가 끊기려고 하는데?',
      '여기서 나가려면 뭔가 하나 골라야 한대.',
    ],

    options: [
      {
        label: '★ 별',
        next: 'star-route',
      },

      {
        label: '☁ 구름',
        next: 'cloud-route',
      },

      {
        label: '🌙 달',
        next: 'moon-route',
      },
    ],
  },
  
}

  /* ==============================
     엔딩 저장
  ============================== */

  const saveEnding = (endingId) => {
    const saved =
      JSON.parse(
        localStorage.getItem(
          'dream-call-endings'
        ) || '[]'
      )

    if (saved.includes(endingId)) {
      setFoundEndings(saved)
      return
    }

    const next = [
      ...saved,
      endingId,
    ]

    localStorage.setItem(
      'dream-call-endings',
      JSON.stringify(next)
    )

    setFoundEndings(next)
  }


  /* ==============================
     전화 무시
  ============================== */

  const handleIgnore = () => {

    const nextCount =
      ignoreCount + 1

    setIgnoreCount(nextCount)


    /* 세 번째 무시 */

    if (nextCount >= 3) {

      saveEnding('bad-01')

      setScreen('bad-01')

      return
    }


    /* 잠깐 끊긴 화면 */

    setScreen('ignored')

  }

  useEffect(() => {

  if (screen !== 'cloud-memory') {
    return
  }


  const timers = []


  timers.push(
    setTimeout(() => {
      setCloudMemoryStep(1)
    }, 1800)
  )


  timers.push(
    setTimeout(() => {
      setCloudMemoryStep(2)
    }, 3500)
  )


  timers.push(
    setTimeout(() => {
      setCloudMemoryStep(3)
    }, 5200)
  )


  timers.push(
    setTimeout(() => {
      setCloudMemoryStep(4)
    }, 7000)
  )


  return () => {

    timers.forEach(
      (timer) =>
        clearTimeout(timer)
    )

  }

}, [screen])

  /* ==============================
     다시 전화 걸려오기
  ============================== */

  useEffect(() => {

    if (screen !== 'ignored') {
      return
    }

    const timer =
      setTimeout(() => {

        setScreen('incoming')

      }, 1200)


    return () =>
      clearTimeout(timer)

  }, [screen])


  return (
    <section className="dream-call">

      {/* =========================
          전화 수신
      ========================== */}

      {screen === 'incoming' && (

        <div className="call-screen">

          <p className="call-status">
            INCOMING CALL
          </p>


          <div className="call-phone">
            ☎
          </div>


          <p className="call-caller">

            {ignoreCount < 2
              ? 'UNKNOWN'
              : '혀니'}

          </p>


          <p className="call-location">
            LOCATION : DREAM
          </p>


          {ignoreCount === 2 && (

            <div className="call-mini-message">
              <p>...</p>
              <p>받아쥬라...</p>
            </div>

          )}


          <div className="call-buttons">

            <button
                type="button"
                className="
                    call-button
                    call-accept
                "
                onClick={() => {
                    setDialogueStep('reality-question')
                    setScreen('connected')
                }}
                >
                응답
                </button>


            <button
              type="button"
              className="
                call-button
                call-ignore
              "
              onClick={handleIgnore}
            >
              거절
            </button>

          </div>


          <button
            type="button"
            className="call-record-button"
            onClick={() =>
              setShowRecord(true)
            }
          >
            CALL RECORD
          </button>

        </div>

      )}


      {/* =========================
          무시한 직후
      ========================== */}

      {screen === 'ignored' && (

        <div className="call-center-message">

          <p>
            CALL ENDED.
          </p>

          <span>
            ...
          </span>

        </div>

      )}

      {/* =========================
    MOON PAUSE
========================== */}

{screen === 'moon-pause' && (

  <div className="moon-clock-screen">

    <div
      className={`
        moon-clock-display
        ${moonPaused
          ? 'time-paused'
          : ''
        }
      `}
    >

      <p className="moon-date">
        2026/09/19
      </p>

      <p className="moon-time-label">
        TIME
      </p>

      <p className="moon-time">
        {moonTime}
      </p>

    </div>


    {moonPaused && (

  <div className="moon-system-message">

    <p>
      TIME PAUSED.
    </p>

    <span>
      혀니: ...어?
      <br />
      됐다!! 진짜 멈췄어.
    </span>

    <div className="dialogue-options">
  <button
    type="button"
    onClick={() => {
      saveEnding('ending-05')
      setScreen('ending-05')
    }}
  >
    오늘에 조금 더 있기
  </button>
</div>

  </div>

)}

  </div>

)}

{/* =========================
    MOON CONTINUE
========================== */}

{screen === 'moon-continue' && (

  <div className="moon-clock-screen">

    <div
  className={`
    moon-clock-display
    ${moonContinueStep > 0
      ? 'moon-clock-compact'
      : ''
    }
  `}
>

      <p className="moon-date">
        {moonTime === '00:00:00'
          ? '2026/09/20'
          : '2026/09/19'}
      </p>

      <p className="moon-time-label">
        TIME
      </p>

      <p className="moon-time">
        {moonTime}
      </p>

    </div>


    {moonContinueStep === 1 && (

      <div className="moon-continue-dialogue">

        <p className="dialogue-name">
          HYEONIE
        </p>


        <div className="dialogue-box">

          <p>
            ...
          </p>

          <p>
            어?
          </p>

          <p>
            아무 일도 안 일어났네?
          </p>

          <p>
            꿈도 안 끝났고,
            <br />
            나도 그대로 있고.
          </p>

          <p>
            ...
          </p>
          <p>
            오늘이 끝난다고
            <br />
            다 끝나는 건 아니구나.
          </p>

        </div>


        <div className="dialogue-options">

          <button
            type="button"
            onClick={() => {
              setMoonContinueStep(2)
            }}
          >
            그러게.
          </button>

        </div>

      </div>

    )}


    {moonContinueStep === 2 && (

      <div className="moon-continue-dialogue">


        <p className="dialogue-name">
          HYEONIE
        </p>


        <div className="dialogue-box">

          <p>
            그럼 오늘이 지나가도
            <br />
            내일이 또 오니까.
          </p>

          <p>
            오늘 좋았던 만큼
            <br />
            내일도 좋으면 되는 거야!
          </p>

          <p>
            ...
          </p>

          <p>
            자.
          </p>

          <p>
            이제 진짜
            <br />
            내일로 가자.
          </p>

        </div>


        <div className="dialogue-options">

          <button
            type="button"
            onClick={() => {
              saveEnding('ending-06')
              setScreen('ending-06')
            }}
          >
            내일로 가기
          </button>

        </div>

      </div>

    )}

  </div>

)}

{screen === 'easter-are-you-there' && (

  <div className="ending-screen">

    <p className="ending-type">
      EASTER EGG
    </p>

    <h1>
      ARE YOU THERE?
    </h1>

    <div className="ending-dialogue">

      <p>
        ...
      </p>

      <p>
        전화가 끊겼다.
      </p>

    </div>

    <div className="ending-result">

      <p>
        대답이 없었다...
      </p>

      <span>
        RESPONSE : NONE
      </span>

      <span>
        HYEONIE : WAITED
      </span>

    </div>

    <button
      type="button"
      className="ending-retry"

      onClick={() => {
        setDialogueStep('reality-question')

        setIdleMessage('')
        setIdleStage(0)

        setScreen('incoming')
        setIgnoreCount(0)
      }}
    >
      다시 전화하기
    </button>

  </div>

)}

      {/* =========================
          전화 연결
      ========================== */}

      {screen === 'connected' && (

  <div className="call-dialogue">

    <div className="dialogue-icon-wrap">

      <div className="hyeon-click-area">

  <img
    className="dialogue-icon hyeon-clickable"
    src={dialogueData[dialogueStep].image}
    alt="혀니"
    draggable="false"
    onClick={handleHyeonClick}
  />

  {hyeonClickMessage && (

    <div className="hyeon-click-bubble">
      {hyeonClickMessage}
    </div>

  )}

</div>

    </div>


    <p className="dialogue-name">
      {dialogueData[dialogueStep].name}
    </p>


    <div className="dialogue-box">

  {dialogueData[dialogueStep].lines
    .slice(0, visibleLineCount)
    .map((line, index) => (

      <p
        key={index}
        className="dialogue-line-appear"
      >
        {line}
      </p>

    ))
  }

</div>

{idleMessage && (

  <p
    className="idle-dialogue-message"
    key={idleStage}
  >
    {idleMessage}
  </p>

)}


   {showDialogueOptions && (

  <div className="dialogue-options dialogue-options-appear">

    {dialogueData[dialogueStep].options.map(
      (option, index) => (

          <button
            key={index}
            type="button"

            onClick={() => {

                /* =====================
      STAR SPECIAL
  ====================== */

  if (option.special === 'catch-star') {
    setFallingStarActive(true)
    setStarCaught(false)
    setScreen('catch-star')

    return
  }

  if (option.special === 'cloud-memory') {

  setCloudMemoryStep(0)
  setCloudFileOpen(false)

  setScreen('cloud-memory')

  return
}


  if (option.special === 'watch-until-gone') {
    setScreen('watch-star-fall')

    setTimeout(() => {
      saveEnding('ending-03')
      setScreen('ending-03')
    }, 4000)

    return
  }

  if (option.special === 'moon-clock') {
  setMoonTime('23:59:57')
  setMoonChoiceVisible(false)
  setMoonPaused(false)

  setScreen('moon-clock')

  return
}

  /* =====================
      ENDING
  ====================== */
  

  
  if (option.action) {

    saveEnding(option.action)

    setScreen(option.action)

    return
  }


  /* =====================
      NEXT DIALOGUE
  ====================== */

  if (option.next) {

    setDialogueStep(
      option.next
    )

  }

}}
          >
            {option.label}
          </button>

        )
      )}

    </div>
)}

</div>

)}

{/* =========================
    CATCH FALLING STAR
========================== */}

{screen === 'catch-star' && (

  <div className="star-game-screen">

    <p className="star-game-guide">
      떨어지는 별을 잡아!
    </p>


    {fallingStarActive && !starCaught && (

      <button
        type="button"
        className="falling-star"

        onClick={() => {
          setStarCaught(true)
          setFallingStarActive(false)

          saveEnding('ending-01')

          setTimeout(() => {
            setScreen('ending-01')
          }, 700)
        }}

        aria-label="떨어지는 별 잡기"
      >
        ★
      </button>

    )}


    {starCaught && (

      <div className="caught-star">
        ✦
      </div>

    )}

  </div>

)}

{/* =========================
    MOON CLOCK
========================== */}

{screen === 'moon-clock' && (

  <div className="moon-clock-screen">

    <div className="moon-clock-display">

      <p className="moon-date">
        2026/09/19
      </p>

      <p className="moon-time-label">
        TIME
      </p>

      <p className="moon-time">
        {moonTime}
      </p>

    </div>


    {moonChoiceVisible && (

      <div className="moon-choice-area">

        <p className="moon-hyeoni-message">
          이제 진짜 얼마 안 남았네.
          <br />
          시간 멈춰줄까?
        </p>


        <div className="moon-options">

          <button
            type="button"
            onClick={() => {
              setScreen(
                'moon-pause'
              )
            }}
          >
            멈춰줘
          </button>


          <button
            type="button"
            onClick={() => {
              setScreen(
                'moon-continue'
              )
            }}
          >
            그냥 두자
          </button>

        </div>

      </div>

    )}

  </div>

)}




{/* =========================
    CLOUD MEMORY
========================== */}

{screen === 'cloud-memory' && (

  <div className="cloud-memory-screen">


    {/* =====================
        HYEONI
    ====================== */}

    {cloudMemoryStep < 4 && (

      <div
        className={`
          cloud-memory-character
          cloud-fade-${cloudMemoryStep}
        `}
      >

        <div className="dialogue-icon-wrap">

          <img
            className="dialogue-icon"
            src={hyeon7}
            alt="혀니"
            draggable="false"
          />

        </div>


        <p className="dialogue-name">
          HYEONIE
        </p>

      </div>

    )}


    {/* =====================
        MEMORY TEXT
    ====================== */}

    {cloudMemoryStep === 0 && (

      <div className="cloud-memory-dialogue">

        <p>
          혀니:
        </p>

        <p>
          응.
        </p>

        <p>
          대신 어떤 기억이
          <br />
          사라질지는 모른대.
        </p>

        <p>
          뭐...
          <br />
          별거 아니겠지?
        </p>

      </div>

    )}


    {cloudMemoryStep === 1 && (

      <div className="cloud-memory-dialogue memory-fading">

        <p>
          혀니:
        </p>

        <p>
          응.
        </p>

        <p>
          대신 어떤 ______이
          <br />
          사라질지는 모른대.
        </p>

        <p>
          뭐...
          <br />
          별거 아니겠지?
        </p>

      </div>

    )}


    {cloudMemoryStep === 2 && (

      <div className="cloud-memory-dialogue memory-fading-more">

        <p>
          혀니:
        </p>

        <p>
          ...
        </p>

        <p>
          대신 어떤 ______이
          <br />
          ______지는 모른대.
        </p>

        <p>
          뭐...
          <br />
          ______ 아니겠지?
        </p>

      </div>

    )}


    {cloudMemoryStep === 3 && (

      <div className="cloud-memory-dialogue memory-almost-gone">

        <p>
          ...
        </p>

        <p>
          ______
        </p>

        <p>
          ______ ______
        </p>

      </div>

    )}


    {/* =====================
        FILE
    ====================== */}

    {cloudMemoryStep === 4 && (
      <>
        {!cloudFileOpen && (

          <button
            type="button"
            className="dream-file"

            onClick={() =>
              setCloudFileOpen(true)
            }
          >

            <span className="dream-file-icon">
            </span>

            <span>
              오늘의꿈.txt
            </span>

          </button>

        )}


        {cloudFileOpen && (

          <div className="dream-file-window">

            <div className="dream-file-header">

              <span>
                오늘의꿈.txt
              </span>

              <span>
                ×
              </span>

            </div>


            <div className="dream-file-content">

              <p>
                오늘 너는 꿈에서
                <br />
                혀니를 만났음.
              </p>

              <p>
                혀니를 따라
                <br />
                구름 사이까지 왔음.
              </p>

              <p>
                여기까지 읽었다면
                <br />
                아마 조금 잊어버린 것 같음.
              </p>

              <p>
                그래도 괜찮음.
                <br />
                다시 접속하면 기억날 수도 있으니까.
              </p>

            </div>


            <button
              type="button"
              className="dream-file-confirm"

              onClick={() => {

                saveEnding(
                  'ending-04'
                )

                setScreen(
                  'ending-04'
                )

              }}
            >
              확인
            </button>

          </div>

        )}

      </>
    )}

  </div>

)}


{/* =========================
    WATCH FALLING STAR
========================== */}

{screen === 'watch-star-fall' && (

  <div className="star-watch-screen">

    <p className="star-watch-text">
      ...
    </p>

    <span className="watching-star">
      ★
    </span>

  </div>

)}


      {/* =========================
          BAD END 01
      ========================== */}

      {screen === 'bad-01' && (

        <div className="ending-screen">

          <p className="ending-type">
            BAD END 01
          </p>

          <h1>
            MISSED CALL
          </h1>


          <div className="ending-dialogue">

            <p>
              혀니:
            </p>

            <p>
              됐어. ㅠㅡㅜ
              <br />
              전화하지 마.
            </p>

          </div>


          <div className="ending-result">

            <p>
              혀니가 삐쳤다...
            </p>

            <span>
              MISSED CALLS : 3
            </span>

            <span>
              행운 : +0
            </span>

          </div>


          <button
            type="button"
            className="ending-retry"
            onClick={() => {

              setIgnoreCount(0)
              setScreen('incoming')

            }}
          >
            혀니 달래러 가기
          </button>

        </div>

      )}

      {/* =========================
    BAD END 02
========================== */}

{screen === 'bad-02' && (

  <div className="ending-screen">

    <p className="ending-type">
      BAD END 02
    </p>

    <h1>
      TOP SECRET
    </h1>


    <div className="ending-dialogue">

      <p>
        혀니:
      </p>

      <p>
        ㅠㅡㅜ
        <br />
        너무해.
        <br />
        <br />
        평생 비밀로 해라...
        <br />
        흥!!
      </p>

    </div>


    <div className="ending-result">

      <p>
        혀니가 삐졌다...
      </p>

      <span>
        WISH STATUS : 보류
      </span>

      <span>
        REASON : 안 알려줌
      </span>

    </div>


    <button
      type="button"
      className="ending-retry"

      onClick={() => {
        setDialogueStep(
          'reality-question'
        )

        setScreen(
          'incoming'
        )

        setIgnoreCount(0)
      }}
    >
      혀니 달래러 가기
    </button>

  </div>

)}

{/* =========================
    BAD END 03
    FALSE ALARM
========================== */}

{screen === 'bad-03' && (

  <div className="ending-screen">

    <p className="ending-type">
      BAD END 03
    </p>

    <h1>
      FALSE ALARM
    </h1>


    <div className="ending-dialogue">

      <p>
        혀니:
      </p>

      <p>
        됐어.
      </p>

      <p>
        내가 헛것을 봤든
        <br />
        네가 소원이 없든
        <br />
        이제 알 바 아님.
      </p>

      <p>
        흥!!
      </p>

    </div>


    <div className="ending-result">

      <p>
        혀니가 또 삐졌다...
      </p>

      <span>
        WISH SENSOR : OFF
      </span>

      <span>
        TRUST LEVEL : -1
      </span>

      <span>
        REASON : 헛것 취급함
      </span>

    </div>


    <button
      type="button"
      className="ending-retry"
      onClick={() => {
        setDialogueStep('reality-question')
        setScreen('incoming')
        setIgnoreCount(0)
      }}
    >
      혀니 달래러 가기
    </button>

  </div>

)}


{/* =========================
    BAD END 04
    DO NOT TOUCH
========================== */}

{screen === 'bad-04' && (

  <div className="ending-screen">

    <p className="ending-type bad-ending">
      BAD END 04
    </p>

    <h1>
      DO NOT TOUCH
    </h1>


    <div className="ending-dialogue">

      <p>
        ...
      </p>

      <p>
        전화가 끊겼다.
      </p>

    </div>


    <div className="ending-result">

      <p>
        혀니가 귀찮아했다...
      </p>

      <span>
        REASON : 너무 많이 누름
      </span>

    </div>


    <button
      type="button"
      className="ending-retry"

      onClick={() => {

        setDialogueStep(
          'reality-question'
        )

        setHyeonClickCount(0)
        setHyeonClickMessage('')
        setHyeonClickLocked(false)

        setScreen(
          'incoming'
        )

        setIgnoreCount(0)

      }}
    >
      다시 전화하기
    </button>

  </div>

)}



{screen === 'ending-01' && (

  <div className="ending-screen">

    <p className="ending-type normal-ending">
      ENDING 01
    </p>

    <h1>
      CATCH A FALLING STAR
    </h1>


    <div className="ending-dialogue">

      <p>혀니:</p>

      <p>
        헐 진짜 잡았네??
      </p>

      <p>
        보통 떨어지는 별 보면
        <br />
        소원부터 빌지 않아?
      </p>

      <p>
        넌 그냥 잡아버리네..
      </p>

      <p>
        그럼 잘 가지고 있어!!!
        <br />
        어딘가에 쓸 수도 있지 않을까?? 
      </p>

    </div>


    <div className="ending-result">

      <p>★</p>

      <span>
        ITEM ACQUIRED : ★
      </span>

      <span>
        사용법은 아무도 모른다..
      </span>

    </div>


    <button
      type="button"
      className="ending-retry"
      onClick={() => {
        setDialogueStep('reality-question')
        setScreen('incoming')
        setIgnoreCount(0)
      }}
    >
      다시 전화하기
    </button>

  </div>

)}

{screen === 'ending-02' && (

  <div className="ending-screen">

    <p className="ending-type normal-ending">
      ENDING 02
    </p>

    <h1>
      WISH UPON A STAR
    </h1>


    <div className="ending-dialogue">

      <p>혀니:</p>

      <p>
        이번엔 안 물어볼게
      </p>

      <p>
        대신 이루어지면
        <br />
        나한테 알려줘.
      </p>

    </div>


    <div className="ending-result">

      <p>★</p>

      <span>
        WISH : ********
      </span>

      <span>
        STATUS : SENT
      </span>

      <span>
        혀니도 모르는 소원이
        하나 생겼습니다.
      </span>

    </div>


    <button
      type="button"
      className="ending-retry"
      onClick={() => {
        setDialogueStep('reality-question')
        setScreen('incoming')
        setIgnoreCount(0)
      }}
    >
      다시 전화하기
    </button>

  </div>

)}

{screen === 'ending-03' && (

  <div className="ending-screen">

    <p className="ending-type normal-ending">
      ENDING 03
    </p>

    <h1>
      JUST A STAR
    </h1>


    <div className="ending-dialogue">

      <p>혀니:</p>

      <p>...</p>

      <p>
        갔다.
      </p>

      <p>
        소원 안 빌어도 괜찮아?
      </p>

      <p>
        ...
      </p>

      <p>
        그래도 예쁘긴 했다.
      </p>

    </div>


    <div className="ending-result">

      <p>☆</p>

      <span>
        NO WISH MADE.
      </span>

      <span>
        그래도 별은 별이었다.
      </span>

    </div>


    <button
      type="button"
      className="ending-retry"
      onClick={() => {
        setDialogueStep('reality-question')
        setScreen('incoming')
        setIgnoreCount(0)
      }}
    >
      다시 전화하기
    </button>

  </div>

)}

{/* =========================
    ENDING 04
    FORGOTTEN DREAM
========================== */}

{screen === 'ending-04' && (

  <div className="ending-screen">

    <p className="ending-type normal-ending">
      ENDING 04
    </p>

    <h1>
      FORGOTTEN DREAM
    </h1>


    <div className="ending-dialogue">

      <p>
        ...
      </p>

      <p>
        무슨 꿈이었더라?
      </p>

    </div>


    <div className="ending-result">

      <p>
        MEMORY : 12%
      </p>

      <span>
        BACKUP : COMPLETE ✓
      </span>

      <span>
        오늘의꿈.txt
      </span>

    </div>


    <button
      type="button"
      className="ending-retry"

      onClick={() => {

        setDialogueStep(
          'reality-question'
        )

        setCloudMemoryStep(0)
        setCloudFileOpen(false)

        setScreen(
          'incoming'
        )

        setIgnoreCount(0)

      }}
    >
      다시 전화하기
    </button>

  </div>

)}



{/* =========================
    ENDING 05
    ONE MORE NIGHT
========================== */}

{screen === 'ending-05' && (

  <div className="ending-screen">

    <p className="ending-type normal-ending">
      ENDING 05
    </p>

    <h1>
      ONE MORE NIGHT
    </h1>

    <div className="ending-dialogue">

      <p>혀니:</p>

      <p>
        진짜 멈췄네
      </p>

      <p>
        그럼 오늘은
        <br />
        아직 안 끝난 거지?
      </p>

      <p>
        ...
      </p>

      <p>
        조금만 더 있다 가자.
      </p>

    </div>

    <div className="ending-result">

      <p>
        2026/09/19
      </p>

      <span>
        TIME : 23:59:59
      </span>

      <span>
        STATUS : PAUSED
      </span>

      <span>
        혀니의 생일은 아직 끝나지 않았습니다.
      </span>

    </div>

    <button
      type="button"
      className="ending-retry"
      onClick={() => {
        setDialogueStep('reality-question')
        setMoonPaused(false)
        setScreen('incoming')
        setIgnoreCount(0)
      }}
    >
      다시 전화하기
    </button>

  </div>

)}

{/* =========================
    ENDING 06
    EVERYDAY WISH
========================== */}

{screen === 'ending-06' && (

  <div className="ending-screen">

    <p className="ending-type true-ending">
      ENDING 06
    </p>

    <h1>
  TOMORROW, AGAIN
</h1>


    <div className="ending-dialogue">

      <p>
        혀니:
      </p>

      <p>
        생일은 하루지만
        <br />
        행복한 날까지
        <br />
        하루일 필요는 없잖아.
      </p>

    </div>


<div className="ending-result true-result">

  <p>
    TODAY : COMPLETE
  </p>

  <span>
    TOMORROW : READY
  </span>

  <strong>
    HAPPY SANGHYEON DAY ★
  </strong>

</div>


    <button
      type="button"
      className="ending-retry"
      onClick={() => {
        setDialogueStep('reality-question')
        setScreen('incoming')
        setIgnoreCount(0)
      }}
    >
      다시 전화하기
    </button>

  </div>

)}


      {/* =========================
          CALL RECORD
      ========================== */}

      {showRecord && (
        <div className="call-record-overlay">

          <div className="call-record-window">

            <div className="call-record-header">

              <span>
                DREAM CALL RECORD
              </span>

              <button
                type="button"
                onClick={() =>
                  setShowRecord(false)
                }
                aria-label="엔딩 기록 닫기"
              >
                ×
              </button>

            </div>


            <p className="call-record-count">
              {foundCount} / {endingList.length} FOUND
            </p>


            <div className="call-record-list">

  {/* =====================
      NORMAL + BAD
  ====================== */}

  {endingList
    .filter((ending) =>
      ending.type !== 'easter'
    )
    .map((ending, index) => {

      const found =
        foundEndings.includes(
          ending.id
        )

      return (

        <div
          className={`
            call-record-item
            ${ending.type || ''}
            ${
              found
                ? 'found'
                : 'locked'
            }
          `}
          key={ending.id}
        >

          <span className="record-number">
            {String(index + 1)
              .padStart(2, '0')}
          </span>

          <span className="record-icon">
            {found
              ? ending.icon
              : '?'}
          </span>

          <span className="record-name">
            {found
              ? ending.label
              : '????'}
          </span>

        </div>

      )

    })}


  {/* =====================
      EASTER EGGS
  ====================== */}

  <p className="record-section-title">
    EASTER EGGS
  </p>


  {endingList
    .filter((ending) =>
      ending.type === 'easter'
    )
    .map((ending, index) => {

      const found =
        foundEndings.includes(
          ending.id
        )

      return (

        <div
          className={`
            call-record-item
            easter
            ${
              found
                ? 'found'
                : 'locked'
            }
          `}
          key={ending.id}
        >

          <span className="record-number">
            E{String(index + 1)
              .padStart(2, '0')}
          </span>

          <span className="record-icon">
            {found
              ? ending.icon
              : '…'}
          </span>

          <span className="record-name">
            {found
              ? ending.label
              : ending.hint}
          </span>

        </div>

      )

    })}

</div>

            {allEndingsFound && (
              <div className="record-complete">

                <p>
                  DREAM EXPLORATION
                  <br />
                  100% COMPLETE
                </p>

                <button
                  type="button"
                  onClick={() => {
                    setShowRecord(false)
                    setScreen('secret-call')
                  }}
                >
                  CHECK NEW SIGNAL
                </button>

              </div>
            )}

          </div>

        </div>
      )}


      {/* =========================
          SECRET CALL
      ========================== */}

      {screen === 'secret-call' && (
        <div className="call-screen secret-call-screen">

          <p className="call-status">
            NEW SIGNAL DETECTED
          </p>

          <div className="call-phone">
            ☎
          </div>

          <p className="call-caller">
            혀니
          </p>

          <p className="call-location">
            LOCATION : ???
          </p>

          <div className="call-buttons">

            <button
              type="button"
              className="call-button call-accept"
              onClick={() =>
                setScreen('secret-epilogue')
              }
            >
              응답
            </button>

          </div>

        </div>
      )}


      {/* =========================
          SECRET EPILOGUE
      ========================== */}

      {screen === 'secret-epilogue' && (
        <div className="ending-screen secret-ending">

          <p className="ending-type true-ending">
            SECRET EPILOGUE
          </p>

          <h1>
            WAKE UP!
          </h1>


          <div className="ending-dialogue">

            <p>
              혀니:
            </p>

            <p>
              또 왔어?
            </p>

            <p>
              너 이제
              <br />
              여기 길 다 외웠지.
            </p>

            <p>
              별도, 구름도, 달고 보고...
            </p>

            <p>
              나도 세 번이나
              <br />
              삐치게 하고. ㅡㅡ
            </p>

            <p>
              그러니까 이제
              <br />
              진짜 돌아갈 시간이야.
            </p>

            <p>
              잘 가!
              <br />
              다음 꿈에서 또 만나 ★
            </p>

          </div>


          <div className="ending-result true-result">

            <p>
              DREAM EXPLORATION
            </p>

            <span>
              100% COMPLETE
            </span>

            <strong>
              SEE YOU IN YOUR NEXT DREAM...
            </strong>

          </div>


          <button
            type="button"
            className="ending-retry"
            onClick={onBack}
          >
            WAKE UP
          </button>

        </div>
      )}


      {/* =========================
          BACK
      ========================== */}

      <button
        className="dream-call-back"
        type="button"
        onClick={onBack}
      >
        ← BACK
      </button>

    </section>
  )
}




export default DreamCall