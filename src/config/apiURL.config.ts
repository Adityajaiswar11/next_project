/* ================= API URL ================= */
export const API_URL = {
  AUTH: {
    LOGIN: "verify/details",
    VERIFY: (key: string) => `verify/otp?k=${key}`,
    USER: "user",
  },

  PAYMENT: {
    CONTRIBUTE: (sip_cause: string, currency: string) =>
      `subscribe/contribute?currency=${currency}&origin=rfd&sip_cause=${sip_cause}`,
    OPTIONS: (
      currency: string,
      mobile_no: string,
      amount: number,
      is_mobile: number,
    ) =>
      `payment/options?currency=${currency}&mobile_no=${mobile_no}&recurring=1&amount=${amount}&is_mobile=${is_mobile}`,
    CART: (campaign: number) => `fundraisers/${campaign}/cart`,
    ORDER: (campaign: number) => `fundraisers/${campaign}/order`,
    SEND: `/payment/send`,
  },
};
