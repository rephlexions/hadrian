import { createApp } from "vue";
import App from "./App.vue";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/js/src/dropdown";
import "bootstrap-icons/font/bootstrap-icons.css";
import "@fortawesome/fontawesome-free";

const app = createApp(App);
app.mount("#app");
app.component("Table", Table);
app.component("AssetIntro", AssetIntro);
app.component("NavBar", NavBar);
