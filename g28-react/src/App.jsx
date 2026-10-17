import { motion, useScroll, useSpring } from 'framer-motion'
import Header from './components/Header'
import Hero from './components/Hero'
import Clients from './components/Clients'
import Process from './components/Process'
import Values from './components/Values'
import Services from './components/Services'
import Work from './components/Work'
import Testimonials from './components/Testimonials'
import Pricing from './components/Pricing'
import Faq from './components/Faq'
import Insights from './components/Insights'
import Contact from './components/Contact'
import Closing from './components/Closing'
import WhatsAppFab from './components/WhatsAppFab'

export default function App() {
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })

  return (
    <div className="relative min-h-screen bg-cream">
      {/* scroll progress */}
      <motion.div
        style={{ scaleX: progress }}
        className="fixed inset-x-0 top-0 z-[70] h-[3px] origin-left bg-gradient-to-r from-gold-dark via-gold to-gold-light"
      />

      <Header />

      <main>
        <Hero />
        <Clients />
        <Process />
        <Values />
        <Services />
        <Work />
        <Testimonials />
        <Pricing />
        <Faq />
        <Insights />
        <Contact />
        <Closing />
      </main>

      <WhatsAppFab />
    </div>
  )
}
