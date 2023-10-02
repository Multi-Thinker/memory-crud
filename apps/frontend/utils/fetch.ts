import type { AxiosRequestConfig, AxiosResponse } from "axios";
import axios from "axios";

export const fetch = (
  url: string,
  opts: AxiosRequestConfig
): Promise<AxiosResponse> => {
  return axios(url, opts);
};
