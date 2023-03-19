import { useContext } from 'react';
import { AppContext } from '../hooks/AppContext';
import { modeOptions } from '../types';

const ModeSelector = () => {
  const { selectedMode, setSelectedMode } = useContext(AppContext);
  return (
    <select
      className="mv-1 select-toggle"
      value={selectedMode}
      onChange={(e) => setSelectedMode(parseInt(e.target.value))}
    >
      {modeOptions.map((option, i) => (
        <option key={i} value={i}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default ModeSelector;
