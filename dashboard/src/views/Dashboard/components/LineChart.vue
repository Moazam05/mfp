<template>
  <div class="chart-container">
    <h3>Revenue Trends</h3>
    <div style="width: 100%; height: 300px">
      <Line :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { Line } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale
);

export default defineComponent({
  name: "LineChart",
  components: { Line },
  setup() {
    const chartData = {
      labels: ["January", "February", "March", "April", "May", "June"],
      datasets: [
        {
          label: "Revenue",
          borderColor: "#2ecc71",
          backgroundColor: "rgba(46, 204, 113, 0.2)",
          data: [30, 40, 35, 50, 49, 60],
          tension: 0.4,
          fill: true,
        },
      ],
    };

    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
    };

    return { chartData, chartOptions };
  },
});
</script>

<style scoped>
.chart-container {
  height: 100%;
  width: 100%;
  margin-bottom: 15px;
  padding: 15px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

h3 {
  margin-top: 0;
  margin-bottom: 15px;
  color: #333;
  text-align: center;
}
</style>
