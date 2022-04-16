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
 ┣ 📂assets
 ┃ ┣ 📜logo.png
 ┃ ┗ 📜logo.svg
 ┣ 📂components
 ┃ ┣ 📂detail
 ┃ ┃ ┣ 📜DatePickers.vue
 ┃ ┃ ┣ 📜DetailChart.vue
 ┃ ┃ ┣ 📜LineChart.vue
 ┃ ┃ ┣ 📜StockAnalysis.vue
 ┃ ┃ ┣ 📜StockFinanceState.vue
 ┃ ┃ ┣ 📜StockFinanceStateChart.vue
 ┃ ┃ ┣ 📜StockInfo.vue
 ┃ ┃ ┗ 📜TermSelect.vue
 ┃ ┣ 📂market
 ┃ ┃ ┣ 📜MarketCarousel.vue
 ┃ ┃ ┣ 📜MarketChart.vue
 ┃ ┃ ┗ 📜MarketDesc.vue
 ┃ ┣ 📂news
 ┃ ┃ ┗ 📜NewsContent.vue
 ┃ ┣ 📂recommend
 ┃ ┃ ┗ 📜RecommentContent.vue
 ┃ ┣ 📂similar
 ┃ ┃ ┗ 📜SimilarContent.vue
 ┃ ┗ 📂translist
 ┃ ┃ ┣ 📜SortDialog.vue
 ┃ ┃ ┣ 📜TopScroll.vue
 ┃ ┃ ┗ 📜TransListContents.vue
 ┣ 📂layout
 ┃ ┣ 📜AppBar.vue
 ┃ ┣ 📜Error.vue
 ┃ ┣ 📜Market.vue
 ┃ ┣ 📜News.vue
 ┃ ┣ 📜Recommend.vue
 ┃ ┣ 📜SideBar.vue
 ┃ ┣ 📜Similar.vue
 ┃ ┣ 📜StockDetail.vue
 ┃ ┗ 📜TransList.vue
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
 ┣ 📂pages
 ┃ ┣ 📜Change.vue
 ┃ ┣ 📜Detail.vue
 ┃ ┣ 📜doChart.vue
 ┃ ┣ 📜Home.vue
 ┃ ┗ 📜Trans.vue
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
 ┃ ┗ 📜StockStore.ts
 ┣ 📜App.vue
 ┣ 📜main.ts
 ┣ 📜shims-tsx.d.ts
 ┣ 📜shims-vue.d.ts
 ┗ 📜shims-vuetify.d.ts

#  구성요소

 Framework - Vue 2 (Class Component, Typescript, vuex, vuex-class)  
 CSS library - Vuetify (Vue 2)  

--- 
Vuetify의 원활한 사용을 위해 Vue 2 사용.  

API 데이터셋이 복잡하므로, TS 사용.  

TS의 사용 용이성을 위해 컴포넌트와 Store를 Class 형식으로 작성.






