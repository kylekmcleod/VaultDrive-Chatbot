import { useState, useEffect, useRef } from 'react'
import WidgetHeader from '../ui/WidgetHeader'
import PoweredByFooter from '../ui/PoweredByFooter'
import { playCallStartSound, playCallEndSound } from '../services/callSounds'
import jessicaAvatar from '../assets/jessica-avatar.png'
import './VoiceScreen.css'

const STATUSES = ['Connecting...', 'Connected']
const CONNECT_DELAY = 2000
const NUM_DOTS = 40

function useParticleDots(canvasRef, isConnected) {
  useEffect(() => {
    if (!isConnected) return
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let animId

    const dots = Array.from({ length: NUM_DOTS }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 2.5 + 1.5,
    }))

    function resize() {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const dot of dots) {
        dot.x += dot.vx
        dot.y += dot.vy

        if (dot.x < 0 || dot.x > canvas.width) dot.vx *= -1
        if (dot.y < 0 || dot.y > canvas.height) dot.vy *= -1

        ctx.beginPath()
        ctx.arc(dot.x, dot.y, dot.r, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(0, 0, 0, 0.15)'
        ctx.fill()
      }

      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x
          const dy = dots[i].y - dots[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 120) {
            ctx.beginPath()
            ctx.moveTo(dots[i].x, dots[i].y)
            ctx.lineTo(dots[j].x, dots[j].y)
            ctx.strokeStyle = `rgba(0, 0, 0, ${0.12 * (1 - dist / 120)})`
            ctx.lineWidth = 0.7
            ctx.stroke()
          }
        }
      }

      animId = requestAnimationFrame(draw)
    }

    resize()

    for (let i = 0; i < 1200; i++) {
      for (const dot of dots) {
        dot.x += dot.vx
        dot.y += dot.vy
        if (dot.x < 0 || dot.x > canvas.width) dot.vx *= -1
        if (dot.y < 0 || dot.y > canvas.height) dot.vy *= -1
      }
    }

    draw()

    const observer = new ResizeObserver(resize)
    observer.observe(canvas)

    return () => {
      cancelAnimationFrame(animId)
      observer.disconnect()
    }
  }, [isConnected, canvasRef])
}

function VoiceScreen({ onClose, onSwitchToText, isClosing }) {
  const [status, setStatus] = useState(STATUSES[0])
  const [elapsed, setElapsed] = useState(0)
  const isConnected = status === 'Connected'
  const canvasRef = useRef(null)

  useParticleDots(canvasRef, isConnected)

  useEffect(() => {
    const timer = setTimeout(() => {
      setStatus(STATUSES[1])
      playCallStartSound()
    }, CONNECT_DELAY)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!isConnected) return
    const interval = setInterval(() => setElapsed((s) => s + 1), 1000)
    return () => clearInterval(interval)
  }, [isConnected])

  const handleEndCall = () => {
    playCallEndSound()
    onClose()
  }

  return (
    <section
      className={`voice-screen ${isClosing ? 'voice-screen--closing' : 'voice-screen--open'}`}
      aria-label="Voice call with Jessica"
    >
      {isConnected && (
        <canvas ref={canvasRef} className="voice-screen__dots" />
      )}
      <WidgetHeader onClose={onClose} />

      <div className="voice-screen__body">
        <div className="voice-screen__mic-wrapper">
          <div className="voice-screen__pulse voice-screen__pulse--1" />
          <div className="voice-screen__pulse voice-screen__pulse--2" />
          <div className="voice-screen__pulse voice-screen__pulse--3" />
          <img src={jessicaAvatar} alt="Jessica" className="voice-screen__avatar" />
        </div>

        <div className="voice-screen__controls">
          <p className={`voice-screen__status ${isConnected ? 'voice-screen__status--connected' : ''}`}>
            {status}
          </p>

          {isConnected && (
            <span className="voice-screen__timer">
              {String(Math.floor(elapsed / 60)).padStart(2, '0')}:{String(elapsed % 60).padStart(2, '0')}
            </span>
          )}

          <button
            type="button"
            className="voice-screen__end-btn"
            onClick={handleEndCall}
          >
            End Call
          </button>
        </div>
      </div>

      <div className="voice-screen__footer">
        <p className="voice-screen__toggle">
          Prefer to type?{' '}
          <button type="button" className="voice-screen__toggle-link" onClick={onSwitchToText}>
            Switch to text
          </button>
        </p>
        <PoweredByFooter />
      </div>
    </section>
  )
}

export default VoiceScreen
