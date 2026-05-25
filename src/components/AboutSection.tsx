import { useRef } from 'react';
import WordsPullUpMultiStyle from './WordsPullUpMultiStyle';
import AnimatedLetter from './AnimatedLetter';

const BODY_TEXT =
  'Over the last seven years, I have worked with Parallax, a Berlin-based production house that crafts cinema, series, and Noir Studio in Paris. Together, we have created work that has earned international acclaim at several major festivals.';

export default function AboutSection() {
  const containerRef = useRef<HTMLElement>(null);
  const chars = BODY_TEXT.split('');
  const total = chars.length;

  // Group characters into words so line-breaks never split mid-word
  type CharChunk = { chars: { char: string; index: number }[]; isSpace: boolean };
  const chunks: CharChunk[] = [];
  let current: CharChunk | null = null;

  chars.forEach((char, index) => {
    if (char === ' ') {
      if (current) chunks.push(current);
      chunks.push({ chars: [{ char, index }], isSpace: true });
      current = null;
    } else {
      if (!current) current = { chars: [], isSpace: false };
      current.chars.push({ char, index });
    }
  });
  if (current) chunks.push(current);

  return (
    <section ref={containerRef} className="bg-black py-16 sm:py-20 md:py-28 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto bg-[#101010] rounded-2xl md:rounded-3xl p-8 sm:p-12 md:p-16 text-center">
        {/* Label */}
        <p className="text-primary text-[10px] sm:text-xs uppercase tracking-widest mb-6 sm:mb-8">
          Visual arts
        </p>

        {/* Main heading */}
        <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl max-w-3xl mx-auto leading-[0.95] sm:leading-[0.9] mb-10 sm:mb-14">
          <WordsPullUpMultiStyle
            segments={[
              { text: 'I am Marcus Chen,', className: 'font-normal' },
              { text: 'a self-taught director.', className: 'font-serif italic' },
              {
                text: 'I have skills in color grading, visual effects, and narrative design.',
                className: 'font-normal',
              },
            ]}
            className="text-primary"
          />
        </div>

        {/* Scroll-animated body text */}
        <p
          className="text-xs sm:text-sm md:text-base max-w-2xl mx-auto"
          style={{ color: '#DEDBC8', lineHeight: 1.7 }}
        >
          {chunks.map((chunk, ci) =>
            chunk.isSpace ? (
              <span key={ci}>&nbsp;</span>
            ) : (
              <span key={ci} className="inline-block whitespace-nowrap">
                {chunk.chars.map(({ char, index }) => (
                  <AnimatedLetter
                    key={index}
                    char={char}
                    index={index}
                    total={total}
                    containerRef={containerRef as React.RefObject<HTMLElement>}
                  />
                ))}
              </span>
            )
          )}
        </p>
      </div>
    </section>
  );
}
