import './BirthdayCafe.css'

function BirthdayCafe({ onBack }) {
  return (
    <section className="birthday-cafe">

      <div className="cafe-panel">

        <div className="cafe-panel-top">
          BIRTHDAY EVENT
        </div>

        <div className="cafe-content">

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


          <div className="cafe-info-box">

            <span className="cafe-info-label">
              DATE
            </span>

            <p className="cafe-info-value">
              09.18 - 09.19
            </p>

          </div>


          <div className="cafe-info-box">

            <span className="cafe-info-label">
              OPEN
            </span>

            <p className="cafe-info-value">
              11:00 - 20:00
            </p>

          </div>


          <div className="cafe-info-box">

            <span className="cafe-info-label">
              PLACE
            </span>

            <p className="cafe-place-name">
              카페 이름
            </p>

            <p className="cafe-address">
              서울 ○○구 ○○로 00
            </p>

          </div>

        </div>

      </div>


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