export type ModeProps = {
  selectedMode: number;
  onChange: (mode: number) => void;
};

export type DataType = {
  year: number;
  value: number;
};

export type PopulationData = {
  label: string;
  data: Array<number>;
  years: Array<number>;
};

export type PopulationDataProps = {
  data: Array<PopulationData>;
  mode: string;
};

export type Prefecture = {
  prefCode: number;
  prefName: string;
};

export type PrefectureProps = {
  prefectures: Prefecture[];
};

export type PopulationConditionProps = {
  selectedPrefectures: Array<number>;
  selectedMode: number;
  prefectures: Array<Prefecture>;
};

export type AppContextType = {
  prefectures: Array<Prefecture>;
  selectedPrefectures: number[];
  selectedMode: number;
  setPrefectures: React.Dispatch<React.SetStateAction<Prefecture[]>>;
  setSelectedPrefectures: React.Dispatch<React.SetStateAction<number[]>>;
  setSelectedMode: React.Dispatch<React.SetStateAction<number>>;
};
