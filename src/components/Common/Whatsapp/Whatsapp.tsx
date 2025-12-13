'use client'

const WhatsAppButton = () => {
  const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919152187470";
  console.log(phoneNumber);
  const message = "Hello.";
  const encodedMessage = encodeURIComponent(message);

  const handleClick = () => {
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, "_blank");
  };

  return (
    <button
      onClick={handleClick}
      className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-lg flex items-center gap-2"
    >
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
        alt="WhatsApp"
        className="w-5 h-5"
      />
      Chat on WhatsApp
    </button>
  );
};

export default WhatsAppButton;