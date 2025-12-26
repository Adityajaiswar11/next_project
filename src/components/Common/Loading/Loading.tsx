const Loading = () => {
  return (
    <div className="bg-cyan-50 p-4 rounded-xl max-w-[330px] h-[144px] animate-pulse">
      {/* Slab buttons shimmer */}
      <div className="flex gap-3 mb-4">
        {[1, 2, 3].map((item) => (
          <div key={item} className="flex-1 h-[44px] rounded-lg bg-gray-200" />
        ))}
      </div>

      {/* Input shimmer */}
      <div className="h-[48px] rounded-lg bg-gray-200" />
    </div>
  );
};

export default Loading;
