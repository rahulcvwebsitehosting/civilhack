import React, { useState, useEffect } from "react";

interface DecipherTextProps {
  text: string;
  className?: string;
}

const CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ0123456789!#%&*?";

export const DecipherText: React.FC<DecipherTextProps> = ({ text, className = "" }) => {
  const [displayText, setDisplayText] = useState(text);

  useEffect(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((char, index) => {
            if (index < iteration) {
              return text[index];
            }
            if (char === " ") return " ";
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );

      if (iteration >= text.length) {
        clearInterval(interval);
      }
      iteration += 1 / 2;
    }, 30);

    return () => clearInterval(interval);
  }, [text]);

  return <span className={className}>{displayText}</span>;
};
