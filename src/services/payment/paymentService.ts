import { API_URL } from "@/config/apiURL.config";
import api from "@/lib/axios";

class PaymentService {
  async getContribute(currency: string, sip_cause: string) {
    try {
      const response = await api.get(
        API_URL.PAYMENT.CONTRIBUTE(currency, sip_cause),
      );
      if (response.status === 200) {
        const data = response.data?.data?.data;
        return data;
      }
      throw new Error("Unexpected response");
    } catch (error: any) {
      throw new Error(
        error?.response?.data?.message || "Failed to fetch payment options",
      );
    }
  }

  async createCart(formdata: any) {
    const payload = {
      ...formdata,
    };
    try {
      const response = await api.post(API_URL.PAYMENT.CART(996043), payload);
      if (response.status === 200) {
        const data = response.data;
        return data;
      }
      throw new Error("Unexpected response");
    } catch (error: any) {
      throw new Error(
        error?.response?.data?.message || "Failed to fetch payment options",
      );
    }
  }

  async getPaymentOptions(currency: string, mobile_no: string, amount: number, is_mobile: number) {
    try {
      const response = await api.get(
        API_URL.PAYMENT.OPTIONS(currency, mobile_no, amount, is_mobile),
      );
      if (response.status === 200) {
        const data = response.data;
        return data;
      }
      throw new Error("Unexpected response");
    } catch (error: any) {
      throw new Error(
        error?.response?.data?.message || "Failed to fetch payment options",
      );
    }
  }
}

export const paymentService = new PaymentService();
