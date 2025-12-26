import { getCurrency } from "@/utils/Helper";
import React from "react";

interface SipSlabProps {
  slabs: number[];
  minAmount: number;
  selectedAmount: number;
  showOther: boolean;
  currencyList:string[];
  currency:string;
  onChange: (amount: number) => void;
  onOtherClick: () => void;
  onCurrencyChange: (currency: string) => void;
}

const SipSlab = ({
  slabs,
  selectedAmount,
  showOther,
  minAmount,
  currency,
  currencyList,
  onChange,
  onOtherClick,
  onCurrencyChange
}: SipSlabProps) => {
  return (
    <div className="">
      {/* Slab buttons */}
      <div className="flex gap-3 mb-4">
        {slabs.map(amount => {
          const isActive = selectedAmount === amount;

          return (
            <button
              key={amount}
              type="button"
              onClick={() => onChange(amount)}
              className={`flex-1 rounded-lg px-4 py-3 text-sm font-semibold transition cursor-pointer
                ${isActive
                  ? "bg-teal-600 text-white"
                  : "bg-white text-gray-500 border border-gray-200"
                }`}
            >
              {getCurrency(currency)} {amount}/mo
            </button>
          );
        })}
      </div>

      {/* Custom amount input */}
      {!showOther && <div onClick={onOtherClick} className="flex items-center justify-center bg-white border border-gray-200 rounded-lg px-4 py-3 cursor-pointer">
        <div>Other</div>
      </div>}

      {showOther && <div className="flex items-center bg-white border border-gray-200 rounded-lg px-4 py-3">
        <select 
        name="currency" 
        onChange={e => onCurrencyChange(e.target.value)} 
        className="text-gray-700 cursor-pointer text-sm  outline-none"
        >
          {currencyList?.map(cur => (
            <option key={cur} value={cur} selected={currency === cur}>
             {getCurrency(cur)}
            </option>
          ))}
        </select>
        <input
          type="number"
          min={100}
          value={selectedAmount === 0 ? "" : selectedAmount}
          onChange={e => onChange(Number(e.target.value))}
          className="w-full outline-none text-gray-700 cursor-pointer ml-4"
          placeholder="Enter amount"
        />
      </div>}
      {selectedAmount < minAmount && <span className="text-red-500 text-[12px]">Please enter a value greater than or equal to ₹100</span>}
    </div>
  );
};

export default SipSlab;
