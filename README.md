```bash
📂assets      - 앱에 필요한 외부 파일을 담습니다.
📂components  - 레이아웃에 그려질 컴포넌트들을 담습니다. 
📂layout      - 페이지에 그려질 레이아웃을 담습니다.      
📂mixins      - Vue의 mixins들을 담습니다.      
📂models      - 각종 데이터 모델을 정의합니다.
📂pages       - 페이지들을 담습니다.
📂plugins     - Vue의 각종 plugins을 정의합니다.
📂routes      - 라우트 설정을 정의합니다.
📂store       - vuex store들을 정의합니다.

📦src
 ┣ 📂@types
 ┃ ┣ 📂chartjs-plugin-zoom
 ┃ ┃ ┗ 📜index.d.ts
 ┃ ┣ 📂vue-mobile-detection
 ┃ ┃ ┗ 📜index.d.ts
 ┃ ┗ 📜index.d.ts
 ┣ 📂assets
 ┃ ┣ 📜logo.png
 ┃ ┗ 📜logo.svg
 ┣ 📂mixins
 ┃ ┣ 📜tools.ts
 ┃ ┗ 📜TopListMixin.vue
 ┣ 📂models
 ┃ ┣ 📜app.ts
 ┃ ┣ 📜interest.ts
 ┃ ┣ 📜market.ts
 ┃ ┣ 📜payload.ts
 ┃ ┣ 📜stock.ts
 ┃ ┗ 📜user.ts
 ┣ 📂plugins
 ┃ ┗ 📜vuetify.ts
 ┣ 📂routes
 ┃ ┗ 📜index.js
 ┣ 📂scss
 ┃ ┗ 📜variables.scss
 ┣ 📂store
 ┃ ┣ 📜index.ts
 ┃ ┣ 📜InterestStore.ts
 ┃ ┣ 📜MarketStore.ts
 ┃ ┣ 📜StockStore.ts
 ┃ ┣ 📜StockStoreV2.ts
 ┃ ┗ 📜UserStore.ts
 ┣ 📂v2
 ┃ ┣ 📂components
 ┃ ┃ ┣ 📂detail
 ┃ ┃ ┃ ┣ 📜Stock.vue
 ┃ ┃ ┃ ┣ 📜StockBigChart.vue
 ┃ ┃ ┃ ┣ 📜StockChart.vue
 ┃ ┃ ┃ ┣ 📜StockDrawer.vue
 ┃ ┃ ┃ ┣ 📜StockFinance.vue
 ┃ ┃ ┃ ┣ 📜StockFinanceBarChart.vue
 ┃ ┃ ┃ ┣ 📜StockFinanceLineChart.vue
 ┃ ┃ ┃ ┣ 📜StockIndicator.vue
 ┃ ┃ ┃ ┣ 📜StockIndicatorBarChart.vue
 ┃ ┃ ┃ ┣ 📜StockIndicatorChart.vue
 ┃ ┃ ┃ ┣ 📜StockInfo.vue
 ┃ ┃ ┃ ┣ 📜StockMarcapChart.vue
 ┃ ┃ ┃ ┣ 📜StockNews.vue
 ┃ ┃ ┃ ┣ 📜StockScore.vue
 ┃ ┃ ┃ ┣ 📜StockScoreBarChart.vue
 ┃ ┃ ┃ ┣ 📜StockSimilar.vue
 ┃ ┃ ┃ ┣ 📜StockSimilarContents.vue
 ┃ ┃ ┃ ┣ 📜StockValuation.vue
 ┃ ┃ ┃ ┗ 📜StockValuationChart.vue
 ┃ ┃ ┣ 📂home
 ┃ ┃ ┃ ┣ 📜Market.vue
 ┃ ┃ ┃ ┣ 📜MarketChart.vue
 ┃ ┃ ┃ ┣ 📜MarketDesc.vue
 ┃ ┃ ┃ ┣ 📜MarketTrend.vue
 ┃ ┃ ┃ ┗ 📜StockRecommend.vue
 ┃ ┃ ┗ 📂rank
 ┃ ┃ ┃ ┣ 📜RankComponent.vue
 ┃ ┃ ┃ ┗ 📜RankContents.vue
 ┃ ┗ 📂pages
 ┃ ┃ ┣ 📜AppBar.vue
 ┃ ┃ ┣ 📜DetailV2.vue
 ┃ ┃ ┣ 📜HomeV2.vue
 ┃ ┃ ┣ 📜InterestToggle.vue
 ┃ ┃ ┣ 📜MenuBar.vue
 ┃ ┃ ┣ 📜RankV2.vue
 ┃ ┃ ┗ 📜SideBar.vue
 ┣ 📜App.vue
 ┣ 📜main.ts
 ┣ 📜shims-tsx.d.ts
 ┣ 📜shims-vue.d.ts
 ┗ 📜shims-vuetify.d.ts
```
#  구성요소

 Framework - Vue 2 (Class Component, Typescript, vuex, vuex-class)  
 CSS library - Vuetify (Vue 2)  

--- 
Vuetify의 원활한 사용을 위해 Vue 2 사용.  

API 데이터셋이 복잡하므로, TS 사용.  

TS의 사용 용이성을 위해 컴포넌트와 Store를 Class 형식으로 작성.






