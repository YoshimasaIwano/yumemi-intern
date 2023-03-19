import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { PopulationDataProps } from "../types";

const PopulationGraph = ({ data, mode }: PopulationDataProps) => {
    const options = {
        chart: {
            type: "line",
        },
        title: {
            text: mode,
        },
        xAxis: {
            categories: data.map((d) => d.years)[0],
            title: {
                text: "年度",
            },
        },
        yAxis: {
            title: {
                text: "人口",
            },
        },
        series: data.map((d) => ({
            name: d.label,
            data: d.data,
        })
    ),
  };

  return (
    <div className="graph">
        <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default PopulationGraph;
