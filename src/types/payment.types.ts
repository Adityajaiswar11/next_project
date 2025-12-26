export interface Campaign {
  type?: number;
  id?: number;
  title?: string;
  event_entity_details_id?: number;
  entity_details_id?: number;
  creator_entity_details_id?: number;
  cause_id?: number;
  parent_cause_id?: number;
  ngo_priority?: number;
  status_flag?: number;
  creation_date?: string;
  custom_tag?: string;
  ketto_commission?: string;
  amount_requested?: number;
  display_type_self?: string;
  end_date?: string;
}

export interface IContributConfig {
  slabs?: number[];
  campaign?: Campaign;
  default_amount?: 200;
  supported_currency?: SupportedCurrency[];
  sip_cause?: string;
  is_anonymous?: number;
  min_donation: number;
  mandate_fee: number;
  currency?: string;
}

export type SupportedCurrency =
  | "INR"
  | "USD"
  | "GBP"
  | "EUR"
  | "AED"
  | "SGD"
  | "SAR"
  | "CAD"
  | "HKD"
  | "QAR"
  | "AUD"
  | "MYR";

export interface ICartConfig {
  id: number;
  campaign_id: number;
  currency: string;
  device: "desktop" | "mobile" | "tablet";
  donated_amount: number;
  donated_amount_inr: number;
  donor_city: string;
  donor_country: string;
  donor_email: string;
  donor_entity_details_id: number;
  donor_extension: string;
  donor_name: string;
  donor_phone: string;
  is_anonymous: 0 | 1;
  recurring: boolean;
  status_flag: number;
  tip_amount: string; // backend sends as string "4.70"
  tip_amount_inr: number;
}

