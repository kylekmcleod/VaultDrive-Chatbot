import augustLogo from '../../../assets/august-logo.png'

function AugustLogo() {
  return (
    <div className="august-logo" aria-hidden="true">
      <img src={augustLogo} alt="" className="august-logo__img" />
      <span className="august-logo__status" />
    </div>
  )
}

export default AugustLogo
