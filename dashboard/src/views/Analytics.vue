<template>
  <div class="analytics-container">
    <div class="analytics-header">
      <h2>Analytics Overview</h2>
    </div>

    <div class="table-section">
      <div class="table-container top-pages">
        <div class="table-header">
          <h3>Top Pages</h3>
          <div class="table-actions">
            <select class="page-metric-select">
              <option>By Views</option>
              <option>By Time Spent</option>
              <option>By Conversion</option>
            </select>
            <button class="table-btn">
              <i class="pi pi-download"></i> Export
            </button>
          </div>
        </div>
        <table class="analytics-table">
          <thead>
            <tr>
              <th>Page</th>
              <th>Views</th>
              <th>Unique Views</th>
              <th>Avg. Time</th>
              <th>Bounce Rate</th>
              <th>Exit Rate</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(page, index) in topPages" :key="index">
              <td>
                <strong>{{ page.url }}</strong>
              </td>
              <td>{{ page.views }}</td>
              <td>{{ page.uniqueViews }}</td>
              <td>{{ page.avgTime }}</td>
              <td>{{ page.bounceRate }}</td>
              <td>{{ page.exitRate }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="columns-section">
      <div class="column">
        <div class="chart-container device-breakdown">
          <div class="chart-header">
            <h3>Traffic by Device</h3>
          </div>
          <DeviceBreakdownChart />
        </div>
      </div>

      <div class="column">
        <div class="chart-container acquisition-channels">
          <div class="chart-header">
            <h3>Acquisition Channels</h3>
          </div>
          <AcquisitionChart />
        </div>
      </div>
    </div>

    <div class="table-section">
      <div class="table-container conversions">
        <div class="table-header">
          <h3>Conversion Metrics</h3>
          <div class="table-actions">
            <button class="table-btn">
              <i class="pi pi-download"></i> Export
            </button>
          </div>
        </div>
        <table class="analytics-table">
          <thead>
            <tr>
              <th>Conversion Goal</th>
              <th>Completions</th>
              <th>Conversion Rate</th>
              <th>Value</th>
              <th>vs Previous</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(conversion, index) in conversionMetrics" :key="index">
              <td>
                <strong>{{ conversion.goal }}</strong>
              </td>
              <td>{{ conversion.completions }}</td>
              <td>{{ conversion.rate }}</td>
              <td>{{ conversion.value }}</td>
              <td>
                <span
                  class="trend-indicator"
                  :class="
                    conversion.change.includes('+') ? 'positive' : 'negative'
                  "
                >
                  {{ conversion.change }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="table-section">
      <div class="table-container user-demographics">
        <div class="table-header">
          <h3>User Demographics</h3>
          <div class="table-actions">
            <button class="table-btn active">Age</button>
            <button class="table-btn">Gender</button>
            <button class="table-btn">Interests</button>
          </div>
        </div>
        <table class="analytics-table">
          <thead>
            <tr>
              <th>Age Group</th>
              <th>Users</th>
              <th>% of Total</th>
              <th>Sessions</th>
              <th>Pages/Session</th>
              <th>Conversion Rate</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(demo, index) in demographics" :key="index">
              <td>
                <strong>{{ demo.ageGroup }}</strong>
              </td>
              <td>{{ demo.users }}</td>
              <td>{{ demo.percentage }}</td>
              <td>{{ demo.sessions }}</td>
              <td>{{ demo.pagesPerSession }}</td>
              <td>{{ demo.conversionRate }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import DeviceBreakdownChart from "./charts/DeviceBreakdownChart.vue";
import AcquisitionChart from "./charts/AcquisitionChart.vue";

export default defineComponent({
  name: "Analytics",
  components: {
    DeviceBreakdownChart,
    AcquisitionChart,
  },
  setup() {
    const selectedPeriod = ref("month");

    const trafficSources = ref([
      {
        name: "Google",
        visitors: "10,534",
        percentage: "43.2%",
        bounceRate: "28.5%",
        avgTime: "3m 12s",
        trend: "up",
        trendValue: "5.3%",
      },
      {
        name: "Direct",
        visitors: "6,428",
        percentage: "26.3%",
        bounceRate: "31.7%",
        avgTime: "4m 08s",
        trend: "up",
        trendValue: "2.1%",
      },
      {
        name: "Facebook",
        visitors: "2,937",
        percentage: "12.0%",
        bounceRate: "45.2%",
        avgTime: "1m 54s",
        trend: "down",
        trendValue: "3.7%",
      },
      {
        name: "Twitter",
        visitors: "1,843",
        percentage: "7.5%",
        bounceRate: "42.8%",
        avgTime: "2m 12s",
        trend: "up",
        trendValue: "1.5%",
      },
      {
        name: "LinkedIn",
        visitors: "1,253",
        percentage: "5.1%",
        bounceRate: "35.3%",
        avgTime: "3m 45s",
        trend: "up",
        trendValue: "8.2%",
      },
      {
        name: "Others",
        visitors: "1,437",
        percentage: "5.9%",
        bounceRate: "39.4%",
        avgTime: "2m 30s",
        trend: "down",
        trendValue: "1.2%",
      },
    ]);

    const topPages = ref([
      {
        url: "/products",
        views: "14,253",
        uniqueViews: "11,842",
        avgTime: "3m 45s",
        bounceRate: "23.5%",
        exitRate: "18.7%",
      },
      {
        url: "/home",
        views: "12,840",
        uniqueViews: "10,635",
        avgTime: "2m 30s",
        bounceRate: "31.2%",
        exitRate: "22.3%",
      },
      {
        url: "/services",
        views: "9,245",
        uniqueViews: "7,821",
        avgTime: "4m 12s",
        bounceRate: "28.7%",
        exitRate: "24.1%",
      },
      {
        url: "/contact",
        views: "8,534",
        uniqueViews: "7,223",
        avgTime: "1m 52s",
        bounceRate: "42.1%",
        exitRate: "35.8%",
      },
      {
        url: "/about",
        views: "6,945",
        uniqueViews: "5,834",
        avgTime: "3m 05s",
        bounceRate: "25.3%",
        exitRate: "19.6%",
      },
      {
        url: "/blog",
        views: "5,432",
        uniqueViews: "4,321",
        avgTime: "4m 23s",
        bounceRate: "21.7%",
        exitRate: "17.2%",
      },
    ]);

    const conversionMetrics = ref([
      {
        goal: "Newsletter Signup",
        completions: "845",
        rate: "3.42%",
        value: "$2,535",
        change: "+12.5%",
      },
      {
        goal: "Account Creation",
        completions: "1,237",
        rate: "5.03%",
        value: "$6,185",
        change: "+7.3%",
      },
      {
        goal: "Add to Cart",
        completions: "3,452",
        rate: "14.07%",
        value: "$0",
        change: "+4.8%",
      },
      {
        goal: "Purchase Completion",
        completions: "1,534",
        rate: "6.25%",
        value: "$84,372",
        change: "+9.1%",
      },
      {
        goal: "Document Download",
        completions: "723",
        rate: "2.95%",
        value: "$3,615",
        change: "-2.3%",
      },
    ]);

    const demographics = ref([
      {
        ageGroup: "18-24",
        users: "3,254",
        percentage: "13.3%",
        sessions: "5,842",
        pagesPerSession: "3.2",
        conversionRate: "4.8%",
      },
      {
        ageGroup: "25-34",
        users: "8,932",
        percentage: "36.5%",
        sessions: "15,834",
        pagesPerSession: "4.5",
        conversionRate: "7.2%",
      },
      {
        ageGroup: "35-44",
        users: "6,784",
        percentage: "27.7%",
        sessions: "12,543",
        pagesPerSession: "4.1",
        conversionRate: "6.9%",
      },
      {
        ageGroup: "45-54",
        users: "3,215",
        percentage: "13.1%",
        sessions: "5,932",
        pagesPerSession: "3.8",
        conversionRate: "5.4%",
      },
      {
        ageGroup: "55-64",
        users: "1,534",
        percentage: "6.3%",
        sessions: "2,843",
        pagesPerSession: "3.2",
        conversionRate: "4.1%",
      },
      {
        ageGroup: "65+",
        users: "763",
        percentage: "3.1%",
        sessions: "1,245",
        pagesPerSession: "2.8",
        conversionRate: "2.3%",
      },
    ]);

    return {
      selectedPeriod,
      trafficSources,
      topPages,
      conversionMetrics,
      demographics,
    };
  },
});
</script>

<style scoped>
.analytics-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  color: #333;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

.analytics-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
}

h2 {
  color: #333;
  margin: 0;
  font-weight: 600;
  font-size: 28px;
}

.date-range-picker {
  display: flex;
  align-items: center;
  gap: 10px;
}

.date-range-picker select {
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid #ddd;
  background-color: white;
  font-size: 14px;
}

.analytics-summary {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 30px;
}

.summary-card {
  background-color: white;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  align-items: center;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s, box-shadow 0.2s;
}

.summary-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.card-icon {
  width: 50px;
  height: 50px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  font-size: 24px;
  color: white;
}

.visitors {
  background-color: #4a6fdc;
}
.pageviews {
  background-color: #23c9a8;
}
.bounces {
  background-color: #f78166;
}
.duration {
  background-color: #9c6ade;
}

.card-content h3 {
  margin: 0 0 5px 0;
  font-size: 14px;
  color: #666;
  font-weight: 500;
}

.card-value {
  margin: 0 0 5px 0;
  font-size: 22px;
  font-weight: 600;
}

.card-change {
  margin: 0;
  font-size: 13px;
  font-weight: 500;
}

.positive {
  color: #23c9a8;
}
.negative {
  color: #f78166;
}

.table-section {
  margin-bottom: 30px;
}

.columns-section {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-bottom: 30px;
}

.table-container,
.chart-container {
  background-color: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
}

.table-header,
.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.table-header h3,
.chart-header h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
}

.table-actions {
  display: flex;
  gap: 8px;
  align-items: center;
}

.table-btn,
.chart-btn {
  background: none;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 5px 10px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 5px;
}

.table-btn.active,
.table-btn:hover,
.chart-btn.active,
.chart-btn:hover {
  background-color: #4a6fdc;
  color: white;
  border-color: #4a6fdc;
}

.page-metric-select {
  padding: 5px 10px;
  border-radius: 4px;
  border: 1px solid #ddd;
  font-size: 12px;
  margin-right: 8px;
}

.analytics-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}

.analytics-table th,
.analytics-table td {
  padding: 12px 15px;
  text-align: left;
  border-bottom: 1px solid #eee;
}

.analytics-table th {
  font-weight: 600;
  color: #555;
  background-color: #f8f9fa;
}

.analytics-table tr:last-child td {
  border-bottom: none;
}

.analytics-table tr:hover td {
  background-color: #f8f9fa;
}

.trend-indicator {
  display: flex;
  align-items: center;
  gap: 4px;
  font-weight: 500;
}

@media (max-width: 1024px) {
  .analytics-summary {
    grid-template-columns: repeat(2, 1fr);
  }

  .columns-section {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .analytics-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }

  .analytics-summary {
    grid-template-columns: 1fr;
  }

  .table-container {
    overflow-x: auto;
  }

  .analytics-table {
    min-width: 700px;
  }
}
</style>
