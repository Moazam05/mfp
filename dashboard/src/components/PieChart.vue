<template>
  <div class="chart-container">
    <h3>Customer Segments</h3>
    <div style="width: 100%; height: 300px">
      <Pie :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { Pie } from "vue-chartjs";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from "chart.js";

ChartJS.register(Title, Tooltip, Legend, ArcElement);

export default defineComponent({
  name: "PieChart",
  components: { Pie },
  setup() {
    const chartData = {
      labels: ["Enterprise", "Small Business", "Consumer", "Government"],
      datasets: [
        {
          backgroundColor: ["#3498db", "#2ecc71", "#e74c3c", "#f39c12"],
          data: [35, 25, 30, 10],
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
