import { DEALERSHIP, QUICK_ACTIONS } from '../constants/config'
import WidgetHeader from '../ui/WidgetHeader'
import QuickActionButton from '../ui/QuickActionButton'
import PoweredByFooter from '../ui/PoweredByFooter'
import './LandingScreen.css'

function LandingScreen({ onClose, onStartChat, onStartVoice, isClosing, isMuted, onToggleMute }) {
  return (
    <section
      className={`landing-screen ${isClosing ? 'landing-screen--closing' : 'landing-screen--open'}`}
      aria-label="Chat welcome"
    >
      <WidgetHeader
        onClose={onClose}
        isMuted={isMuted}
        onToggleMute={onToggleMute}
      />

      <div className="landing-screen__body">
        <h2 className="landing-screen__title">
          Welcome to {DEALERSHIP.name}
        </h2>

        <div className="landing-screen__actions">
          {QUICK_ACTIONS.map((action, index) => (
            <QuickActionButton
              key={action.id}
              actionId={action.id}
              label={action.label}
              onClick={action.id === 'chat' ? () => onStartChat() : () => onStartVoice()}
              style={{ animationDelay: `${120 + index * 80}ms` }}
            />
          ))}
        </div>
      </div>

      <div className="landing-screen__footer">
        <PoweredByFooter />
      </div>
    </section>
  )
}

export default LandingScreen
