import { API_URL } from "@/config/apiURL.config";
import api from "@/lib/axios";
import { ILogin } from "@/types/user.types";

// export const userlogin = async (payload: ILogin) => {
//   const response = await api.post(API_URL.LOGIN, payload);
//   return response.data;
// };

// export const verifyOtp = async (key: string) => {
//   const response = await api.get(API_URL.VERIFY(key));
//   return response.data;
// };
