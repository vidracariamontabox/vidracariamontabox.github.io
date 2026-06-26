"use client";

import {useState, useRef, useEffect} from "react";
import {motion, AnimatePresence} from "framer-motion";

function Stars() {
  return (
    <div className="flex gap-0.5">
      {Array.from({length: 5}).map((_, i) => (
        <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill="#eaeaea">
          <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279L12 19.771l-7.416 3.642 1.48-8.279L0 9.306l8.332-1.151z" />
        </svg>
      ))}
    </div>
  );
}

function Waveform({playing}) {
  return (
    <div className="flex items-center gap-[2px] h-[18px]">
      {Array.from({length: 16}).map((_, i) => (
        <motion.span
          key={i}
          className="w-[2px] rounded-full bg-[#acaba9]"
          style={{height: 4}}
          animate={playing ? {height: [4, 14, 6, 16, 4]} : {height: 4}}
          transition={
            playing
              ? {duration: 0.9 + (i % 4) * 0.15, repeat: Infinity, ease: "easeInOut", delay: i * 0.04}
              : {duration: 0.2}
          }
        />
      ))}
    </div>
  );
}

export default function TestimonialsCarousel({testimonials}) {
  const [index, setIndex] = useState(0);
  const [playingId, setPlayingId] = useState(null);
  const audioRef = useRef(null);
  const timerRef = useRef(null);

  const current = testimonials[index];

  const next = () => setIndex((i) => (i + 1) % testimonials.length);
  const prev = () => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);

  const resetAutoplay = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(next, 6500);
  };

  useEffect(() => {
    resetAutoplay();
    return () => clearInterval(timerRef.current);
  }, []);

  useEffect(() => {
    // muda de slide = para qualquer áudio em reprodução
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    setPlayingId(null);
  }, [index]);

  const toggleAudio = (id) => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    if (playingId === id) {
      setPlayingId(null);
      return;
    }
    // Arquivo de áudio real ainda não existe — grave e salve em /public/audio/testimonial-{id}.mp3
    const audio = new Audio(`/audio/testimonial-${id}.mp3`);
    audio.addEventListener("ended", () => setPlayingId(null));
    audio.play().catch(() => {});
    audioRef.current = audio;
    setPlayingId(id);
  };

  return (
    <section
      id="depoimentos"
      className="relative h-[50vh] w-full bg-[#121212] flex flex-col items-center justify-center px-10 sm:px-14"
      onMouseEnter={() => clearInterval(timerRef.current)}
      onMouseLeave={resetAutoplay}>
      <button
        onClick={() => {
          prev();
          resetAutoplay();
        }}
        aria-label="Depoimento anterior"
        className="absolute left-1 sm:left-4 z-10 text-[#acaba9] hover:text-[#eaeaea] transition-colors p-2">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>
      <button
        onClick={() => {
          next();
          resetAutoplay();
        }}
        aria-label="Próximo depoimento"
        className="absolute right-1 sm:right-4 z-10 text-[#acaba9] hover:text-[#eaeaea] transition-colors p-2">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>

      <div className="relative w-full max-w-[640px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{opacity: 0, x: 24}}
            animate={{opacity: 1, x: 0}}
            exit={{opacity: 0, x: -24}}
            transition={{duration: 0.45, ease: "easeOut"}}
            className="w-full bg-[#2c2c2c] border border-[#75706f]/20 rounded-sm px-7 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#75706f] flex items-center justify-center text-[#eaeaea] text-sm font-archivo">
                  {current.name.charAt(0)}
                </div>
                <div>
                  <p className="text-[#eaeaea] text-sm leading-tight">{current.name}</p>
                  <p className="text-[#75706f] text-xs mt-0.5">{current.role}</p>
                </div>
              </div>
              <Stars />
            </div>

            <p className="mt-4 text-[#eaeaea]/90 text-[0.92rem] leading-relaxed line-clamp-3">"{current.text}"</p>

            <div className="mt-4 flex items-center gap-3 bg-[#eaeaea]/[0.04] rounded-sm px-3 py-2 w-fit">
              <button
                onClick={() => toggleAudio(current.id)}
                aria-label="Reproduzir depoimento em áudio"
                className="text-[#eaeaea] flex">
                {playingId === current.id ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 8h2v8H9zm4 0h2v8h-2z" />
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 6.82v10.36a1 1 0 0 0 1.5.87l9-5.18a1 1 0 0 0 0-1.74l-9-5.18A1 1 0 0 0 8 6.82z" />
                  </svg>
                )}
              </button>
              <Waveform playing={playingId === current.id} />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex gap-1.5 mt-5">
        {testimonials.map((t, i) => (
          <button
            key={t.id}
            onClick={() => {
              setIndex(i);
              resetAutoplay();
            }}
            aria-label={`Ir para depoimento ${i + 1}`}
            className={`w-1.5 h-1.5 rounded-full transition-colors ${i === index ? "bg-[#eaeaea]" : "bg-[#75706f]/50"}`}
          />
        ))}
      </div>
    </section>
  );
}
