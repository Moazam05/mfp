import { createApp } from "vue";
import PrimeVue from "primevue/config";
import { createRouter, createMemoryHistory } from "vue-router";
import App from "./App.vue";
import "./App.css";
import Dashboard from "./views/Dashboard/index.vue";
import Analytics from "./views/Analytics.vue";
import Settings from "./views/Settings.vue";

// Create router instance
const createRouterInstance = (initialPath) => {
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [
      {
        path: "/",
        redirect: "/dashboard",
      },
      {
        path: "/dashboard",
        name: "Dashboard",
        component: Dashboard,
      },
      {
        path: "/analytics",
        name: "Analytics",
        component: Analytics,
      },
      {
        path: "/settings",
        name: "Settings",
        component: Settings,
      },
    ],
  });

  // Navigate to initial path if provided
  if (initialPath) {
    router.push(initialPath);
  }

  return router;
};

// Mount function to start up the app
const mount = (el, { initialPath } = {}) => {
  const app = createApp(App);
  const router = createRouterInstance(initialPath);

  // Add PrimeVue to the application
  app.use(PrimeVue, { ripple: true });
  // Add router to the application
  app.use(router);

  app.mount(el);

  // Return a cleanup function for proper unmounting
  return {
    unmount: () => {
      app.unmount();
    },
  };
};

// If we are in development and in isolation,
// call mount immediately
if (process.env.NODE_ENV === "development") {
  const devRoot = document.querySelector("#_dashboard-dev-root");

  if (devRoot) {
    mount(devRoot);
  }
}

// We are running through container
// and we should export the mount function
export { mount };
