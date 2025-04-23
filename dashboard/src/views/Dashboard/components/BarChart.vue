<template>
  <div class="chart-container">
    <h3>Monthly Sales</h3>
    <div style="width: 100%; height: 300px">
      <Bar :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

export default defineComponent({
  name: "BarChart",
  components: { Bar },
  setup() {
    const chartData = {
      labels: ["January", "February", "March", "April", "May", "June"],
      datasets: [
        {
          label: "Sales",
          backgroundColor: "#3498db",
          data: [40, 20, 30, 50, 90, 70],
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
