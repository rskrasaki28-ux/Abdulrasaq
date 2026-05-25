import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface Segment {
  text: string;
  className?: string;
}

interface WordsPullUpMultiStyleProps {
  segments: Segment[];
  className?: string;
  delay?: number;
}

export default function WordsPullUpMultiStyle({ segments, className = '', delay = 0 }: WordsPullUpMultiStyleProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const allWords: { word: string; className: string; globalIndex: number }[] = [];
  segments.forEach((seg) => {
    const words = seg.text.split(' ').filter(Boolean);
    words.forEach((word) => {
      allWords.push({ word, className: seg.className || '', globalIndex: allWords.length });
    });
  });

  return (
    <span ref={ref} className={`inline-flex flex-wrap justify-center ${className}`}>
      {allWords.map(({ word, className: wordClass }, i) => (
        <span key={i} className="overflow-hidden inline-flex">
          <motion.span
            className={`inline-flex ${wordClass}`}
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
            transition={{
              duration: 0.6,
              delay: delay + i * 0.08,
              ease: [0.16, 1, 0.3, 1] as const,
            }}
          >
            {word}
          </motion.span>
          {i < allWords.length - 1 && <span>&nbsp;</span>}
        </span>
      ))}
    </span>
  );
}
