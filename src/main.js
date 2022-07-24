import {createApp} from 'vue'
import Antd from 'ant-design-vue';
import App from './App.vue';
import 'ant-design-vue/dist/antd.css';
import {FastCrud} from "@fast-crud/fast-crud";
import "@fast-crud/fast-crud/dist/style.css";
import ui from "@fast-crud/ui-antdv";
const app = createApp(App);
app.use(Antd);
app.use(ui);
app.use(FastCrud);

app.mount('#app');
