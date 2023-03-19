import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { AppContext } from '../hooks/AppContext';
import { useContext } from 'react';
import fetchPopulationData from '../utils/fetchPopulationData';

const PopulationGraph = () => {
  const { selectedPrefectures } = useContext(AppContext);
  const { selectedMode } = useContext(AppContext);
  const { prefectures } = useContext(AppContext);

  const populationData = fetchPopulationData({
    selectedPrefectures,
    selectedMode,
    prefectures
  });
  const mode: Array<string> = [
    '総人口',
    '年少人口',
    '生産年齢人口',
    '老年人口'
  ];
  const options = {
    chart: {
      type: 'line'
    },
    title: {
      text: mode[selectedMode]
    },
    xAxis: {
      categories: populationData.map((d) => d.years)[0],
      title: {
        text: '年度'
      }
    },
    yAxis: {
      title: {
        text: '人口'
      }
    },
    series: populationData.map((d) => ({
      name: d.label,
      data: d.data
    }))
  };

  return (
    <div className="graph">
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default PopulationGraph;
