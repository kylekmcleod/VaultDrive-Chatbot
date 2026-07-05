import { useState } from 'react'
import { DEALERSHIP, QUICK_ACTIONS } from '../../../constants/config'
import WidgetHeader from '../ui/WidgetHeader'
import QuickActionButton from '../ui/QuickActionButton'
import WidgetInput from '../ui/WidgetInput'
import PoweredByFooter from '../ui/PoweredByFooter'
import './LandingScreen.css'

function LandingScreen({ onClose, onStartChat, isClosing }) {
  const [inputValue, setInputValue] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    // will add this in a bit but now its just placeholder until i figure out more
  }

  return (
    <section
      className={`landing-screen ${isClosing ? 'landing-screen--closing' : 'landing-screen--open'}`}
      aria-label="Chat welcome"
    >
      <WidgetHeader
        onClose={onClose}
      />

      <div className="landing-screen__body">
        <h2 className="landing-screen__title">
          Welcome to {DEALERSHIP.name}
        </h2>

        <div className="landing-screen__actions">
          {QUICK_ACTIONS.map((action, index) => (
            <QuickActionButton
              key={action.id}
              label={action.label}
              onClick={action.id === 'chat' ? onStartChat : undefined}
              style={{ animationDelay: `${120 + index * 80}ms` }}
            />
          ))}
        </div>
      </div>

      <div className="landing-screen__footer">
        <WidgetInput
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          onSubmit={handleSubmit}
        />

        <PoweredByFooter />
      </div>
    </section>
  )
}

export default LandingScreen
