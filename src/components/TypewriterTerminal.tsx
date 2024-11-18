import React, { useState, useEffect } from "react";

interface TypewriterProps {
  lines: string[];
  interval: number;
}

const Typewriter: React.FC<TypewriterProps> = ({ lines, interval }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [currentText, setCurrentText] = useState<string>("");
  const [renderedLines, setRenderedLines] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState<boolean>(true);

  useEffect(() => {
    const typeNextCharacter = () => {
      const line = lines[currentIndex];
      const nextCharIndex = currentText.length;
      const text = line.substring(0, nextCharIndex + 1);
      setCurrentText(text);
      if (text === line) {
        setIsTyping(false);
      }
    };

    if (isTyping) {
      const typingInterval = setInterval(typeNextCharacter, interval);
      return () => clearInterval(typingInterval);
    }
  }, [currentIndex, currentText, isTyping, lines, interval]);

  useEffect(() => {
    if (!isTyping) {
      const timeout = setTimeout(() => {
        setRenderedLines((prevLines) => [...prevLines, currentText]);
        setCurrentText("");
        setIsTyping(true);
        setCurrentIndex((prevIndex) => (prevIndex + 1) % lines.length);
      }, 1000); // 1秒後重新開始
      return () => clearTimeout(timeout);
    }
  }, [isTyping, lines.length, currentText]);

  return (
    <div className="overflow-hidden flex flex-col justify-end">
      <div className="text-[#B3B3B3] font-mono text-[0.4vw] flex flex-col h-[55px] justify-end overflow-hidden">
        {renderedLines.map((line, index) => (
          <div key={index}>{line}</div>
        ))}
      </div>
      <div className="text-[#B3B3B3] font-mono text-[0.4vw]">{currentText}</div>
    </div>
  );
};

export default Typewriter;
