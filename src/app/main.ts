import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import "../style.css";

import {
  create,
  NButton,
  NCard,
  NLayout,
  NLayoutContent,
  NIcon,
  NGrid,
  NGridItem,
  NProgress,
  NText,
  NEmpty,
  NSwitch,
  NSpin,
  NSpace,
} from "naive-ui";

const naive = create({
  components: [
    NButton,
    NCard,
    NLayout,
    NLayoutContent,
    NIcon,
    NGrid,
    NGridItem,
    NProgress,
    NText,
    NEmpty,
    NSwitch,
    NSpin,
    NSpace,
  ],
});

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(naive);

app.mount("#app");
