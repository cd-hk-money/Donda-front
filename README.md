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
 ┃ ┃ ┣ 📜DetailChart.vue
 ┃ ┃ ┗ 📜StockInfo.vue
 ┃ ┣ 📂layout
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
 ┃ ┃ ┣ 📜TopScroll.vue
 ┃ ┃ ┗ 📜TransListContents.vue
 ┣ 📂layout
 ┃ ┣ 📜AppBar.vue
 ┃ ┣ 📜Error.vue
 ┃ ┣ 📜Market.vue
 ┃ ┣ 📜NavBar.vue
 ┃ ┣ 📜News.vue
 ┃ ┣ 📜Recommend.vue
 ┃ ┣ 📜SideBar.vue
 ┃ ┣ 📜Similar.vue
 ┃ ┣ 📜StockDetail.vue
 ┃ ┗ 📜TransList.vue
 ┣ 📂mixins
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
 ┃ ┣ 📜Home.vue
 ┃ ┣ 📜TestChart.vue
 ┃ ┗ 📜Trans.vue
 ┣ 📂plugins
 ┃ ┗ 📜vuetify.ts
 ┣ 📂routes
 ┃ ┗ 📜index.ts
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
```
