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

const Main = () => {
    const [prefectures, setPrefectures] = useState<Array<Prefecture>>([]);
    const [selectedPrefectures, setSelectedPrefectures] = useState<Array<number>>([]);
    const [populationData, setPopulationData] = useState<Array<PopulationDataProps>>([]);

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
                        data: data.result.data[0].data.map((item: any) => item.value),
                        years: data.result.data[0].data.map((item: any) => item.year),
                    };
                })
            )
        )
        .then((data) => setPopulationData(data))
        .catch((err) => console.log(err));
    }, [selectedPrefectures]);


    const yearsArray: number[] = Array.from(Array(18), (_, i) => 1980 + i * 5);

    // console.log(populationData.map(data => data.years));
    // console.log(populationData);
    const options = {
        chart: {
            type: "line",
        },
        title: {
            text: "Population Composition",
        },
        xAxis: {
            categories: yearsArray,
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
        <div>
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
            
            <h2>Population Composition</h2>
            {populationData.length === 0 ? (
                <p>Please select a prefecture to show its population composition</p>
            ) : (
                <HighchartsReact highcharts={Highcharts} options={options} />
            )}
        </div>
    );
};

export default Main;
