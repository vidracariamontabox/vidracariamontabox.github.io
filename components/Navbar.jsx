'use client';

import { motion } from 'framer-motion';

export default function Navbar() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-0 left-0 w-full z-50 flex items-center justify-end gap-10 px-12 py-6 bg-transparent sm:gap-10"
    >
      <a
        href="#depoimentos"
        className="hidden sm:inline text-[0.74rem] tracking-[0.12em] uppercase text-[#acaba9] hover:text-[#eaeaea] transition-colors"
      >
        Depoimentos
      </a>
      <a
        href="#faq"
        className="hidden sm:inline text-[0.74rem] tracking-[0.12em] uppercase text-[#acaba9] hover:text-[#eaeaea] transition-colors"
      >
        FAQ
      </a>
      <a
        href="#contato"
        className="hidden sm:inline text-[0.74rem] tracking-[0.12em] uppercase text-[#acaba9] hover:text-[#eaeaea] transition-colors"
      >
        Contato
      </a>
      <a
        href="#contato"
        className="text-[0.74rem] tracking-[0.1em] uppercase border border-[#acaba9] text-[#eaeaea] px-5 py-2 rounded-sm hover:bg-[#eaeaea] hover:text-[#121212] hover:border-[#eaeaea] transition-colors"
      >
        Solicitar Orçamento
      </a>
    </motion.nav>
  );
}
