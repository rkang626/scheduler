import { useState } from "react";

// Helps manage how we transition from one Appointment mode to another.

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {
    setMode(newMode);
    if (replace) {
      history[history.length - 1] = newMode;
      setHistory(() => history);
    } else {
      setHistory(prev => ([...prev, newMode]));
    }
  };

  function back() {
    if (history.length > 1) {
      setMode(history[history.length - 2]);
      history.pop();
      setHistory(() => history);
    }
  };

  return {
    mode,
    transition,
    back
  };
};