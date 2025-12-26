import React from "react";

interface UserInfoProps {
  name: string;
  email: string;
  phone: string;
  onChange: (field: "name" | "email" | "phone", value: string) => void;
}

const UserInfo = ({ name, email, phone, onChange }: UserInfoProps) => {
  return (
    <div className="space-y-4 w-full max-w-[400px]">
      {/* Name */}
      <div className="user-info w-full">
        <label className="block mb-2 text-gray-600 font-semibold">
          Name
        </label>
        <div className="flex items-center bg-white border border-gray-200 rounded-lg px-4 py-3">
          <input
            type="text"
            value={name}

            onChange={(e) => onChange("name", e.target.value)}
            className="w-full outline-none text-gray-700"
            placeholder="Enter name"
          />
        </div>
      </div>

      {/* Email */}
      <div className="user-info w-full">
        <label className="block mb-1 text-gray-600 font-semibold">
          Email
        </label>
        <div className="flex items-center bg-white border border-gray-200 rounded-lg px-4 py-3">
          <input
            type="email"
            value={email}
            onChange={(e) => onChange('email', e.target.value)}
            className="w-full outline-none text-gray-700"
            placeholder="Enter email"
          />
        </div>
      </div>

      {/* Phone */}
      <div className="user-info w-full">
        <label className="block mb-1 text-gray-600 font-semibold">
          Phone
        </label>
        <div className="flex items-center bg-white border border-gray-200 rounded-lg px-4 py-3">
          <span className="mr-2 text-gray-500 font-medium">+91</span>
          <input
            type="tel"
            value={phone}
            onChange={e => onChange("phone", e.target.value)}
            className="w-full outline-none text-gray-700"
            placeholder="Enter phone number"
            maxLength={10}
          />
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
