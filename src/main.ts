import { createApp } from "vue";
import App from "./App.vue";
import {
  Form,
  Input,
  Checkbox,
  Table,
  Select,
  Radio,
  Button,
  Popover
} from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
const app = createApp(App);
app
  .use(Form)
  .use(Input)
  .use(Checkbox)
  .use(Table)
  .use(Select)
  .use(Radio)
  .use(Popover)
  .use(Button);
app.mount("#app");
