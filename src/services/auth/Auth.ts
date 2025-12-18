import api from "@/lib/axios";
import { API_URL } from "@/config/apiURL.config";
import { ILogin } from "@/types/login";

export const userlogin = async (payload: ILogin) => {
  const response = await api.post(API_URL.LOGIN, payload);
  return response.data;
};