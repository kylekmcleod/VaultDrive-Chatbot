import vaultdriveLogo from '../assets/vaultdrive-logo.png'
import './PoweredByFooter.css'

function PoweredByFooter() {
  return (
    <footer className="powered-by">
      <span>Powered by</span>
      <img src={vaultdriveLogo} alt="Vault Drive" className="powered-by__logo" />
    </footer>
  )
}

export default PoweredByFooter
