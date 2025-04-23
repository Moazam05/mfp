import { createApp } from "vue";
import PrimeVue from "primevue/config";
import App from "./App.vue";
import "./App.css";

// Mount function to start up the app
const mount = (el) => {
  const app = createApp(App);

  // Add PrimeVue to the application
  app.use(PrimeVue, { ripple: true });

  app.mount(el);

  // Return a cleanup function for proper unmounting
  return () => {
    app.unmount();
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
