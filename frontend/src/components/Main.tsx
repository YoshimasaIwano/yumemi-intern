import { useEffect, useState } from "react";

import PrefectureList from "./PrefectureList";
import PopulationGraph from "./PopulationGraph";
import ModeSelector from "./ModeSelector";
import usePopulationData from "../hooks/usePopulationData";
import fetchPrefectures from "../utils/fetchPrefectures";
import { Prefecture } from "../types";

const Main = () => {
    const [prefectures, setPrefectures] = useState<Array<Prefecture>>([]);
    const [selectedPrefectures, setSelectedPrefectures] = useState<Array<number>>([]);
    const [selectedMode, setSelectedMode] = useState(0);
    const populationData = usePopulationData({selectedPrefectures, selectedMode, prefectures});

    useEffect(() => {
        fetchPrefectures()
        .then((data) => setPrefectures(data))
        .catch((err) => console.log(err));;
    }, []);

    const handlePrefectureChange = (prefCode: number, checked: boolean) => {
        if (checked) {
            setSelectedPrefectures([...selectedPrefectures, prefCode]);
        } else {
            setSelectedPrefectures(selectedPrefectures.filter((code) => code !== prefCode));
        }
    };

    const mode: Array<string> = ["総人口", "年少人口", "生産年齢人口", "老年人口"]
    return (
        <div className="main-container">
        <h1>都道府県 リスト</h1>
        <PrefectureList
            prefectures={prefectures}
            selectedPrefectures={selectedPrefectures}
            onPrefectureChange={handlePrefectureChange}
        />

        <ModeSelector selectedMode={selectedMode} onChange={setSelectedMode} />

        {populationData.length === 0 ? (
            <p>Please select a prefecture to show its population composition</p>
        ) : (
            <PopulationGraph data={populationData} mode={mode[selectedMode]} />
        )}
        </div>
    );
};

export default Main;
