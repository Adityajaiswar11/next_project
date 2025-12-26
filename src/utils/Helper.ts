import { CURRENCY_SYMBOL_MAP } from "@/constants/Constant";

export const getCurrency = (currency: string) => {
  return CURRENCY_SYMBOL_MAP[currency || "INR"];
};
