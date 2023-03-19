/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-useless-escape */
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AppContext } from '../hooks/AppContext';
import fetchPrefectures from '../utils/fetchPrefectures';
import PrefectureList from '../components/PrefectureList';
import ModeSelector from '../components/ModeSelector';
import Main from '../components/Main';
import PopulationGraph from '../components/PopulationGraph';
import Footer from '../components/Footer';
import { modeOptions } from '../types';

// 1. testing main page
test('renders Main page', async () => {
  const { getByText } = render(<Main />);
  // Wait for the data to be loaded
  await waitFor(() => {});

  expect(getByText('都道府県 リスト')).toBeInTheDocument();
});

// 2. testing fetching a prefecture list
const prefectures = [
  { prefCode: 1, prefName: '北海道' },
  { prefCode: 2, prefName: '青森県' },
  { prefCode: 3, prefName: '岩手県' },
  { prefCode: 4, prefName: '宮城県' },
  { prefCode: 5, prefName: '秋田県' },
  { prefCode: 6, prefName: '山形県' },
  { prefCode: 7, prefName: '福島県' },
  { prefCode: 8, prefName: '茨城県' },
  { prefCode: 9, prefName: '栃木県' },
  { prefCode: 10, prefName: '群馬県' },
  { prefCode: 11, prefName: '埼玉県' },
  { prefCode: 12, prefName: '千葉県' },
  { prefCode: 13, prefName: '東京都' },
  { prefCode: 14, prefName: '神奈川県' },
  { prefCode: 15, prefName: '新潟県' },
  { prefCode: 16, prefName: '富山県' },
  { prefCode: 17, prefName: '石川県' },
  { prefCode: 18, prefName: '福井県' },
  { prefCode: 19, prefName: '山梨県' },
  { prefCode: 20, prefName: '長野県' },
  { prefCode: 21, prefName: '岐阜県' },
  { prefCode: 22, prefName: '静岡県' },
  { prefCode: 23, prefName: '愛知県' },
  { prefCode: 24, prefName: '三重県' },
  { prefCode: 25, prefName: '滋賀県' },
  { prefCode: 26, prefName: '京都府' },
  { prefCode: 27, prefName: '大阪府' },
  { prefCode: 28, prefName: '兵庫県' },
  { prefCode: 29, prefName: '奈良県' },
  { prefCode: 30, prefName: '和歌山県' },
  { prefCode: 31, prefName: '鳥取県' },
  { prefCode: 32, prefName: '島根県' },
  { prefCode: 33, prefName: '岡山県' },
  { prefCode: 34, prefName: '広島県' },
  { prefCode: 35, prefName: '山口県' },
  { prefCode: 36, prefName: '徳島県' },
  { prefCode: 37, prefName: '香川県' },
  { prefCode: 38, prefName: '愛媛県' },
  { prefCode: 39, prefName: '高知県' },
  { prefCode: 40, prefName: '福岡県' },
  { prefCode: 41, prefName: '佐賀県' },
  { prefCode: 42, prefName: '長崎県' },
  { prefCode: 43, prefName: '熊本県' },
  { prefCode: 44, prefName: '大分県' },
  { prefCode: 45, prefName: '宮崎県' },
  { prefCode: 46, prefName: '鹿児島県' },
  { prefCode: 47, prefName: '沖縄県' }
];

test('fetching a prefecture list', async () => {
  try {
    const result = await fetchPrefectures();

    expect(result).toEqual(prefectures);
  } catch (error) {
    // handle any errors that occur
    console.error(error);
  }
});

// 3. rendering PrefectureList
describe('PrefectureList', () => {
  it('renders the correct number of checkboxes', () => {
    const selectedMode = 1;
    const setSelectedMode = jest.fn();
    const setPrefectures = jest.fn();
    const setSelectedPrefectures = jest.fn();
    const selectedPrefectures = [1];

    render(
      <AppContext.Provider
        value={{
          prefectures: prefectures,
          setPrefectures,
          selectedPrefectures,
          setSelectedPrefectures,
          selectedMode,
          setSelectedMode
        }}
      >
        <PrefectureList />
      </AppContext.Provider>
    );

    const checkboxes = screen.getAllByRole('checkbox');

    expect(checkboxes.length).toBe(prefectures.length);
  });
});

// 4. testing selecting ModeSelector

describe('ModeSelector', () => {
  it('renders a select element with the correct options', () => {
    const selectedMode = 1;
    const setSelectedMode = jest.fn();
    const setPrefectures = jest.fn();
    const setSelectedPrefectures = jest.fn();
    const selectedPrefectures = [1];

    render(
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
        <ModeSelector />
      </AppContext.Provider>
    );

    const select = screen.getByRole('combobox');

    expect(select).toBeInTheDocument();

    modeOptions.forEach((option, i) => {
      const optionElement = screen.getByText(option);
      expect(optionElement).toBeInTheDocument();
      expect(optionElement.getAttribute('value')).toBe(`${i}`);
    });
  });

  it('calls setSelectedMode when a new option is selected', () => {
    const selectedMode = 1;
    const setSelectedMode = jest.fn();
    const setPrefectures = jest.fn();
    const setSelectedPrefectures = jest.fn();
    const selectedPrefectures = [1];

    render(
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
        <ModeSelector />
      </AppContext.Provider>
    );

    const select = screen.getByRole('combobox');

    fireEvent.change(select, { target: { value: '2' } });

    expect(setSelectedMode).toHaveBeenCalledWith(2);
  });
});
// 5. testing PoopulationGraph
describe('PopulationGraph', () => {
  it('renders the graph', () => {
    const { container } = render(<PopulationGraph />);
    expect(container.querySelector('.graph')).toBeInTheDocument();
  });
});

// 6. testing footer
describe('Footer', () => {
  it('renders the correct content', () => {
    render(<Footer />);

    const copyrightText = screen.getByText(/All rights are reserved 2023 by/);
    const githubLink = screen.getByRole('link', {
      name: /@Yoshimasa Iwano \(Github\)/
    });

    expect(copyrightText).toBeInTheDocument();
    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute(
      'href',
      'https://github.com/YoshimasaIwano'
    );
  });
});
