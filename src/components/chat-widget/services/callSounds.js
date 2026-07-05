let audioContext = null
let isMuted = false

const MUTE_STORAGE_KEY = 'vaultdrive_chat_muted'

function loadMutedPreference() {
  try {
    return localStorage.getItem(MUTE_STORAGE_KEY) === 'true'
  } catch {
    return false
  }
}

isMuted = loadMutedPreference()

function getAudioContext() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)()
  }
  return audioContext
}

function playTone(frequency, startTime, duration, volume = 0.06) {
  const ctx = getAudioContext()
  const oscillator = ctx.createOscillator()
  const gain = ctx.createGain()

  oscillator.type = 'sine'
  oscillator.frequency.value = frequency
  oscillator.connect(gain)
  gain.connect(ctx.destination)

  gain.gain.setValueAtTime(0, startTime)
  gain.gain.linearRampToValueAtTime(volume, startTime + 0.02)
  gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration)

  oscillator.start(startTime)
  oscillator.stop(startTime + duration)
}

function resumeAudio() {
  const ctx = getAudioContext()
  if (ctx.state === 'suspended') {
    ctx.resume()
  }
  return ctx
}

export function getIsMuted() {
  return isMuted
}

export function setIsMuted(muted) {
  isMuted = muted
  try {
    localStorage.setItem(MUTE_STORAGE_KEY, String(muted))
  } catch { /* ignore */ }
}

export function toggleMuted() {
  setIsMuted(!isMuted)
  return isMuted
}

export function playCallStartSound() {
  if (isMuted) return
  try {
    const ctx = resumeAudio()
    const now = ctx.currentTime
    playTone(523.25, now, 0.12)
    playTone(659.25, now + 0.1, 0.18)
  } catch { /* ignore */ }
}

export function playCallEndSound() {
  if (isMuted) return
  try {
    const ctx = resumeAudio()
    const now = ctx.currentTime
    playTone(392, now, 0.1)
    playTone(294, now + 0.08, 0.22, 0.05)
  } catch { /* ignore */ }
}

export function playMessageSentSound() {
  if (isMuted) return
  try {
    const ctx = resumeAudio()
    const now = ctx.currentTime
    playTone(880, now, 0.06, 0.04)
  } catch { /* ignore */ }
}

export function playMessageReceivedSound() {
  if (isMuted) return
  try {
    const ctx = resumeAudio()
    const now = ctx.currentTime
    playTone(587.33, now, 0.08, 0.045)
    playTone(698.46, now + 0.07, 0.12, 0.04)
  } catch { /* ignore */ }
}
