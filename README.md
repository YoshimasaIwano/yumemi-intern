# yumemi-intern
以下がこのレポジトリの構成である。
```
yumemi-intern/
├──frontend/
│   ├── public/   
│   │   ├── favicon.ico
│   │   ├── index.html
│   │   ├── logo192.png   
│   │   ├── logo512.png
│   │   ├── manifest.json  
│   │   └── robot.txt
│   ├── src/
│   │   ├── App.tsx
│   │   ├── index.tsx
│   │   ├── react-app-env.d.ts
│   │   ├── reportWebVitals.ts
│   │   ├── setupTests.ts
│   │   ├── components/
│   │   │   ├── Main.tsx
│   │   │   ├── ModeSelector.tsx
│   │   │   ├── PopulationGraph.tsx
│   │   │   └── PrefectureList.tsx
│   │   ├── hooks/
│   │   │   └── usePopulationData.tsx
│   │   ├── styles/
│   │   │   ├── App.css
│   │   │   ├── index.css
│   │   │   └── main.css
│   │   ├── test/
│   │   │   └── App.test.tsx
│   │   ├── types/
│   │   │   └── index.ts
│   │   └── utils/
│   │       └── fetchPrefectures.tsx
│   ├── .env
│   ├── .env.production
│   ├── .eslintrc
│   ├── .firebaserc
│   ├── .gitignore
│   ├── .prettierrc
│   ├── firebase.json
│   ├── package-lock.json
│   ├── package.json
│   ├── README.md
│   └── tsconfig.json
├── .gitignore
└── README.md
````
# URL
firebaseを用いてデプロイされており、以下のサイトから作品を閲覧することができます。  
https://yumemi-intern-fbe1a.web.app/

# 困難
- グラフの描画  
  Highchartsを用いてグラフを描画した経験がなかったので調べながら実装するのに少し時間がかかった。
- APIからデータの取得および適切なグラフの設定  
  APIから取得したデータをReactを用いて適切なグラフとして描画するために非同期処理等を考慮しなければならなかった。  
- テストケース/テストコードの作成  
  今までにテストケースを書かなければいけない状況に遭遇したことがなかったので、初めてで調べながら実装した。  
- ESLintとPrettierの使用  
  このツールの使用したことがなかったので、使用方法の習得に少し時間がかかった。
