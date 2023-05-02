import { createApp } from 'vue'
import App from './App.vue'
import router from "./router";
import "bootstrap/dist/css/bootstrap.css";
import "jquery/dist/jquery.min";
import "popper.js/dist/popper.min";
import "bootstrap/dist/js/bootstrap.min";
import 'mdb-vue-ui-kit/css/mdb.min.css'; 
import "mdb-vue-ui-kit/js/mdb.es.min";
// import "mdb-vue-ui-kit/js/mdb.umd.min.js";
createApp(App).mount('#app')

const app = createApp(App);
//use vue router
app.use(router);
app.mount("#app");