import { ModeProps } from "../types";

const ModeSelector = ({ selectedMode, onChange }: ModeProps) => {
    const modeOptions = ["総人口", "年少人口", "生産年齢人口", "老年人口"];

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
  