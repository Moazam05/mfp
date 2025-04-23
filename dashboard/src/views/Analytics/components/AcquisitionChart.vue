<template>
  <div class="chart-wrapper">
    <Pie :data="chartData" :options="chartOptions" />
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import { Pie } from "vue-chartjs";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default defineComponent({
  name: "AcquisitionChart",
  components: { Pie },
  setup() {
    const chartData = ref({
      labels: [
        "Organic Search",
        "Direct",
        "Social",
        "Referral",
        "Email",
        "Paid Search",
      ],
      datasets: [
        {
          data: [35, 25, 15, 12, 8, 5],
          backgroundColor: [
            "#4A6FDC",
            "#23C9A8",
            "#F78166",
            "#9C6ADE",
            "#FFB547",
            "#FF6B8B",
          ],
          borderWidth: 0,
        },
      ],
    });

    const chartOptions = ref({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "right",
          align: "center",
          labels: {
            usePointStyle: true,
            padding: 15,
            boxWidth: 8,
            font: {
              size: 11,
            },
          },
        },
      },
    });

    return { chartData, chartOptions };
  },
});
</script>

<style scoped>
.chart-wrapper {
  height: 200px;
  width: 100%;
}
</style>
