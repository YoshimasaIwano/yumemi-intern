import { useContext, useEffect, useState } from 'react';

import PrefectureList from './PrefectureList';
import PopulationGraph from './PopulationGraph';
import ModeSelector from './ModeSelector';
import fetchPrefectures from '../utils/fetchPrefectures';
import { AppContext } from '../hooks/AppContext';

const Main = () => {
  const [, setPrefecturesLoaded] = useState(false);
  const {
    prefectures,
    setPrefectures,
    selectedPrefectures,
    setSelectedPrefectures,
    selectedMode,
    setSelectedMode
  } = useContext(AppContext);

  useEffect(() => {
    fetchPrefectures()
      .then((data) => {
        setPrefectures(data);
        setPrefecturesLoaded(true);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <AppContext.Provider
      value={{
        prefectures,
        setPrefectures,
        selectedPrefectures,
        setSelectedPrefectures,
        selectedMode,
        setSelectedMode
      }}
    >
      <div className="main-container">
        <h1>都道府県 リスト</h1>
        <PrefectureList />

        <ModeSelector />

        <PopulationGraph />
      </div>
    </AppContext.Provider>
  );
};

export default Main;
