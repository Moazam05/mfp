<template>
  <div class="settings-container">
    <div class="user-profile-header">
      <div class="user-avatar">
        <span class="avatar-text">{{ userInitials }}</span>
      </div>
      <div class="user-info">
        <h2>Welcome, {{ userData.name || "User" }}</h2>
        <p class="user-email">{{ userData.email || "email@example.com" }}</p>
      </div>
      <button class="logout-button" @click="handleLogout">
        <i class="pi pi-sign-out"></i>
        Logout
      </button>
    </div>

    <div class="settings-content">
      <div class="settings-section">
        <h3><i class="pi pi-shield"></i> Data & Privacy</h3>

        <div class="settings-form">
          <div class="privacy-section">
            <h4>Data Usage & Sharing</h4>

            <div class="notification-option">
              <div class="notification-option-text">
                <p class="option-title">Usage Analytics</p>
                <p class="option-description">
                  Allow us to collect anonymous usage data to improve our
                  services
                </p>
              </div>
              <div class="toggle-switch">
                <input
                  type="checkbox"
                  id="analytics"
                  v-model="usageAnalytics"
                />
                <label for="analytics"></label>
              </div>
            </div>

            <div class="notification-option">
              <div class="notification-option-text">
                <p class="option-title">Personalized Experience</p>
                <p class="option-description">
                  Allow us to use your data to personalize your dashboard
                  experience
                </p>
              </div>
              <div class="toggle-switch">
                <input
                  type="checkbox"
                  id="personalization"
                  v-model="personalizedExperience"
                />
                <label for="personalization"></label>
              </div>
            </div>
          </div>

          <div class="privacy-section">
            <h4>Data Management</h4>

            <div class="data-management-actions">
              <button class="action-button secondary">
                <i class="pi pi-download"></i>
                Download Your Data
              </button>

              <button class="action-button caution">
                <i class="pi pi-trash"></i>
                Delete Account
              </button>
            </div>
          </div>

          <div class="form-actions">
            <button class="action-button primary">Save Privacy Settings</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";

export default {
  name: "Settings",
  setup() {
    // Local states
    const userData = ref({});
    const isSignedIn = ref(false);
    const usageAnalytics = ref(true);
    const personalizedExperience = ref(true);

    // Get user data from localStorage on component mount
    onMounted(() => {
      try {
        const storedData = localStorage.getItem("loggedInUser");
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          userData.value = parsedData.userData || {};
          isSignedIn.value = parsedData.isSignedIn || false;
        }
      } catch (error) {
        console.error("Error reading from localStorage:", error);
      }
    });

    // Compute user initials from name
    const userInitials = computed(() => {
      if (!userData.value.name) return "GU";

      const nameParts = userData.value.name.split(" ");
      if (nameParts.length >= 2) {
        return (nameParts[0][0] + nameParts[1][0]).toUpperCase();
      }
      return nameParts[0].substring(0, 2).toUpperCase();
    });

    // Handle logout - the key functionality
    const handleLogout = () => {
      // Clear the logged in user data from localStorage
      localStorage.removeItem("loggedInUser");

      // This is the hack to navigate to container's root URL
      // We need to navigate to the container app root
      // Remove '/dashboard' from the current URL
      const baseUrl = window.location.origin;
      window.location.href = baseUrl;
    };

    return {
      userData,
      isSignedIn,
      userInitials,
      usageAnalytics,
      personalizedExperience,
      handleLogout,
    };
  },
};
</script>

<style scoped>
.settings-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 30px 20px;
  color: #333;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

.user-profile-header {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid #eee;
}

.user-avatar {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background-color: #4a6fdc;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  flex-shrink: 0;
}

.avatar-text {
  color: white;
  font-size: 24px;
  font-weight: 500;
}

.user-info {
  flex-grow: 1;
}

.user-info h2 {
  margin: 0 0 5px 0;
  color: #333;
  font-size: 24px;
  text-align: left;
}

.user-email {
  margin: 0;
  color: #666;
  font-size: 14px;
}

.logout-button {
  background-color: transparent;
  color: #f44336;
  border: 1px solid #f44336;
  border-radius: 6px;
  padding: 8px 16px;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s;
}

.logout-button:hover {
  background-color: #f44336;
  color: white;
}

.settings-section {
  background-color: white;
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

h3 {
  margin: 0 0 20px 0;
  font-size: 18px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  color: #333;
}

.settings-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.action-button {
  padding: 10px 16px;
  border-radius: 6px;
  border: none;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 6px;
}

.action-button.primary {
  background-color: #4a6fdc;
  color: white;
}

.action-button.secondary {
  background-color: #f5f5f5;
  color: #333;
}

.action-button.caution {
  background-color: transparent;
  color: #f44336;
  border: 1px solid #f44336;
}

.notification-option {
  display: flex;
  margin-bottom: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid #f5f5f5;
}

.notification-option:last-child {
  margin-bottom: 0;
  padding-bottom: 0;
  border-bottom: none;
}

.notification-option-text {
  flex-grow: 1;
  padding-right: 20px;
}

.option-title {
  margin: 0 0 5px 0;
  font-size: 14px;
  font-weight: 500;
  color: #333;
}

.option-description {
  margin: 0;
  font-size: 12px;
  color: #666;
}

.privacy-section {
  margin-bottom: 25px;
}

.privacy-section h4 {
  margin: 0 0 15px 0;
  font-size: 16px;
  font-weight: 500;
  color: #444;
  padding-bottom: 8px;
  border-bottom: 1px solid #eee;
}

.data-management-actions {
  display: flex;
  gap: 15px;
  margin-top: 15px;
}

.form-actions {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

@media (max-width: 768px) {
  .user-profile-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }

  .logout-button {
    align-self: flex-end;
  }

  .notification-option {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }

  .data-management-actions {
    flex-direction: column;
  }
}
</style>
