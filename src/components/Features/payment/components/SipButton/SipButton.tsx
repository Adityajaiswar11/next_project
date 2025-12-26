import React from "react";

interface SipButtonProps {
	label: string;
	onClick: () => void;
	disabled?: boolean;
}

const SipButton = ({
	label,
	onClick,
	disabled = false,
}: SipButtonProps) => {
	return (
		<button
			type="button"
			onClick={onClick}
			disabled={disabled}
			className={`w-full max-w-[400px] mt-4 py-3 rounded-xl font-semibold transition cursor-pointer
        ${disabled
					? "bg-gray-300 text-gray-500 cursor-not-allowed"
					: "bg-teal-600 text-white hover:bg-teal-700"
				}`}
		>
			{label}
		</button>
	);
};

export default SipButton;
