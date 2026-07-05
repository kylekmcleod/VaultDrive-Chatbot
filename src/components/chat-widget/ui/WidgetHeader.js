import AugustLogo from './AugustLogo'
import CloseIcon from './icons/CloseIcon'
import './AugustLogo.css'
import './WidgetHeader.css'

function WidgetHeader({ onClose }) {
  return (
    <header className="widget-header">
      <div className="widget-header__brand">
        <AugustLogo />
      </div>
      <button
        type="button"
        className="widget-header__close"
        onClick={onClose}
        aria-label="Close chat"
      >
        <CloseIcon />
      </button>
    </header>
  )
}

export default WidgetHeader
