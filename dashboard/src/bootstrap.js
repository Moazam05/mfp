import { createApp } from "vue";
import PrimeVue from "primevue/config";
import {
  createRouter,
  createWebHistory,
  createMemoryHistory,
} from "vue-router";
import App from "./App.vue";
import "./App.css";
import Dashboard from "./views/Dashboard/index.vue";
import Analytics from "./views/Analytics/index.vue";
import Settings from "./views/Settings/index.vue";

// Create router instance with appropriate history based on environment
const createRouterInstance = (
  initialPath,
  { isChild = false, basePath = "" } = {}
) => {
  // Use memory history when running as a child app, web history when standalone
  const history = isChild ? createMemoryHistory() : createWebHistory(basePath);

  const routes = [
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
  ];

  const router = createRouter({
    history,
    routes,
  });

  // Navigate to initial path if provided
  if (initialPath) {
    router.push(initialPath);
  }

  return router;
};

// Mount function to start up the app
const mount = (
  el,
  { initialPath, isChild = false, onNavigate = () => {}, basePath = "" } = {}
) => {
  const app = createApp(App);
  const router = createRouterInstance(initialPath, { isChild, basePath });

  // Add event listener for route changes to notify parent if we're a child app
  if (isChild && onNavigate) {
    router.afterEach((to) => {
      onNavigate(to.fullPath);
    });
  }

  // Add PrimeVue to the application
  app.use(PrimeVue, { ripple: true });
  // Add router to the application
  app.use(router);

  app.mount(el);

  // Return router and cleanup function for parent app to control navigation
  return {
    router,
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
    mount(devRoot, { isChild: false });
  }
}

// We are running through container
// and we should export the mount function
export { mount };
