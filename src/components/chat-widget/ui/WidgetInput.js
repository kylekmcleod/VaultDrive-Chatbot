import SendIcon from './icons/SendIcon'
import './WidgetInput.css'

function WidgetInput({ value, onChange, onSubmit, placeholder = 'Ask me anything', disabled }) {
  return (
    <form className="widget-input" onSubmit={onSubmit}>
      <div className="widget-input__bar">
        <input
          type="text"
          className="widget-input__field"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          aria-label="Message input"
        />
        <button
          type="submit"
          className="widget-input__send"
          disabled={disabled || !value?.trim()}
          aria-label="Send message"
        >
          <SendIcon />
        </button>
      </div>
    </form>
  )
}

export default WidgetInput
