import axios from "axios";
import { Message, MessageBox } from "element-ui";
import { STATUS_CODE } from "../constants/index.js";
import router from "@/router";
import GlobalLoading from "@/components/Loading/Loading.js";
export async function axiosWarpInstance(url, data, options) {
  const {
    type = "get",
    customize = false,
    apiLoading = false,
    ...props
  } = options;
  const methodTemp = type.toLowerCase();
  let getData = data;
  if (customize) {
    const res = await axiosInstance({
      method: methodTemp,
      url,
      apiLoading,
      data,
      ...props,
    });
    return res;
  }

  if (
    !!window.MSInputMethodContext &&
    !!document.documentMode &&
    methodTemp === "get"
  ) {
    getData = { ...data, t: new Date().valueOf() };
  } // 解决ie get请求缓存

  if (
    methodTemp === "get" ||
    methodTemp === "delete" ||
    methodTemp === "head"
  ) {
    const res = await axiosInstance[methodTemp](url, {
      params: getData,
      apiLoading,
      ...props,
    });
    return res;
  }

  if (methodTemp === "post" || methodTemp === "patch" || methodTemp === "put") {
    const res = await axiosInstance[methodTemp](url, data, {
      apiLoading,
      ...props,
    });
    return res;
  }
}

const handleError = (response = { config: { showError: {} } }) => {
  const {
    config: { showError = {} },
    data,
    message,
  } = response;
  const { isShow, showPopup, title, onOk } = showError;
  if (isShow) {
    if (showPopup) {
      MessageBox.alert(data?.message, title, {
        confirmButtonText: "确定",
        callback: () => {
          if (typeof onOk === "function") {
            onOk();
          }
        },
      });
    } else {
      if (
        data?.code === STATUS_CODE.UNAUTHENTICATED ||
        response?.status === STATUS_CODE.UNAUTHENTICATED
      ) {
        router.push("/login");
        return;
      }
      // ErrorCode: ${code}, Error Name: ${name},
      Message.error(
        data?.message ||
          data?.msg ||
          data?.Message ||
          ` ErrorCode: ${data?.code}, Error Message: ${message}`
      );
      // 比如：接口code:100500 接口异常拒绝向下执行逻辑
      return Promise.reject(data?.message || data?.msg || data?.Message);
    }
  }

  return Promise.reject(data);
};

const axiosInstance = axios.create({
  // 当创建实例的时候配置默认配置
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 1000 * 60 * 3,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Authorization: "bearer " + null,
    "X-Requested-With": "XMLHttpRequest",
  },
  xsrfCookieName: "Ag-Csrf-Token",
  xsrfHeaderName: "Ag-Csrf-Token",
});

// 添加请求拦截器
axiosInstance.interceptors.request.use(
  (config) => {
    const defaultShowError = {
      isShow: true,
      showPopup: false,
      title: "",
    };
    if (config.isFormData) {
      config.headers["Content-Type"] = "application/x-www-form-urlencoded";
    }

    const instanceShowError = config.showError;

    config.showError = Object.assign(defaultShowError, instanceShowError);

    const { apiLoading } = config;

    if (apiLoading) {
      GlobalLoading.loadingShow();
    }

    return config;
  },
  (err) => {
    handleError(err.request);
  }
);

// 添加一个响应拦截器
axiosInstance.interceptors.response.use(
  (response) => {
    const { data, config } = response;
    if (config.skipGlobalHandler && !data.code) {
      // 接口直接返回 正常数据格式
      GlobalLoading.loadingClose();
      return Promise.resolve(data);
    }
    // 1.成功
    if (data.code === STATUS_CODE.SUCCESS) {
      GlobalLoading.loadingClose();
      return Promise.resolve(data.response);
    }

    // 2.session过期
    if (
      data.code === STATUS_CODE.UNAUTHENTICATED ||
      response?.status === STATUS_CODE.UNAUTHENTICATED
    ) {
      // 重新登录
      GlobalLoading.loadingClose();
      router.push("/login"); // 或者 window.location.href = '/login'
      return Promise.reject(data);
    }

    GlobalLoading.loadingClose();
    // 4.其他失败，比如校验不通过等
    return handleError(response);
  },

  // 5.系统错误，比如500、404等
  (error) => {
    GlobalLoading.loadingClose();
    handleError(error);
  }
);

export default axiosInstance;
