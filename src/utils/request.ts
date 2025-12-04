import Taro from "@tarojs/taro";

const base_url = "https://itemshub-api.sidcloud.cn/";

const router = {
  index: base_url + "index",
  skin: {
    lts: base_url + "skin/lts",
  },
  market: {
    lts: base_url + "market/lts",
  },
  case: base_url + "case",
};

// ---- 统一封装请求（解决 fetch 在 tt 不存在的问题） ----
const request = async (url: string) => {
  // H5 下使用 fetch
  if (process.env.TARO_ENV === "h5") {
    const res = await fetch(url);
    return await res.json();
  }

  // 小程序端（weapp / tt / swan 等）使用 Taro.request
  const res = await Taro.request({
    url,
    method: "GET",
  });

  return res.data;
};

// ---- API ----
const api_index = async () => request(router.index);

const api_case = async () => request(router.case);

export { api_index, api_case };
