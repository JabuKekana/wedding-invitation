import { useEffect, useRef, useState } from 'react'
import portrait from './assets/sibusiso-zinhle-portrait.png'
import gardenPortrait from './assets/sibusiso-zinhle-garden.png'
import weddingSong from './assets/Ed Sheeran - Perfect.mp3'
import './App.css'

const WEDDING_DATE = new Date('2027-01-31T12:00:00+02:00')

const initialWishes = [
  { name: 'Jabu kekana', message: 'May your home always be filled with laughter, prayer and a love that grows gentler every year.', date: '18 November 2026' },
  { name: 'Lwando Cossa', message: 'Sibusiso and Zinhle, may this beautiful chapter be the beginning of your greatest adventure. Siyajabula nani!', date: '19 November 2026' },
  { name: 'Lerato Molefe', message: 'Wishing you a lifetime of choosing each other, dancing in the kitchen and celebrating every little win.', date: '21 November 2026' },
  { name: 'Thabiso & Nandi Khumalo', message: 'May the love surrounding you on this day follow you into every season of your marriage. Re a le lebogisa!', date: '23 November 2026' },
]

const schedule = [
  ['12:00', 'Guest arrival & welcome drinks'],
  ['12:30', 'Wedding ceremony'],
  ['13:30', 'Family photographs & canapés'],
  ['14:30', 'Newlyweds’ grand entrance'],
  ['15:00', 'Lunch, speeches & toasts'],
  ['16:30', 'Cake cutting & first dance'],
  ['17:00', 'Celebration on the dance floor'],
  ['18:00', 'A beautiful farewell'],
]

const gallery = [
  { src: gardenPortrait, alt: 'Sibusiso and Zinhle in the garden', position: 'center' },
  { src: portrait, alt: 'Sibusiso and Zinhle in wedding attire', position: 'center 30%' },
  { src: gardenPortrait, alt: 'The couple sharing a quiet moment', position: '70% center' },
  { src: portrait, alt: 'The couple on their wedding day', position: 'center 12%' },
]

function Icon({ name, size = 20 }) {
  const paths = {
    heart: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21.3l7.8-7.8 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />,
    music: <><path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" /></>,
    pause: <><path d="M8 5v14M16 5v14" /></>,
    pin: <><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 10h18" /></>,
    close: <path d="M18 6 6 18M6 6l12 12" />,
    chevronLeft: <path d="m15 18-6-6 6-6" />,
    chevronRight: <path d="m9 18 6-6-6-6" />,
    gift: <><rect x="3" y="8" width="18" height="13" rx="1" /><path d="M12 8v13M3 12h18M7.5 8C5 8 4 6.5 4.8 5.2 6 3.3 9.5 5 12 8c2.5-3 6-4.7 7.2-2.8C20 6.5 19 8 16.5 8" /></>,
    send: <path d="m22 2-7 20-4-9-9-4ZM22 2 11 13" />,
  }
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>
}

function Floral({ className = '' }) {
  return (
    <svg className={`floral ${className}`} viewBox="0 0 260 260" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="1.25">
        <path d="M242 13C174 50 126 109 87 174 67 207 42 232 13 246" />
        <path d="M204 34c-22 2-37 13-47 32 21 3 39-7 47-32ZM166 72c-25 1-42 13-53 34 24 4 43-8 53-34ZM126 119c-28 1-45 16-54 39 26 2 46-12 54-39ZM89 172c-25 5-38 22-42 45 22-3 38-19 42-45Z" fill="currentColor" opacity=".11" />
        <path d="M218 42c0 21 9 37 27 48 5-21-4-38-27-48ZM179 79c-1 26 11 43 31 53 4-24-7-43-31-53ZM139 127c-2 27 10 47 31 58 5-27-7-47-31-58ZM101 181c-1 25 10 43 29 53 5-24-6-43-29-53Z" fill="currentColor" opacity=".1" />
        <path d="M221 17c-7-15-24-12-22 1-13-2-17 14-5 19-7 11 7 21 15 10 7 11 23 2 17-10 13-4 9-21-5-20Z" fill="#fffaf0" />
        <circle cx="221" cy="26" r="4" fill="currentColor" opacity=".7" />
        <path d="M65 202c-11-12-26-4-21 9-13 2-12 20 2 20-3 13 13 18 18 5 10 9 23-3 14-13 11-8 1-23-13-21Z" fill="#fffaf0" />
        <circle cx="61" cy="220" r="4" fill="currentColor" opacity=".7" />
      </g>
    </svg>
  )
}

function SectionTitle({ eyebrow, children }) {
  return <div className="section-heading reveal"><span>{eyebrow}</span><h2>{children}</h2><i /></div>
}

function Countdown() {
  const calculate = () => {
    const distance = Math.max(0, WEDDING_DATE.getTime() - Date.now())
    return { days: Math.floor(distance / 86400000), hours: Math.floor((distance / 3600000) % 24), minutes: Math.floor((distance / 60000) % 60), seconds: Math.floor((distance / 1000) % 60) }
  }
  const [time, setTime] = useState(calculate)
  useEffect(() => {
    const timer = window.setInterval(() => setTime(calculate()), 1000)
    return () => window.clearInterval(timer)
  }, [])
  return <div className="countdown" aria-label={`${time.days} days, ${time.hours} hours, ${time.minutes} minutes and ${time.seconds} seconds until the wedding`}>
    {Object.entries(time).map(([label, value]) => <div className="countdown-unit" key={label}><strong>{String(value).padStart(2, '0')}</strong><span>{label}</span></div>)}
  </div>
}

function Modal({ open, onClose, children, className = '' }) {
  useEffect(() => {
    if (!open) return undefined
    const onKey = (event) => event.key === 'Escape' && onClose()
    document.body.classList.add('modal-open')
    window.addEventListener('keydown', onKey)
    return () => { document.body.classList.remove('modal-open'); window.removeEventListener('keydown', onKey) }
  }, [open, onClose])
  if (!open) return null
  return <div className="modal-backdrop" onMouseDown={(e) => e.target === e.currentTarget && onClose()}><div className={`modal ${className}`} role="dialog" aria-modal="true"><button className="modal-close" onClick={onClose} aria-label="Close"><Icon name="close" /></button>{children}</div></div>
}

function App() {
  const [musicPlaying, setMusicPlaying] = useState(false)
  const [rsvpOpen, setRsvpOpen] = useState(false)
  const [giftOpen, setGiftOpen] = useState(false)
  const [rsvpDone, setRsvpDone] = useState(false)
  const [attendance, setAttendance] = useState('attending')
  const [galleryIndex, setGalleryIndex] = useState(0)
  const [lightbox, setLightbox] = useState(false)
  const [wishes, setWishes] = useState(initialWishes)
  const [wishForm, setWishForm] = useState({ name: '', message: '' })
  const [wishSent, setWishSent] = useState(false)
  const audioRef = useRef(null)
  const autoScrollRef = useRef({ active: false, started: false, frame: null, resumeTimer: null, last: 0 })
  const touchY = useRef(null)

  const playMusic = async () => {
    try { await audioRef.current?.play(); setMusicPlaying(true) } catch { /* autoplay requires a gesture */ }
  }
  const toggleMusic = async () => {
    if (!audioRef.current) return
    if (audioRef.current.paused) await playMusic()
    else { audioRef.current.pause(); setMusicPlaying(false) }
  }

  useEffect(() => {
    const motionOkay = !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const state = autoScrollRef.current
    const stopAutoScroll = () => {
      state.active = false
      state.last = 0
      if (state.frame) window.cancelAnimationFrame(state.frame)
      if (state.resumeTimer) window.clearTimeout(state.resumeTimer)
      state.frame = null
      state.resumeTimer = null
    }
    const loop = (time) => {
      if (!state.active) return
      if (!state.last) state.last = time
      const delta = Math.min(time - state.last, 40)
      state.last = time
      // Assign scrollTop directly so CSS smooth-scrolling cannot queue animations
      // or compete with the user's wheel/touch input.
      document.scrollingElement.scrollTop += delta * 0.085
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4
      if (atBottom) { stopAutoScroll(); return }
      state.frame = window.requestAnimationFrame(loop)
    }
    const startAutoScroll = () => {
      if (!motionOkay || state.active) return
      state.active = true
      state.last = 0
      state.frame = window.requestAnimationFrame(loop)
    }
    const handleDirection = (down) => {
      // Manual interaction always wins. Auto-scroll only resumes after the
      // downward gesture has finished, so it never fights native scrolling.
      stopAutoScroll()
      if (down) {
        state.started = true
        if (audioRef.current?.paused) playMusic()
        if (motionOkay) state.resumeTimer = window.setTimeout(startAutoScroll, 450)
      }
    }
    const onWheel = (e) => Math.abs(e.deltaY) > 2 && handleDirection(e.deltaY > 0)
    const onTouchStart = (e) => { stopAutoScroll(); touchY.current = e.touches[0].clientY }
    const onTouchMove = (e) => {
      if (touchY.current === null) return
      const delta = touchY.current - e.touches[0].clientY
      if (Math.abs(delta) > 8) { handleDirection(delta > 0); touchY.current = e.touches[0].clientY }
    }
    const onPointerDown = (event) => {
      if (event.pointerType !== 'touch') stopAutoScroll()
    }
    const onKeyDown = (event) => {
      if (['ArrowUp', 'PageUp', 'Home'].includes(event.key)) stopAutoScroll()
      if (['ArrowDown', 'PageDown'].includes(event.key)) handleDirection(true)
    }
    window.addEventListener('wheel', onWheel, { passive: true })
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: true })
    window.addEventListener('pointerdown', onPointerDown, { passive: true })
    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('keydown', onKeyDown)
      stopAutoScroll()
    }
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('is-visible')), { threshold: 0.12 })
    document.querySelectorAll('.reveal').forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [wishes])

  const changeSlide = (direction) => setGalleryIndex((index) => (index + direction + gallery.length) % gallery.length)

  const addCalendar = () => {
    const event = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Mabunda Wedding//EN', 'BEGIN:VEVENT', 'UID:mabunda-wedding-20270131@example.com', 'DTSTAMP:20261124T120000Z', 'DTSTART:20270131T100000Z', 'DTEND:20270131T160000Z', 'SUMMARY:Sibusiso & Zinhle Wedding', 'LOCATION:Shepstone Gardens\\, 12 Hope Rd\\, Mountain View\\, Johannesburg\\, 2192', 'DESCRIPTION:Celebrate the wedding of Sibusiso Mabunda and Zinhle.', 'END:VEVENT', 'END:VCALENDAR'].join('\r\n')
    const url = URL.createObjectURL(new Blob([event], { type: 'text/calendar' }))
    const link = document.createElement('a'); link.href = url; link.download = 'sibusiso-and-zinhle-wedding.ics'; link.click(); URL.revokeObjectURL(url)
  }

  const submitWish = (event) => {
    event.preventDefault()
    if (!wishForm.name.trim() || !wishForm.message.trim()) return
    setWishes([{ ...wishForm, date: 'Just now' }, ...wishes])
    setWishForm({ name: '', message: '' }); setWishSent(true)
    window.setTimeout(() => setWishSent(false), 3500)
  }

  return (
    <main>
      <audio ref={audioRef} src={weddingSong} loop preload="auto" />
      <button className={`music-control ${musicPlaying ? 'is-playing' : ''}`} onClick={toggleMusic} aria-label={musicPlaying ? 'Pause background music' : 'Play background music'}>
        <span className="music-icon"><Icon name={musicPlaying ? 'pause' : 'music'} /></span><span>{musicPlaying ? 'Pause music' : 'Play our song'}</span><i /><i /><i />
      </button>

      <section className="hero-section">
        <div className="hero-photo"><img src={portrait} alt="Sibusiso and Zinhle dressed for their wedding" /></div><div className="hero-overlay" />
        <Floral className="hero-floral floral-one" /><Floral className="hero-floral floral-two" />
        <div className="hero-copy"><p className="overline">Together with their families</p><div className="monogram"><span>S</span><i>&amp;</i><span>Z</span></div><h1><span>Sibusiso</span><em>&amp;</em><span>Zinhle</span></h1><div className="hero-rule"><i /><Icon name="heart" size={15} /><i /></div><p className="hero-date">31 · 01 · 2027</p><p className="hero-place">Shepstone Gardens · Johannesburg</p></div>
        <button className="scroll-cue" onClick={() => document.querySelector('#invitation').scrollIntoView({ behavior: 'smooth' })}><span>Begin our story</span><i /></button>
      </section>

      <section className="invitation-section page-section" id="invitation">
        <Floral className="corner-floral top-left" /><Floral className="corner-floral bottom-right" />
        <div className="invitation-card reveal"><span className="tiny-label">You are warmly invited</span><h2>To celebrate our love</h2><p className="script-copy">With grateful hearts, we invite you to witness the beginning of our forever and share in a day filled with joy, family and love.</p><div className="names-lockup"><strong>Sibusiso Mabunda</strong><em>&amp;</em><strong>Zinhle Mabunda</strong></div><div className="date-lockup"><span>Sunday</span><strong>31</strong><span>January<br />2027</span></div><p className="time-copy">From twelve o’clock in the afternoon<br />until six o’clock in the evening</p><button className="button button-primary" onClick={() => setRsvpOpen(true)}>RSVP to our day</button></div>
      </section>

      <section className="story-section page-section"><div className="story-photo reveal"><img src={gardenPortrait} alt="Sibusiso and Zinhle sharing a moment in a garden" /><span>Our next chapter</span></div><div className="story-copy reveal"><SectionTitle eyebrow="A love worth celebrating">Our forever begins</SectionTitle><p>Every journey has a moment that changes everything. Ours was built in laughter, patience, friendship and a thousand ordinary days that became extraordinary together.</p><blockquote>“I have found the one whom my soul loves.”<cite>Song of Solomon 3:4</cite></blockquote><p>Now, surrounded by the people who shaped us, we cannot wait to say “I do”.</p></div></section>

      <section className="details-section page-section"><SectionTitle eyebrow="Save the date">The celebration</SectionTitle><div className="details-grid"><article className="detail-card reveal"><Icon name="calendar" size={28} /><span>When</span><h3>Sunday, 31 January 2027</h3><p>12:00 — 18:00</p><button className="text-button" onClick={addCalendar}>Add to calendar</button></article><article className="detail-card detail-card-featured reveal"><Icon name="pin" size={28} /><span>Where</span><h3>Shepstone Gardens</h3><p>12 Hope Rd, Mountain View<br />Johannesburg, 2192</p><a className="text-button" href="https://www.google.com/maps/dir/?api=1&destination=Shepstone+Gardens%2C+12+Hope+Rd%2C+Mountain+View%2C+Johannesburg%2C+2192" target="_blank" rel="noreferrer">Get directions</a></article><article className="detail-card reveal"><Icon name="heart" size={28} /><span>Dress code</span><h3>Summer Formal</h3><p>Champagne · Sage · Neutrals<br /><small>Please reserve ivory for the bride</small></p><div className="swatches"><i /><i /><i /><i /></div></article></div></section>

      <section className="countdown-section page-section"><Floral className="countdown-floral" /><div className="countdown-copy reveal"><span className="tiny-label">Counting every second</span><h2>Until we say “I do”</h2><Countdown /><button className="button button-light" onClick={() => setRsvpOpen(true)}>Confirm attendance</button></div></section>

      <section className="gallery-section page-section"><SectionTitle eyebrow="A glimpse of us">Our gallery</SectionTitle><div className="gallery-shell reveal"><button className="gallery-arrow left" onClick={() => changeSlide(-1)} aria-label="Previous image"><Icon name="chevronLeft" size={28} /></button><button className="gallery-image" onClick={() => setLightbox(true)} aria-label="Open image full screen"><img src={gallery[galleryIndex].src} style={{ objectPosition: gallery[galleryIndex].position }} alt={gallery[galleryIndex].alt} /><span>Tap to view</span></button><button className="gallery-arrow right" onClick={() => changeSlide(1)} aria-label="Next image"><Icon name="chevronRight" size={28} /></button><div className="gallery-thumbs">{gallery.map((image, index) => <button className={index === galleryIndex ? 'active' : ''} onClick={() => setGalleryIndex(index)} key={index}><img src={image.src} alt="" style={{ objectPosition: image.position }} /></button>)}</div><p>{String(galleryIndex + 1).padStart(2, '0')} <i /> {String(gallery.length).padStart(2, '0')}</p></div></section>

      <section className="venue-section page-section"><div className="venue-copy reveal"><SectionTitle eyebrow="Find your way">Shepstone Gardens</SectionTitle><p>A hidden architectural gem set among magnificent gardens in the heart of Johannesburg.</p><address>12 Hope Road<br />Mountain View, Johannesburg<br />2192</address><a className="button button-primary" href="https://www.google.com/maps/dir/?api=1&destination=Shepstone+Gardens%2C+12+Hope+Rd%2C+Mountain+View%2C+Johannesburg%2C+2192" target="_blank" rel="noreferrer"><Icon name="pin" /> Get directions</a></div><div className="map-wrap reveal"><iframe title="Map to Shepstone Gardens" src="https://www.google.com/maps?q=Shepstone+Gardens,+12+Hope+Rd,+Mountain+View,+Johannesburg,+2192&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></div></section>

      <section className="schedule-section page-section"><SectionTitle eyebrow="From arrival to farewell">Order of the day</SectionTitle><div className="timeline">{schedule.map(([time, item], index) => <div className="timeline-item reveal" key={time}><time>{time}</time><i><span>{index + 1}</span></i><p>{item}</p></div>)}</div></section>

      <section className="guestbook-section page-section"><Floral className="corner-floral guest-floral" /><SectionTitle eyebrow="Leave a little love">Guestbook</SectionTitle><div className="guestbook-layout"><form className="wish-form reveal" onSubmit={submitWish}><h3>Write us a message</h3><label>Your name<input value={wishForm.name} onChange={(e) => setWishForm({ ...wishForm, name: e.target.value })} placeholder="e.g. Naledi Mokoena" required /></label><label>Your wishes<textarea value={wishForm.message} onChange={(e) => setWishForm({ ...wishForm, message: e.target.value })} placeholder="Share a memory, blessing or piece of advice…" rows="5" required /></label><button className="button button-primary" type="submit"><Icon name="send" size={18} /> Send wishes</button>{wishSent && <p className="form-success">Your message has been added with love.</p>}</form><div className="wishes-list">{wishes.map((wish, index) => <article className="wish-card reveal" key={`${wish.name}-${index}`}><Icon name="heart" size={15} /><p>“{wish.message}”</p><footer><strong>{wish.name}</strong><time>{wish.date}</time></footer></article>)}</div></div></section>

      <section className="gift-section page-section"><div className="gift-box reveal" onClick={() => setGiftOpen(true)} role="button" tabIndex="0" onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setGiftOpen(true)}><div className="gift-lid"><span /></div><div className="gift-base"><span /></div><i className="gift-bow left" /><i className="gift-bow right" /><Icon name="gift" size={36} /></div><div className="gift-copy reveal"><SectionTitle eyebrow="Your presence is our present">A note on gifts</SectionTitle><p>Celebrating with you is the greatest gift we could ask for. Should you wish to bless our new chapter, tap the gift box for our honeymoon fund details.</p><button className="text-button" onClick={() => setGiftOpen(true)}>Open the gift box</button></div></section>

      <footer className="site-footer"><Floral className="footer-floral" /><p>With love</p><h2>Sibusiso <em>&amp;</em> Zinhle</h2><span>31 January 2027 · Johannesburg</span><div className="footer-heart"><Icon name="heart" size={14} /></div></footer>

      <Modal open={rsvpOpen} onClose={() => { setRsvpOpen(false); setRsvpDone(false) }} className="rsvp-modal">{!rsvpDone ? <><span className="tiny-label">We hope you can join us</span><h2>Confirm your attendance</h2><p>Please RSVP for our celebration by 10 January 2027.</p><form onSubmit={(event) => { event.preventDefault(); setRsvpDone(true) }}><label>Full name<input placeholder="Your full name" required /></label><fieldset><legend>Will you be joining us?</legend><button type="button" className={attendance === 'attending' ? 'selected' : ''} onClick={() => setAttendance('attending')}>Joyfully accepts</button><button type="button" className={attendance === 'declined' ? 'selected' : ''} onClick={() => setAttendance('declined')}>Regretfully declines</button></fieldset>{attendance === 'attending' && <><label>Number of guests<select defaultValue="1"><option>1</option><option>2</option><option>3</option><option>4</option></select></label><label>Dietary requirements<textarea rows="2" placeholder="Let us know how we can take care of you" /></label></>}<button className="button button-primary" type="submit">Send RSVP</button></form></> : <div className="modal-success"><Icon name="heart" size={34} /><h2>{attendance === 'attending' ? 'We cannot wait to celebrate with you!' : 'Thank you for letting us know'}</h2><p>{attendance === 'attending' ? 'Your RSVP has been received for this demo.' : 'You will be dearly missed.'}</p><button className="button button-primary" onClick={() => setRsvpOpen(false)}>Close</button></div>}</Modal>

      <Modal open={giftOpen} onClose={() => setGiftOpen(false)} className="gift-modal"><span className="tiny-label">With our heartfelt thanks</span><h2>Honeymoon fund</h2><p>Your presence is more than enough. For those who have asked, these are placeholder details for the demo.</p><div className="bank-card"><Icon name="gift" size={28} /><div><span>Account holder</span><strong>S &amp; Z Mabunda</strong></div><div><span>Bank</span><strong>Demo Bank SA</strong></div><div><span>Account number</span><strong>000 000 0000</strong></div><div><span>Reference</span><strong>Your name</strong></div></div><small>Please do not make a real payment — demo details only.</small></Modal>

      <Modal open={lightbox} onClose={() => setLightbox(false)} className="lightbox"><button className="gallery-arrow left" onClick={() => changeSlide(-1)} aria-label="Previous image"><Icon name="chevronLeft" size={30} /></button><img src={gallery[galleryIndex].src} alt={gallery[galleryIndex].alt} /><button className="gallery-arrow right" onClick={() => changeSlide(1)} aria-label="Next image"><Icon name="chevronRight" size={30} /></button></Modal>
    </main>
  )
}

export default App
