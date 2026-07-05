import { useEffect, useState } from 'react'
import augustLogo from '../assets/august-logo.png'
import heroBg1 from '../assets/hero-bg.png'
import heroBg2 from '../assets/hero-bg-2.png'
import heroBg3 from '../assets/hero-bg-3.png'
import badgeTexture from '../assets/badge-texture.png'
import './DemoPage.css'

const HERO_IMAGES = [heroBg1, heroBg2, heroBg3]
const SLIDE_INTERVAL = 6000

function DemoPage() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_IMAGES.length)
    }, SLIDE_INTERVAL)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="demo-page">
      <div className="demo-banner">
        NOTE: Our showroom will be closed July 1 for Canada Day
      </div>

      <nav className="demo-nav">
        <img src={augustLogo} alt="August Luxury Motorcars" className="demo-nav__logo" />
        <div className="demo-nav__links">
          <a href="#inventory">Inventory</a>
          <a href="#sell">Sell</a>
          <a href="#finance">Finance</a>
          <a href="#service">Service</a>
          <a href="#customize">Customize</a>
          <a href="#about">About</a>
        </div>
      </nav>

      <main className="demo-hero">
        {HERO_IMAGES.map((img, index) => (
          <div
            key={index}
            className={`demo-hero__slide ${index === currentSlide ? 'demo-hero__slide--active' : ''}`}
            style={{ backgroundImage: `url(${img})` }}
          />
        ))}
        <div className="demo-hero__overlay" />
        <div className="demo-hero__content">
          <span
            className="demo-hero__badge"
            style={{ backgroundImage: `url(${badgeTexture})` }}
          >
            Welcome To August Motorcars
          </span>
          <h1 className="demo-hero__title">
            YOUR #1 SOURCE FOR LUXURY &amp; EXOTIC CARS
          </h1>
          <p className="demo-hero__subtitle">
            Exceptional automobiles. Tailored experiences. Timeless prestige.
          </p>

          <div className="demo-hero__actions">
            <button type="button" className="demo-btn demo-btn--outline">Buy</button>
            <button type="button" className="demo-btn demo-btn--filled">Sell</button>
          </div>

          <div className="demo-hero__search">
            <input type="text" placeholder="Search our inventory..." readOnly />
            <button type="button" className="demo-btn demo-btn--gold">Search</button>
          </div>

          <div className="demo-hero__filters">
            <button type="button" className="demo-filter">Featured</button>
            <button type="button" className="demo-filter">Recent Arrivals</button>
            <button type="button" className="demo-filter">Under $60K</button>
            <button type="button" className="demo-filter">Sold</button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default DemoPage
