import { Loading } from "element-ui";

const options = {
  target: document.querySelector(".content"),
  lock: true,
  text: "Loading",
  spinner: "el-icon-loading",
  background: "rgba(0, 0, 0, 0.7)",
  fullscreen: false,
};

let loading = null;
const loadingShow = () => {
  loading = Loading.service(options);
};

const loadingClose = () => {
  loading && loading.close();
};

const GlobalLoading = {
  loadingShow,
  loadingClose,
};

export default GlobalLoading;
