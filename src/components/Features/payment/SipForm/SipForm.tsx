"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import SipSlab from "../components/Slab/SipSlab";
import UserInfo from "../components/UserForm/UserForm";
import SipButton from "../components/SipButton/SipButton";
import { usePayment } from "@/context/PaymentContext";
import { NotificationMessage } from "@/lib/toastMessage";
import { paymentService } from "@/services/payment/paymentService";
import { useLoader } from "@/context/LoaderContext";
import Loading from "@/components/Common/Loading/Loading";
import { getCurrency } from "@/utils/Helper";

const DEFAULT_AMOUNT = 500;

const SipForm = () => {
	// Navigation
	const router = useRouter();
	const searchParams = useSearchParams()
	const isPaymentStep = searchParams.get("page") === "op";

	// Context
	const { showLoader, hideLoader, loading } = useLoader();
	const { setContributConfig, contributConfig, setCart,cart,setPaymentOptions } = usePayment();

	// State
	const [amount, setAmount] = useState<number>(DEFAULT_AMOUNT);
	const [currency, setCurrency] = useState<string>(contributConfig?.currency || "INR");
	const [showOther, setShowOther] = useState(false);
	const [userInfo, setUserInfo] = useState({
		name: "aditya",
		email: "adityadswdwd@gmail.com",
		phone: "9123456789",
	});

	useEffect(()=>{
		async function fetchContributConfig(){
			showLoader();
			 try{
				 const res = await paymentService.getContribute('medical',currency)
				 setContributConfig(res)
				 setShowOther(false)
				 setAmount(res?.default_amount)
			 }catch(e:any){
				 console.log(e)
				 NotificationMessage(e?.message || "Failed to fetch contribute config", "error");
			 }finally{
				 hideLoader();
			}
		}
		fetchContributConfig()
	},[currency])

	/** Handlers */
	const handleOtherClick = useCallback(() => {
		setShowOther(true);
	}, []);

	const handleUserInfoChange = (name:string, value: string) => {
	  setUserInfo({
			...userInfo,
			[name]: value,
		})
		console.log(userInfo)
	};

	const checkValidation = () => {
		if (!amount) {
			NotificationMessage("Please select an amount", "error");
			return false;
		}
		// if (!userInfo.name || !userInfo.email || !userInfo.phone) {
		// 	NotificationMessage("Please fill all fields", "error");
		// 	return false;
		// }
		return true;
	}

	const handleSipSubmit = useCallback(async () => {
		if (!checkValidation()) return;

		showLoader();

		try {
			//Create Cart Payload
			const payload = {
				campaign_id: 996043,
				cause_amount: 1,
				currency,
				device: "desktop",
				donated_amount: amount + 4.7,
				donor_city: "Mumbai",
				donor_country: "India",
				donor_email: userInfo.email,
				donor_name: userInfo.name,
				donor_phone: userInfo.phone,
				donor_extension: "+91",
				tip_amount: 4.7,
				is_anonymous: 0,
				recurring: 1,
				sip_cause: [
					{
						sip_cause: contributConfig?.sip_cause,
						amount,
					},
				],
			};

			//Create Cart
			const cartRes = await paymentService.createCart(payload);
			const cartData = cartRes?.data?.cart
			if (!cartData) {
				NotificationMessage("Cart creation failed", "error");
				return;
			}
			setCart(cartData);
			//Fetching Payment Options
			const optionsRes = await paymentService.getPaymentOptions(
				cartData.currency,
				cartData.donor_phone,
				amount,
				1
			);
			setPaymentOptions(optionsRes)
			NotificationMessage("Cart created successfully", "success");

			//Navigate to payment step
			router.push("/sip?page=op");

		} catch (error: any) {
			NotificationMessage(
				error?.message || "Failed to create cart",
				"error"
			);
		} finally {
			hideLoader();
		}
	}, [
		amount,
		currency,
		userInfo,
		contributConfig,
		router,
		checkValidation,
		showLoader,
		hideLoader,
		setCart,
	]);


	const handleBack = useCallback(() => {
		router.back();
	}, [router]);

	/** Early return for payment step */
	if (isPaymentStep) {
		return (
			<div className="p-4">
				<button
					onClick={handleBack}
					className="text-sm text-blue-600 mb-4 cursor-pointer"
				>
					← Back
				</button>

				<div className="font-semibold text-lg">
					Payment options
				</div>
			</div>
		);
	}

	return (
		<div className="bg-cyan-50 w-full flex flex-col items-center  rounded-xl">
			{/* Header */}
			<div className="sip-header w-full text-center py-2 mb-4">
				<h1 className="text-[36px] font-bold text-gray-800 mb-2">
					Social Impact Plan
				</h1>
				<p className="text-gray-600 text-sm">
					Join our community of monthly contributors 
					providing <br/>urgent medical care to children
				</p>
			</div>

			{/* Slab */}
			{!isPaymentStep && <div className="sip-slab py-4 rounded-xl w-full max-w-[400px] mb-1">
				{loading 
				? <Loading />
				: 
				<SipSlab
				  currencyList={contributConfig?.supported_currency || []}
					slabs={contributConfig?.slabs || []}
					currency={currency|| "INR"}
					minAmount={contributConfig?.min_donation || 0}
					selectedAmount={amount}
					onChange={setAmount}
					showOther={showOther}
					onOtherClick={handleOtherClick}
					onCurrencyChange={setCurrency}
				/>}
			</div>}

			{/* User Info */}
			{ !isPaymentStep && <UserInfo
				name={userInfo.name}
				email={userInfo.email}
				phone={userInfo.phone}
				onChange={(name:string, value:string)=>handleUserInfoChange(name, value)}
			/>}

			{/* CTA */}
			<SipButton onClick={handleSipSubmit} label={loading ? "Loading..." :`Pledge ${getCurrency(currency)} ${amount} / Month`} />
		</div>
	);
};

export default SipForm;
