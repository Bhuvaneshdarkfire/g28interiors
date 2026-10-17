/* Infinite marquee — duplicated track + CSS animation (GPU friendly). */
export default function Marquee({
  children,
  speed = 40,
  reverse = false,
  pauseOnHover = false,
  mask = true,
  className = ''
}) {
  return (
    <div className={`${mask ? 'marquee-mask' : ''} overflow-hidden ${className}`}>
      <div
        className={`flex w-max ${
          reverse ? 'animate-marquee-rev' : 'animate-marquee'
        } ${pauseOnHover ? 'hover:[animation-play-state:paused]' : ''}`}
        style={{ '--speed': `${speed}s` }}
      >
        <div className="flex shrink-0">{children}</div>
        <div className="flex shrink-0" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  )
}
