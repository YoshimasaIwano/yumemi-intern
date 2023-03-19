import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { AppContext } from '../hooks/AppContext';
import { useContext } from 'react';
import fetchPopulationData from '../utils/fetchPopulationData';
import { modeOptions } from '../types';

const PopulationGraph = () => {
  const { selectedMode } = useContext(AppContext);

  const populationData = fetchPopulationData();
  const options = {
    chart: {
      type: 'line'
    },
    title: {
      text: modeOptions[selectedMode]
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
      name: d.prefName,
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
