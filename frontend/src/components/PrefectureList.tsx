import { PrefectureProps } from '../types';

const PrefectureList = ({
  prefectures,
  selectedPrefectures,
  onPrefectureChange
}: PrefectureProps) => {
  return (
    <div className="list-container">
      {prefectures.map((prefecture) => (
        <div key={prefecture.prefCode} className="prefecture-list">
          <label>
            <input
              type="checkbox"
              checked={selectedPrefectures.includes(prefecture.prefCode)}
              onChange={(e) =>
                onPrefectureChange(prefecture.prefCode, e.target.checked)
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
