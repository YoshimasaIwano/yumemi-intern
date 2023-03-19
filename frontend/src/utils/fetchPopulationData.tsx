import { useState, useEffect, useContext } from 'react';
import { AppContext } from '../hooks/AppContext';
import { DataType, PopulationData } from '../types';

const fetchPopulationData = () => {
  const { selectedPrefectures } = useContext(AppContext);
  const { selectedMode } = useContext(AppContext);
  const { prefectures } = useContext(AppContext);
  const [populationData, setPopulationData] = useState<Array<PopulationData>>(
    []
  );

  useEffect(() => {
    if (selectedPrefectures.length === 0) {
      return;
    }

    Promise.all(
      selectedPrefectures.map((prefCode) =>
        fetch(
          `https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?prefCode=${prefCode}`,
          {
            headers: { 'X-API-KEY': String(process.env.REACT_APP_API_KEY) }
          }
        )
          .then((res) => res.json())
          .then((data) => {
            const prefecture = prefectures.find((p) => p.prefCode === prefCode);
            return {
              prefName: prefecture ? prefecture.prefName : '',
              data: data.result.data[selectedMode].data.map(
                (item: DataType) => item.value
              ),
              years: data.result.data[selectedMode].data.map(
                (item: DataType) => item.year
              )
            };
          })
      )
    )
      .then((data) => setPopulationData(data))
      .catch((err) => console.log(err));
  }, [selectedPrefectures, selectedMode]);

  return populationData;
};

export default fetchPopulationData;
