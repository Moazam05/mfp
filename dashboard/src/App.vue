<template>
  <div class="app-container">
    <nav class="app-navigation">
      <ul>
        <li><router-link to="/dashboard">Dashboard</router-link></li>
        <li><router-link to="/analytics">Analytics</router-link></li>
        <li><router-link to="/settings">Settings</router-link></li>
      </ul>
    </nav>

    <main class="app-content">
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.app-navigation {
  background-color: #333;
  padding: 10px 0;
}

.app-navigation ul {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
  justify-content: center;
}

.app-navigation li {
  margin: 0 15px;
}

.app-navigation a {
  color: white;
  text-decoration: none;
  font-weight: bold;
  padding: 8px 12px;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.app-navigation a:hover {
  background-color: #555;
}

.app-navigation a.router-link-active {
  background-color: #4a90e2;
}

.app-content {
  flex: 1;
  padding: 20px;
}
</style>
