import {
  useEffect,
  useState,
} from 'react'


import './DreamCall.css'
import hyeon1 from '../assets/hyeon1.png'


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


  const endingList = [
    { id: 'ending-01', label: 'WISH UPON A STAR', icon: '★' },
    { id: 'ending-02', label: 'DREAM EXPLORER', icon: '★' },
    { id: 'ending-03', label: 'ALREADY HERE', icon: '★' },
    { id: 'ending-04', label: 'DREAM KEEPER', icon: '☁' },
    { id: 'ending-05', label: 'FORGOTTEN DREAM', icon: '☁' },
    { id: 'ending-06', label: 'ONE MORE NIGHT', icon: '🌙' },
    { id: 'ending-07', label: 'EVERYDAY WISH', icon: '🌙' },
    { id: 'ending-08', label: 'MOON WATCHER', icon: '🌙' },
    { id: 'bad-01', label: 'MISSED CALL', icon: '☎' },
    { id: 'bad-02', label: 'TOP SECRET', icon: '🔒' },
  ]


  useEffect(() => {
    const saved =
      JSON.parse(
        localStorage.getItem(
          'dream-call-endings'
        ) || '[]'
      )

    setFoundEndings(saved)
  }, [])


  const foundCount =
    endingList.filter((ending) =>
      foundEndings.includes(ending.id)
    ).length

  const allEndingsFound =
    foundCount === endingList.length


    const dialogueData = {
  'reality-question': {
    image: hyeon1,

    name: 'HYEONI',

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

    name: 'HYEONI',

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

    name: 'HYEONI',

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
    image: hyeon1,

    name: 'HYEONI',

    lines: [
      '근데 이상하다.',
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
    image: hyeon1,

    name: 'HYEONI',

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
    image: hyeon1,

    name: 'HYEONI',

    lines: [
      '뭐야.',
      '나 행운강아지인데.. ㅠㅡㅜ',
      '나한테도 비밀이야?',
    ],

    options: [
      {
        label: '사실 내 거야.',
        next: 'wish-mine',
      },

      {
        label: '비밀이지 ㅋㅋ',
        next: 'secret-bad',
      },
    ],
  },


  'wish-none': {
    image: hyeon1,

    name: 'HYEONI',

    lines: [
      '없다고?',
      '이상한데.',
      '그럼 내가 따라온 건 뭐지?',
      '아..',
      '아직 네가 모르는 소원인가 보다.',
    ],

    options: [
      {
        label: '그럴 수도 있겠다.',
        next: 'signal-warning',
      },
    ],
  },

  /* ==============================
   STAR ROUTE
================================ */

'star-route': {
  image: hyeon1,

  name: 'HYEONI',

  lines: [
    '별?',
    '역시 그거 고를 줄 알았어.',
    '별은 멀리 있어도 보이잖아.',
    '그럼 마지막.',
    '꿈이 진짜 이루어질 수 있다면',
    '넌 어떻게 할래?',
  ],

  options: [
    {
      label: '이루어질 때까지 기다릴래.',
      action: 'ending-01',
    },

    {
      label: '내가 직접 찾으러 갈래.',
      action: 'ending-02',
    },

    {
      label: '지금 순간순간 조금씩 이루어지고 있는 거라고 생각해.',
      action: 'ending-03',
    },
  ],
},

/* ==============================
   CLOUD ROUTE
================================ */

'cloud-route': {
  image: hyeon1,

  name: 'HYEONI',

  lines: [
    '구름?',
    '잡으려고 하면',
    '모양이 계속 바뀌는데',
    '그래도 예쁘지.',
    '너는 꿈에서 깨어나면',
    '꿈을 잘 기억하는 편이야?',
  ],

  options: [
    {
      label: '오래 기억해.',
      action: 'ending-04',
    },

    {
      label: '금방 까먹어.',
      action: 'ending-05',
    },
  ],
},

/* ==============================
   MOON ROUTE
================================ */

'moon-route': {
  image: hyeon1,

  name: 'HYEONI',

  lines: [
    '달이네.',
    '이상하다...',
    '꿈에서 보는 달인데도',
    '현실에서 보는 거랑 똑같아.',
    '너라면 지금 이 달에',
    '뭐 하나 부탁할래?',
  ],

  options: [
    {
      label: '오늘이 조금 더 오래갔으면 좋겠어.',
      action: 'ending-06',
    },

    {
      label: '내일도 오늘처럼 행복했으면 좋겠어.',
      action: 'ending-07',
    },

    {
      label: '아무것도 안 빌래.',
      next: 'moon-no-wish',
    },
  ],
},


'moon-no-wish': {
  image: hyeon1,

  name: 'HYEONI',

  lines: [
    '왜?',
    '달까지 떴는데',
    '아깝잖아.',
  ],

  options: [
    {
      label: '그냥 보고 있는 것도 좋아.',
      action: 'ending-08',
    },
  ],
},


  'secret-bad': {
    image: hyeon1,

    name: 'HYEONI',

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
    image: hyeon1,

    name: 'HYEONI',

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
    image: hyeon1,

    name: 'HYEONI',

    lines: [
      '네가 원하는 일이 이루어졌으면 좋겠구나.',
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
    image: hyeon1,

    name: 'HYEONI',

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
    image: hyeon1,

    name: 'HYEONI',

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
              : '행운강아지 혀니'}

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
          전화 연결
      ========================== */}

      {screen === 'connected' && (

  <div className="call-dialogue">

    <div className="dialogue-icon-wrap">

      <img
        className="dialogue-icon"
        src={dialogueData[dialogueStep].image}
        alt="혀니"
        draggable="false"
      />

    </div>


    <p className="dialogue-name">
      {dialogueData[dialogueStep].name}
    </p>


    <div className="dialogue-box">

      {dialogueData[dialogueStep].lines.map(
        (line, index) => (

          <p key={index}>
            {line}
          </p>

        )
      )}

    </div>


    <div className="dialogue-options">

      {dialogueData[dialogueStep].options.map(
        (option, index) => (

          <button
            key={index}
            type="button"

            onClick={() => {

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
        뭔지 알아야
        <br />
        내가 들어줄 수가 있잖아...
      </p>

      <p>
        됐다.
        <br />
        안 들어줄 거야.
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
    ENDING 01
    WISH UPON A STAR
========================== */}

{screen === 'ending-01' && (

  <div className="ending-screen">

    <p className="ending-type normal-ending">
      ENDING 01
    </p>

    <h1>
      WISH UPON A STAR
    </h1>


    <div className="ending-dialogue">

      <p>
        혀니:
      </p>

      <p>
        알겠어.
      </p>

      <p>
        그럼 네가 기다리는 동안
        <br />
        내가 잘 지켜보고 있을게.
      </p>

      <p>
        언젠가 저 별이
        <br />
        네 앞까지 올지도 모르잖아.
      </p>

    </div>


    <div className="ending-result">

      <p>
        ★
      </p>

      <span>
        YOUR WISH IS STILL TRAVELING...
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
      다시 전화하기
    </button>

  </div>

)}

{/* =========================
    ENDING 02
    DREAM EXPLORER
========================== */}

{screen === 'ending-02' && (

  <div className="ending-screen">

    <p className="ending-type normal-ending">
      ENDING 02
    </p>

    <h1>
      DREAM EXPLORER
    </h1>


    <div className="ending-dialogue">

      <p>
        혀니:
      </p>

      <p>
        역시 기다리기만 하는 건
        <br />
        재미없지.
      </p>

      <p>
        그럼 먼저 가.
      </p>

      <p>
        꿈이 어디 있는지 모르겠으면
        <br />
        찾아다니면 되니까.
      </p>

    </div>


    <div className="ending-result">

      <p>
        NEW DESTINATION FOUND.
      </p>

      <span>
        LOCATION : ????
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
      다시 전화하기
    </button>

  </div>

)}

{/* =========================
    ENDING 03
    ALREADY HERE
========================== */}

{screen === 'ending-03' && (

  <div className="ending-screen">

    <p className="ending-type normal-ending">
      ENDING 03
    </p>

    <h1>
      ALREADY HERE
    </h1>


    <div className="ending-dialogue">

      <p>
        혀니:
      </p>

      <p>
        ...
      </p>

      <p>
        그 대답
        <br />
        마음에 드는데?
      </p>

      <p>
        찾고 있던 꿈은
        <br />
        생각보다 가까운 곳에
        <br />
        있었을지도 몰라.
      </p>

      <p>
        그러니까 잘 찾아봐.
      </p>

    </div>


    <div className="ending-result">

      <p>
        ★
      </p>

      <span>
        MAYBE IT'S ALREADY HERE.
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
      다시 전화하기
    </button>

  </div>

)}

{/* =========================
    ENDING 04
    DREAM KEEPER
========================== */}

{screen === 'ending-04' && (

  <div className="ending-screen">

    <p className="ending-type normal-ending">
      ENDING 04
    </p>

    <h1>
      DREAM KEEPER
    </h1>


    <div className="ending-dialogue">

      <p>
        혀니:
      </p>

      <p>
        그럼 이것도 기억해줘.
      </p>

      <p>
        오늘
        <br />
        행운강아지 하나
        <br />
        만났다는 거.
      </p>
      
      <p>
        잘 자. 사랑해! 
      </p>

    </div>


    <div className="ending-result">

      <p>
        ☁
      </p>

      <span>
        CALL ENDED.
      </span>

      <span>
        MEMORY SAVED. ✓
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
    ENDING 05
    FORGOTTEN DREAM
========================== */}

{screen === 'ending-05' && (

  <div className="ending-screen">

    <p className="ending-type normal-ending">
      ENDING 05
    </p>

    <h1>
      FORGOTTEN DREAM
    </h1>


    <div className="ending-dialogue">

      <p>
        혀니:
      </p>

      <p>
        역시.
      </p>

      <p>
        그럴 줄 알고
        <br />
        내가 하나 남겨놨어.
      </p>

    </div>


    <div className="ending-result">

      <p>
        NEW FILE FOUND
      </p>

      <span>
        오늘의꿈.txt
      </span>

    </div>


    <div className="ending-dialogue">

      <p>
        오늘 너는 꿈에서
        <br />
        행운강아지를 만났음.
      </p>

      <p>
        잊어버리면
        <br />
        다시 접속할 것.
      </p>

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
    ENDING 06
    ONE MORE NIGHT
========================== */}

{screen === 'ending-06' && (

  <div className="ending-screen">

    <p className="ending-type normal-ending">
      ENDING 06
    </p>

    <h1>
      ONE MORE NIGHT
    </h1>


    <div className="ending-dialogue">

      <p>
        혀니:
      </p>

      <p>
        나도.
      </p>

      <p>
        좋은 날은 왜
        <br />
        항상 빨리 끝나는지 모르겠어.
      </p>

      <p>
        그럼 조금만 더 있다 가자.
        <br />
        아직 꿈이니까.
      </p>

    </div>


    <div className="ending-result">

      <p>
        🌙
      </p>

      <span>
        00:00 HAS BEEN DELAYED...
      </span>

      <span>
        JUST FOR TONIGHT.
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
    ENDING 07
    EVERYDAY WISH
========================== */}

{screen === 'ending-07' && (

  <div className="ending-screen">

    <p className="ending-type true-ending">
      ENDING 07
    </p>

    <h1>
      EVERYDAY WISH
    </h1>


    <div className="ending-dialogue">

      <p>
        혀니:
      </p>

      <p>
        내일도?
      </p>

      <p>
        욕심 많네.
      </p>

      <p>
        ...
      </p>

      <p>
        근데 그 정도는
        <br />
        빌어도 되지.
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
        WISH ACCEPTED.
      </p>

      <span>
        TODAY → TOMORROW → ...
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
    ENDING 08
    MOON WATCHER
========================== */}

{screen === 'ending-08' && (

  <div className="ending-screen">

    <p className="ending-type normal-ending">
      ENDING 08
    </p>

    <h1>
      MOON WATCHER
    </h1>


    <div className="ending-dialogue">

      <p>
        혀니:
      </p>

      <p>
        ...
      </p>

      <p>
        그런 것도 있구나.
      </p>

      <p>
        꼭 뭔가 이루어져야만
        <br />
        좋은 꿈인 건 아니니까.
      </p>

      <p>
        그럼 우리
        <br />
        달 없어질 때까지만
        <br />
        있다 가자.
      </p>

    </div>


    <div className="ending-result">

      <p>
        🌙
      </p>

      <span>
        NO WISH DETECTED.
      </span>

      <span>
        NO ERROR DETECTED.
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

              {endingList.map((ending, index) => {
                const found =
                  foundEndings.includes(ending.id)

                return (
                  <div
                    className={`
                      call-record-item
                      ${
                        found
                          ? 'found'
                          : 'locked'
                      }
                    `}
                    key={ending.id}
                  >

                    <span className="record-number">
                      {String(index + 1).padStart(2, '0')}
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
            HYEONI
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
              별도 가보고,
              <br />
              구름도 가보고,
              <br />
              달도 가보고...
            </p>

            <p>
              나도 두 번이나
              <br />
              삐지게 하고.
            </p>

            <p>
              진짜 너무한다.
            </p>

            <p>
              ...
            </p>

            <p>
              근데 있잖아.
            </p>

            <p>
              꿈은 하나 다 봤다고
              <br />
              끝나는 게 아니래.
            </p>

            <p>
              오늘 꾸던 꿈에서 깨면
              <br />
              또 다른 꿈을 꾸면 되니까.
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