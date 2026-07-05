import './QuickActionButton.css'

function QuickActionButton({ label, onClick, style }) {
  return (
    <button
      type="button"
      className="quick-action-button"
      onClick={onClick}
      style={style}
    >
      {label}
    </button>
  )
}

export default QuickActionButton
