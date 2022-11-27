<template>
  <v-card :height="mobile ? '100%' : 787">
    <v-card-title> 주가 </v-card-title>
    <v-card-subtitle>
      <span>{{ stock.data.name }}의 주가 정보를 확인해보세요.</span>
    </v-card-subtitle>

    <v-divider />

    <v-card elevation="0" height="50" class="d-flex justify-end align-center">
      <v-btn
        plain
        @click="volumeEnable = !volumeEnable"
        v-model="volumeEnable"
        active-class="chip-active"
      >
        <v-icon left>mdi-chart-bar</v-icon>
        거래량 표시
      </v-btn>
      <v-menu
        left
        bottom
        offset-y
        :close-on-content-click="false"
        v-model="menu"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn plain class="mr-2" v-on="on" v-bind="attrs" disabled>
            <v-icon left>mdi-calendar</v-icon>
            날짜 선택
          </v-btn>
        </template>
        <v-card>
          <v-date-picker
            :allowed-dates="allowedDates"
            v-model="picked"
            :month-format="monthFormat"
            :header-date-format="monthFormat"
            :weekday-format="weekdayFormat"
            :show-current="false"
            no-title
            color="cyan"
            range
          >
            <v-btn
              plain
              @click="menu = false"
              color="error"
              class="date-action"
            >
              취소
            </v-btn>
            <v-btn plain @click="selectDate"> 결정 </v-btn>
          </v-date-picker>
        </v-card>
      </v-menu>
    </v-card>
    <div v-if="!stockGraphAll.loading && !stockGraphVolume.loading">
      <StockBigChart
        :gradient="gradientEnable"
        :volume="volumeEnable"
        :height="chartHeight"
      />
      <!-- <StockChartD3 /> -->
      <!-- <StockChartD3LineBar /> -->
    </div>
    <div class="text-center stockinfo-progress-circular" v-else>
      <v-progress-circular indeterminate color="#00BCD4" />
    </div>
  </v-card>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import StockBigChart from "@/v2/components/detail/stock/StockBigChart.vue";
import StockChartD3 from "@/v2/components/detail/stock/StockChartD3.vue";
import StockChartD3LineBar from "@/v2/components/detail/stock/StockChartD3LineBar.vue";
import StockStoreMixin from "@/mixins/StockStoreMixin.vue";

@Component({
  components: {
    StockBigChart,
    StockChartD3,
    StockChartD3LineBar,
  },
})
export default class Stock extends StockStoreMixin {
  count = 33;
  dateOverlay = false;
  gradientEnable = false;
  volumeEnable = false;
  menu = false;
  picked = [];
  rangePicked = [];

  get lastDate() {
    const labels = Object.keys(this.stockGraphDefault.data);
    return labels[labels.length - 1];
  }

  get mobile() {
    return this.$vuetify.breakpoint.name === "xs";
  }

  get height() {
    return this.mobile ? 500 : 787;
  }

  get chartHeight() {
    return this.$vuetify.breakpoint.name === "xs" ? 230 : 140;
  }

  get Picked() {
    const last = new Date(this.lastDate);
    return [
      new Date(last.setDate(last.getDate() - this.count))
        .toISOString()
        .substr(0, 10),
      this.lastDate,
    ];
  }

  set Picked(val) {
    this.picked = val;
  }

  allowedDates(arg: string) {
    const current = new Date(arg).getTime();
    const last = new Date(this.lastDate).getTime();
    if (current < last) return arg;
    return null;
  }

  monthFormat = (date: string) => {
    const split = date.split("-");
    if (split.length === 1) return `${split[0]}년`;
    return `${split[0]}년 ${split[1]}월`;
  };

  weekdayFormat = (date: string) => {
    const week = ["일", "월", "화", "수", "목", "금", "토"];
    const dayOfWeek = week[new Date(date).getDay()];
    return dayOfWeek;
  };

  selectDate() {
    this.menu = false;
    this.rangePicked = this.picked;
  }

  async mounted() {
    this.picked = this.Picked;
  }
}
</script>

<style scoped>
.chip-active {
  background-color: #00bcd4 !important;
}
</style>
