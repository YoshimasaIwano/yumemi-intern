import { modeOptions, ModeProps } from '../types';

const ModeSelector = ({ selectedMode, onChange }: ModeProps) => {
  return (
    <select
      className="mv-1 select-toggle"
      value={selectedMode}
      onChange={(e) => onChange(parseInt(e.target.value))}
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
