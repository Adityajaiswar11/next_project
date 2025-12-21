type ButtonLoaderProps = {
  loading: boolean;
  text?: string;
  loadingText?: string;
  onClick?: () => void;
  className?: string;
};

export const Button = ({
  loading,
  text = "Submit",
  loadingText = "Processing...",
  onClick,
  className = "",
}: ButtonLoaderProps) => {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition cursor-pointer
        ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}
        text-white ${className}`}
    >
      {loading && (
        <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
      )}
      {loading ? loadingText : text}
    </button>
  );
};
