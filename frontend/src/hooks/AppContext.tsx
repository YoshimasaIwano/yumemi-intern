/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useState } from 'react';
import { AppContextType, Prefecture } from '../types';

export const AppContext = React.createContext<AppContextType>({
  prefectures: [],
  selectedPrefectures: [],
  selectedMode: 0,
  setPrefectures: () => {},
  setSelectedPrefectures: () => {},
  setSelectedMode: () => {}
});

interface AppProviderProps {
  children: React.ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [prefectures, setPrefectures] = useState<Array<Prefecture>>([]);
  const [selectedPrefectures, setSelectedPrefectures] = useState<number[]>([]);
  const [selectedMode, setSelectedMode] = useState<number>(0);

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
      {children}
    </AppContext.Provider>
  );
};
