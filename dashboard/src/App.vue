<template>
  <div class="dashboard-container">
    <h2>Dashboard</h2>
    <div class="dashboard-stats">
      <div class="stat-card">
        <h4>Total Sales</h4>
        <p class="stat-value">$12,345</p>
      </div>
      <div class="stat-card">
        <h4>Active Users</h4>
        <p class="stat-value">1,234</p>
      </div>
      <div class="stat-card">
        <h4>Conversion Rate</h4>
        <p class="stat-value">12.3%</p>
      </div>
      <div class="stat-card">
        <h4>Revenue</h4>
        <p class="stat-value">$45,678</p>
      </div>
    </div>

    <div class="charts-row">
      <div class="chart-col">
        <BarChart />
      </div>
      <div class="chart-col">
        <LineChart />
      </div>
    </div>

    <div class="charts-row">
      <div class="chart-col">
        <PieChart />
      </div>
    </div>
  </div>
</template>

<script>
import BarChart from "./components/BarChart.vue";
import LineChart from "./components/LineChart.vue";
import PieChart from "./components/PieChart.vue";

export default {
  name: "App",
  components: {
    BarChart,
    LineChart,
    PieChart,
  },
};
</script>

<style scoped>
.dashboard-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

h2 {
  color: #333;
  margin-bottom: 20px;
  text-align: center;
}

.dashboard-stats {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.stat-card {
  flex: 1;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 15px;
  margin: 0 10px;
  text-align: center;
}

.stat-card:first-child {
  margin-left: 0;
}

.stat-card:last-child {
  margin-right: 0;
}

.stat-card h4 {
  margin-top: 0;
  margin-bottom: 10px;
  color: #555;
}

.stat-value {
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin: 0;
}

.charts-row {
  display: flex;
  margin-bottom: 20px;
}

.chart-col {
  flex: 1;
  margin: 0 10px;
}

.chart-col:first-child {
  margin-left: 0;
}

.chart-col:last-child {
  margin-right: 0;
}

@media (max-width: 768px) {
  .dashboard-stats,
  .charts-row {
    flex-direction: column;
  }

  .stat-card,
  .chart-col {
    margin: 0 0 20px 0;
  }
}
</style>
