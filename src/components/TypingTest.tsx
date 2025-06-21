import React from 'react';
import { TEXT_OPTIONS } from '../config/textOptions';

interface AppState {
  inputText: string;
  startTime: number | null;
  isTyping: boolean;
  errors: number;
  wpm: number;
  selectedTextIndex: number;
}

interface Session {
  date: string;
  time: string;
  inputText: string;
  wpm: number;
  timestamp: number;
  targetText: string;
}

interface TypingTestProps {
  targetText: string;
}

const TypingTest: React.FC<TypingTestProps> = ({ targetText }) => {
  const [state, setState] = React.useState<AppState>({
    inputText: '',
    startTime: null,
    isTyping: false,
    errors: 0,
    wpm: 0,
    selectedTextIndex: 0,
  });

  const textOptions = TEXT_OPTIONS;

  const handleTextSelect = (index: number) => {
    setState(prev => ({
      ...prev,
      selectedTextIndex: index,
      inputText: '',
      startTime: null,
      isTyping: false,
      errors: 0,
      wpm: 0,
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    
    // Start timer on first character
    const newStartTime = state.isTyping ? state.startTime : Date.now();
    
    const errors = calculateErrors(input, textOptions[state.selectedTextIndex]);
    
    setState(prev => ({
      ...prev,
      inputText: input,
      startTime: newStartTime,
      isTyping: input.length > 0,
      errors,
      wpm: 0,
    }));
  };

  React.useEffect(() => {
    let timer: NodeJS.Timeout | undefined;

    if (state.isTyping) {
      // Reset timer on each keystroke
      if (timer) clearTimeout(timer);
      
      // Set new timer to save session after 10 seconds of inactivity
      timer = setTimeout(() => {
        if (state.inputText.length > 0 && state.wpm > 0) {
          saveSession(state.inputText, state.wpm);
          resetTest();
        }
      }, 10000);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [state.isTyping, state.inputText, state.wpm]);

  React.useEffect(() => {
    if (state.isTyping && state.inputText.length > 0) {
      const wpm = calculateWPM(state.inputText, state.startTime!);
      setState(prev => ({ ...prev, wpm }));
    }
  }, [state.inputText, state.startTime]);

  const saveSession = (inputText: string, wpm: number) => {
    const date = new Date();
    const sessionData: Session = {
      date: date.toISOString().split('T')[0],
      time: `${date.getHours()}:${date.getMinutes()}`,
      inputText,
      wpm,
      timestamp: date.getTime(),
      targetText: textOptions[state.selectedTextIndex]
    };

    // Get existing sessions from localStorage or initialize empty array
    const sessions = JSON.parse(localStorage.getItem('typingSessions') || '[]');
    
    // Add new session to the beginning of the array
    localStorage.setItem('typingSessions', JSON.stringify([sessionData, ...sessions]));
  };

  const resetTest = () => {
    setState(prev => ({
      ...prev,
      inputText: '',
      startTime: null,
      isTyping: false,
      errors: 0,
      wpm: 0,
    }));
  };

  const calculateErrors = (input: string, target: string): number => {
    let errors = 0;
    const inputLength = input.length;
    const targetLength = target.length;

    // Count errors for each character in the input
    for (let i = 0; i < inputLength; i++) {
      if (input[i] !== target[i]) {
        errors++;
      }
    }

    // Count remaining characters in target as errors
    errors += targetLength - inputLength;

    return errors;
  };

  const calculateWPM = (input: string, startTime: number): number => {
    const endTime = Date.now();
    const timeTaken = (endTime - startTime) / 1000; // Convert to seconds
    const words = input.trim().split(/\s+/).length;
    const minutes = timeTaken / 60;
    const wpm = Math.round(words / minutes);
    return Math.min(wpm, 200); // Cap at 200 WPM
  };

  return (
    <div className="typing-test">
      <h1>Typing Speed Test</h1>
      <div className="text-options">
        {textOptions.map((text, index) => (
          <p 
            key={index} 
            className={index === state.selectedTextIndex ? 'selected' : ''}
            onClick={() => handleTextSelect(index)}
          >
            {text}
          </p>
        ))}
      </div>
      <div className="typing-area">
        <input
          type="text"
          value={state.inputText}
          onChange={handleInputChange}
          placeholder={textOptions[state.selectedTextIndex]}
          autoComplete="off"
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck="false"
          className="no-autocomplete"
        />
        <div className="stats">
          <p>Errors: {state.errors}</p>
          <p>WPM: {state.wpm}</p>
        </div>
      </div>
    </div>
  );
};

export default TypingTest;
