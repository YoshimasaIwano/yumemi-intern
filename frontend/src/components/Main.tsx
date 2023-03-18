import { useState, useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

type Prefecture = {
  prefCode: number;
  prefName: string;
};

type PopulationDataProps = {
  label: string;
  data: Array<number>;
  years: Array<number>;
};

type DataType = {
    year: number;
    value: number;
}

const mode: Array<string> = ["総人口", "年少人口", "生産年齢人口", "老年人口"]

const Main = () => {
    const [prefectures, setPrefectures] = useState<Array<Prefecture>>([]);
    const [selectedPrefectures, setSelectedPrefectures] = useState<Array<number>>([]);
    const [populationData, setPopulationData] = useState<Array<PopulationDataProps>>([]);
    const [selectedMode, setSelectedMode] = useState(0);

    useEffect(() => {fetch("https://opendata.resas-portal.go.jp/api/v1/prefectures", {
        headers: { "X-API-KEY": "M9hXOfFDjGH8ujFFFk0kcMv5Ib9yiGCOb2p5gi4L" },
        })
        .then((res) => res.json())
        .then((data) => {
        setPrefectures(data.result);
        })
        .catch((err) => console.log(err));
    }, []);

    const handlePrefectureChange = (prefCode: number, checked: boolean) => {
        if (checked) {
            setSelectedPrefectures([...selectedPrefectures, prefCode]);
        } else {
            setSelectedPrefectures(selectedPrefectures.filter((code) => code !== prefCode));
        }
    };

    useEffect(() => {
        if (selectedPrefectures.length === 0) {
            setPopulationData([]);
            return;
        }

        Promise.all(
            selectedPrefectures.map((prefCode) =>
                fetch(
                `https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?prefCode=${prefCode}`,
                {
                    headers: { "X-API-KEY": "M9hXOfFDjGH8ujFFFk0kcMv5Ib9yiGCOb2p5gi4L" },
                }
                )
                .then((res) => res.json())
                .then((data) => {
                    const prefecture = prefectures.find((p) => p.prefCode === prefCode);
                    return {
                        label: prefecture ? prefecture.prefName : "",
                        data: data.result.data[selectedMode].data.map((item: DataType) => item.value),
                        years: data.result.data[selectedMode].data.map((item: DataType) => item.year),
                    };
                })
            )
        )
        .then((data) => setPopulationData(data))
        .catch((err) => console.log(err));
    }, [selectedPrefectures, selectedMode]);

    const options = {
        chart: {
            type: "line",
        },
        title: {
            text:  mode[selectedMode],
        },
        xAxis: {
            categories: populationData.map(data => data.years)[0],
            title: {
                text: "Year",
            },
        },
        yAxis: {
            title: {
                text: "Population",
            },
        },
        series: populationData.map((data) => ({
            name: data.label,
            data: data.data,
        })),
    };

    return (
        <div className="main-container">
            <h1>Prefecture List</h1>
            <div className="list-container">
                {prefectures.map((prefecture) => (
                    <div key={prefecture.prefCode}>
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

            <select
                value={selectedMode}
                onChange={(e) => setSelectedMode(parseInt(e.target.value))}
            >
                <option value={0}>総人口</option>
                <option value={1}>年少人口</option>
                <option value={2}>生産年齢人口</option>
                <option value={3}>老年人口</option>
            </select>
            
            {/* <h2>Population Composition</h2> */}
            {populationData.length === 0 ? (
                <p>Please select a prefecture to show its population composition</p>
            ) : (
                <HighchartsReact highcharts={Highcharts} options={options} />
            )}
        </div>
    );
};

export default Main;
