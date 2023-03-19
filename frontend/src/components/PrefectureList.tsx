import { PrefectureProps } from '../types';
import { AppContext } from '../hooks/AppContext';
import { useContext } from 'react';

const PrefectureList = ({ prefectures }: PrefectureProps) => {
  const { selectedPrefectures, setSelectedPrefectures } =
    useContext(AppContext);

  const handlePrefectureChange = (prefCode: number, checked: boolean) => {
    if (checked) {
      setSelectedPrefectures([...selectedPrefectures, prefCode]);
    } else {
      setSelectedPrefectures(
        selectedPrefectures.filter((code) => code !== prefCode)
      );
    }
  };

  return (
    <div className="list-container">
      {prefectures.map((prefecture) => (
        <div
          key={prefecture.prefCode}
          className="prefecture-list prefecture-list-sm font-sm"
        >
          <label>
            <input
              type="checkbox"
              checked={selectedPrefectures.includes(prefecture.prefCode)}
              onChange={(e) =>
                handlePrefectureChange(prefecture.prefCode, e.target.checked)
              }
            />
            {prefecture.prefName}
          </label>
        </div>
      ))}
    </div>
  );
};

export default PrefectureList;
