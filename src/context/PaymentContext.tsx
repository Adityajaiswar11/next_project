"use client";

import { createContext, useContext, useState } from "react";
import { ICartConfig, IContributConfig } from "@/types/payment.types";
interface PaymentContextType {
	contributConfig: IContributConfig | null;
	cart: ICartConfig | null;
	paymentOptions: any;
	setPaymentOptions: (paymentOptions: any) => void;
	setContributConfig: (contributConfig: IContributConfig | null) => void;
	setCart: (cart: ICartConfig | null) => void;
}

const PaymentContext = createContext<PaymentContextType | null>(null);

export const PaymentProvider = ({ children }: { children: React.ReactNode }) => {
	const [contributConfig, setContributConfig] = useState<IContributConfig | null>(null);
	const [cart, setCart] = useState<ICartConfig | null>(null);
	const [paymentOptions, setPaymentOptions] = useState<any>(null);

	return (
		<PaymentContext.Provider
			value={{
				contributConfig,
				setContributConfig,
				cart,
				setCart,
				paymentOptions,
				setPaymentOptions,
			}}
		>
			{children}
		</PaymentContext.Provider>
	);
};

export const usePayment = () => {
	const ctx = useContext(PaymentContext);
	if (!ctx) throw new Error("usePayment must be used inside PaymentProvider");
	return ctx;
};

