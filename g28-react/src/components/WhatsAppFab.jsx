import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import { contact } from '../data/content'

export default function WhatsAppFab() {
  return (
    <motion.a
      href={contact.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.4, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.95 }}
      className="group fixed bottom-6 right-6 z-40 grid h-14 w-14 place-items-center rounded-full bg-ink text-cream shadow-[0_20px_44px_-18px_rgba(8,37,28,.9)]"
    >
      <span className="absolute inset-0 rounded-full border border-gold/40" />
      <span className="absolute inset-0 animate-ping rounded-full bg-gold/20 [animation-duration:2.6s]" />
      <MessageCircle className="relative h-5 w-5 text-gold" />
    </motion.a>
  )
}
