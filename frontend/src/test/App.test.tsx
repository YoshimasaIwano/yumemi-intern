import {
  render,
  screen,
  fireEvent,
  renderHook,
  waitFor
} from '@testing-library/react';
import App from '../App';
import fetchPrefectures from '../utils/fetchPrefectures';
import PrefectureList from '../components/PrefectureList';
import ModeSelector from '../components/ModeSelector';
import PopulationGraph from '../components/PopulationGraph';
import fetchPopulationData from '../utils/fetchPopulationData';

// 1. testing main page
test('renders Main page', () => {
  const { asFragment, getByText } = render(<App />);
  expect(getByText('都道府県 リスト')).toBeInTheDocument();
  expect(asFragment()).toMatchInlineSnapshot(`
  <DocumentFragment>
    <div
      class="App"
    >
      <div
        class="main-container"
      >
        <h1>
          都道府県 リスト
        </h1>
        <div
          class="list-container"
        />
        <select
          class="mv-1 select-toggle"
        >
          <option
            value="0"
          >
            総人口
          </option>
          <option
            value="1"
          >
            年少人口
          </option>
          <option
            value="2"
          >
            生産年齢人口
          </option>
          <option
            value="3"
          >
            老年人口
          </option>
        </select>
        <p>
          Please select a prefecture to show its population composition
        </p>
      </div>
    </div>
  </DocumentFragment>
  `);
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
test('rendering PrefectureList', async () => {
  const selectedPrefectures = [1, 2, 3];
  const onPrefectureChange = jest.fn();

  try {
    render(
      <PrefectureList
        prefectures={prefectures}
        selectedPrefectures={selectedPrefectures}
        onPrefectureChange={onPrefectureChange}
      />
    );
  } catch (error) {
    console.error(error);
  }

  // Check if all prefecture names are rendered
  prefectures.forEach((prefecture) => {
    const prefectureName = screen.getByText(prefecture.prefName);
    expect(prefectureName).toBeInTheDocument();
  });
});

// 4. testing selecting ModeSelector
describe('selecting ModeSelector', () => {
  it('should render mode options', () => {
    const { getByText } = render(
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      <ModeSelector selectedMode={0} onChange={() => {}} />
    );

    expect(getByText('総人口')).toBeInTheDocument();
    expect(getByText('年少人口')).toBeInTheDocument();
    expect(getByText('生産年齢人口')).toBeInTheDocument();
    expect(getByText('老年人口')).toBeInTheDocument();
  });

  it('should call onChange function when a mode option is selected', () => {
    const handleChange = jest.fn();
    const { getByRole } = render(
      <ModeSelector selectedMode={0} onChange={handleChange} />
    );

    fireEvent.change(getByRole('combobox'), { target: { value: '2' } });
    expect(handleChange).toHaveBeenCalledWith(2);
  });
});

// 4. testing drawing PopulationGraph
const psedoData = {
  data: [
    {
      data: [
        9683802, 10869244, 11408071, 11673554, 11618281, 11829363, 11855563,
        11773605, 12064101, 12576601, 13159388, 13515271, 14047594, 13845936,
        13882538, 13851782, 13758624, 13606683
      ],
      label: '東京都',
      years: [
        1960, 1965, 1970, 1975, 1980, 1985, 1990, 1995, 2000, 2005, 2010, 2015,
        2020, 2025, 2030, 2035, 2040, 2045
      ]
    },
    {
      data: [
        5504746, 6657189, 7620480, 8278925, 8473446, 8668095, 8734516, 8797268,
        8805081, 8817166, 8865245, 8839469, 8837685, 8526202, 8262029, 7962983,
        7649229, 7335352
      ],
      label: '大阪府',
      years: [
        1960, 1965, 1970, 1975, 1980, 1985, 1990, 1995, 2000, 2005, 2010, 2015,
        2020, 2025, 2030, 2035, 2040, 2045
      ]
    }
  ],
  mode: '総人口'
};

describe('drawing PopulationGraph', () => {
  it('renders the graph with correct data and mode', () => {
    render(<PopulationGraph data={psedoData.data} mode={psedoData.mode} />);
    const titleElement = screen.getByText(psedoData.mode);
    expect(titleElement).toBeInTheDocument();
    const xAxisElement = screen.getByText('年度');
    expect(xAxisElement).toBeInTheDocument();
    const yAxisElement = screen.getByText('人口');
    expect(yAxisElement).toBeInTheDocument();
    const tokyoElement = screen.getByText('東京都');
    expect(tokyoElement).toBeInTheDocument();
    const osakaElement = screen.getByText('大阪府');
    expect(osakaElement).toBeInTheDocument();
  });
});

// 5. testing fetching prefecture population data
const mockPrefecture = [
  { prefCode: 1, prefName: '北海道' },
  { prefCode: 13, prefName: '東京都' },
  { prefCode: 27, prefName: '大阪府' }
];

const mockPopulationData = [
  {
    data: [
      5039206, 5171800, 5184287, 5338206, 5575989, 5679439, 5643647, 5692321,
      5683062, 5627737, 5506419, 5381733, 5224614, 5016554, 4791592, 4546357,
      4280427, 4004973
    ],
    label: '北海道',
    years: [
      1960, 1965, 1970, 1975, 1980, 1985, 1990, 1995, 2000, 2005, 2010, 2015,
      2020, 2025, 2030, 2035, 2040, 2045
    ]
  },
  {
    data: [
      9683802, 10869244, 11408071, 11673554, 11618281, 11829363, 11855563,
      11773605, 12064101, 12576601, 13159388, 13515271, 14047594, 13845936,
      13882538, 13851782, 13758624, 13606683
    ],
    label: '東京都',
    years: [
      1960, 1965, 1970, 1975, 1980, 1985, 1990, 1995, 2000, 2005, 2010, 2015,
      2020, 2025, 2030, 2035, 2040, 2045
    ]
  },
  {
    data: [
      5504746, 6657189, 7620480, 8278925, 8473446, 8668095, 8734516, 8797268,
      8805081, 8817166, 8865245, 8839469, 8837685, 8526202, 8262029, 7962983,
      7649229, 7335352
    ],
    label: '大阪府',
    years: [
      1960, 1965, 1970, 1975, 1980, 1985, 1990, 1995, 2000, 2005, 2010, 2015,
      2020, 2025, 2030, 2035, 2040, 2045
    ]
  }
];

describe('fetchPopulationData', () => {
  it('returns empty array when no prefecture is selected', async () => {
    const { result } = renderHook(() =>
      fetchPopulationData({
        selectedPrefectures: [],
        selectedMode: 0,
        prefectures
      })
    );

    await waitFor(() => expect(result.current).toEqual([]));
  });

  it('returns population data for a selected prefecture', async () => {
    const { result } = renderHook(() =>
      fetchPopulationData({
        selectedPrefectures: [1, 13, 27],
        selectedMode: 0,
        prefectures: mockPrefecture
      })
    );

    await waitFor(() => expect(result.current).toEqual(mockPopulationData));
  });
});
