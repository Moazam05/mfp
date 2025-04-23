<template>
  <div class="chart-wrapper">
    <Doughnut :data="chartData" :options="chartOptions" />
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import { Doughnut } from "vue-chartjs";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default defineComponent({
  name: "DeviceBreakdownChart",
  components: { Doughnut },
  setup() {
    const chartData = ref({
      labels: ["Desktop", "Mobile", "Tablet"],
      datasets: [
        {
          data: [42, 48, 10],
          backgroundColor: ["#4A6FDC", "#23C9A8", "#F78166"],
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
            padding: 20,
            boxWidth: 8,
          },
        },
      },
      cutout: "70%",
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
