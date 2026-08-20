import './BirthdayCafe.css'


function BirthdayCafe({ onBack }) {
  const address =
    '서울 ○○구 ○○로 00'


  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(address)

      alert('주소를 복사했어!')
    } catch (error) {
      console.error(
        '주소 복사 실패:',
        error
      )
    }
  }


  const handleOpenMap = () => {
    /*
      나중에 실제 지도 링크 넣기
      예:
      window.open(
        'https://...',
        '_blank'
      )
    */

    console.log('MAP OPEN')
  }


  return (
    <section className="birthday-cafe">

      {/* =========================
          MAIN PANEL
      ========================== */}

      <div className="cafe-panel">


        {/* =====================
            TOP BAR
        ====================== */}

        <div className="cafe-panel-top">

          <span>
            ✦
          </span>

          <span>
            BIRTHDAY EVENT
          </span>

          <span>
            ✦
          </span>

        </div>


        {/* =====================
            CONTENT
        ====================== */}

        <div className="cafe-content">


          {/* =====================
              HEADER
          ====================== */}

          <div className="cafe-header">

            <p className="cafe-small">
              DREAM EVENT INFORMATION
            </p>

            <h1 className="cafe-title">
              상현이날
            </h1>

            <p className="cafe-subtitle">
              상상이 현실이 되는 오늘!
            </p>

          </div>


          {/* =====================
              DATE
          ====================== */}

          <div className="cafe-info-box">

            <span className="cafe-info-label">
              DATE
            </span>

            <p className="cafe-info-value">
              09.18 - 09.19
            </p>

          </div>


          {/* =====================
              OPEN
          ====================== */}

          <div className="cafe-info-box">

            <span className="cafe-info-label">
              OPEN
            </span>

            <p className="cafe-info-value">
              11:00 - 20:00
            </p>

          </div>


          {/* =====================
              PLACE
          ====================== */}

          <div className="cafe-info-box">

            <span className="cafe-info-label">
              PLACE
            </span>

            <p className="cafe-place-name">
              카페 이름
            </p>

            <p className="cafe-address">
              {address}
            </p>


            <div className="cafe-place-buttons">

              <button
                className="cafe-mini-button"
                type="button"
                onClick={handleOpenMap}
              >
                MAP
              </button>


              <button
                className="cafe-mini-button"
                type="button"
                onClick={handleCopyAddress}
              >
                COPY
              </button>

            </div>

          </div>


          {/* =====================
              EVENT INFO
          ====================== */}

          <section className="cafe-event">

            <div className="cafe-event-title">

              <span>
                ✦
              </span>

              <span>
                EVENT INFO
              </span>

              <span>
                ✦
              </span>

            </div>


            <div className="cafe-event-list">

              <div className="cafe-event-row">

                <span className="cafe-event-dot">
                  ▶
                </span>

                <span>
                  기본 특전 안내
                </span>

              </div>


              <div className="cafe-event-row">

                <span className="cafe-event-dot">
                  ▶
                </span>

                <span>
                  럭키드로우 안내
                </span>

              </div>


              <div className="cafe-event-row">

                <span className="cafe-event-dot">
                  ▶
                </span>

                <span>
                  기타 이벤트 안내
                </span>

              </div>

            </div>

          </section>


          {/* =====================
              NOTICE
          ====================== */}

          <div className="cafe-notice">

            <span className="cafe-notice-icon">
              !
            </span>

            <p>
              자세한 내용은
              <br />
              추후 공지를 확인해줘.
            </p>

          </div>

        </div>

      </div>


      {/* =========================
          BACK
      ========================== */}

      <button
        className="cafe-back"
        type="button"
        onClick={onBack}
      >
        ← BACK
      </button>

    </section>
  )
}


export default BirthdayCafe