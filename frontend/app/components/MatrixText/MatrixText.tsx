import { useEffect, useMemo, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import styles from "./MatrixText.module.scss";

const SYMBOLS = Array.from(
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789АБВГДЕЖЗИКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ+-*/<>[]{}",
);

interface MatrixTextProps {
  text: string;
  duration?: number;
  delay?: number;
  className?: string;
}

interface GlyphState {
  value: string;
  settled: boolean;
}

function seededValue(index: number) {
  const value = Math.sin((index + 1) * 12.9898) * 43758.5453;
  return value - Math.floor(value);
}

export function MatrixText({
  text,
  duration = 1_150,
  delay = 0,
  className = "",
}: MatrixTextProps) {
  const rootRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(rootRef, { once: true, amount: 0.45 });
  const reduceMotion = useReducedMotion();
  const characters = useMemo(() => Array.from(text), [text]);
  const visibleCharacterIndices = useMemo(
    () => characters.flatMap((character, index) => (/\s/.test(character) ? [] : [index])),
    [characters],
  );
  const revealOrder = useMemo(
    () => new Map(visibleCharacterIndices.map((characterIndex, order) => [characterIndex, order])),
    [visibleCharacterIndices],
  );
  const [glyphs, setGlyphs] = useState<GlyphState[]>(() =>
    characters.map((character) => ({
      value: /\s/.test(character) ? character : "",
      settled: /\s/.test(character),
    })),
  );

  useEffect(() => {
    const finalGlyphs = characters.map((character) => ({ value: character, settled: true }));

    if (reduceMotion) {
      setGlyphs(finalGlyphs);
      return;
    }

    setGlyphs(
      characters.map((character) => ({
        value: /\s/.test(character) ? character : "",
        settled: /\s/.test(character),
      })),
    );

    if (!isInView || visibleCharacterIndices.length === 0) return;

    const startedAt = performance.now() + delay;
    let frame = 0;
    const timer = window.setInterval(() => {
      const elapsed = performance.now() - startedAt;

      if (elapsed < 0) return;

      let isComplete = true;
      const nextGlyphs = characters.map((character, index): GlyphState => {
        if (/\s/.test(character)) return { value: character, settled: true };

        const order = revealOrder.get(index) ?? 0;
        const orderProgress = order / Math.max(visibleCharacterIndices.length - 1, 1);
        const settlesAt = orderProgress * duration * 0.7 + seededValue(index) * duration * 0.2;

        if (elapsed >= settlesAt) return { value: character, settled: true };

        isComplete = false;
        const startsFlickeringAt = Math.max(0, settlesAt - 320);
        if (elapsed < startsFlickeringAt) return { value: "", settled: false };

        const symbolIndex = (frame * 7 + index * 13) % SYMBOLS.length;
        return {
          value: frame % 4 === 0 ? "" : SYMBOLS[symbolIndex],
          settled: false,
        };
      });

      setGlyphs(nextGlyphs);
      frame += 1;

      if (isComplete) {
        window.clearInterval(timer);
        setGlyphs(finalGlyphs);
      }
    }, 48);

    return () => window.clearInterval(timer);
  }, [characters, delay, duration, isInView, reduceMotion, revealOrder, visibleCharacterIndices]);

  let characterIndex = 0;

  return (
    <span
      ref={rootRef}
      className={[styles.matrixText, className].filter(Boolean).join(" ")}
      aria-label={text.replace(/\n/g, " ")}
    >
      <span aria-hidden="true">
        {text.split("\n").map((line, lineIndex, lines) => (
          <span key={`${line}-${lineIndex}`}>
            {line.split(/(\s+)/).map((segment, segmentIndex) => {
              if (/^\s+$/.test(segment)) {
                characterIndex += Array.from(segment).length;
                return (
                  <span className={styles.space} key={`space-${lineIndex}-${segmentIndex}`}>
                    {segment}
                  </span>
                );
              }

              const wordStart = characterIndex;
              characterIndex += Array.from(segment).length;

              return (
                <span className={styles.word} key={`word-${lineIndex}-${segmentIndex}`}>
                  {Array.from(segment).map((character, wordIndex) => {
                    const index = wordStart + wordIndex;
                    const glyph = glyphs[index] ?? { value: "", settled: false };

                    return (
                      <span className={styles.character} key={`${index}-${character}`}>
                        <span className={styles.ghost}>{character}</span>
                        <span
                          className={[
                            styles.value,
                            glyph.settled ? styles.settled : styles.flickering,
                          ].join(" ")}
                        >
                          {glyph.value}
                        </span>
                      </span>
                    );
                  })}
                </span>
              );
            })}
            {lineIndex < lines.length - 1 ? (() => {
              characterIndex += 1;
              return <br />;
            })() : null}
          </span>
        ))}
      </span>
    </span>
  );
}
