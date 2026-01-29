const MessageSkeleton = () => {
  const skeletonMessages = Array.from({ length: 6 });

  return (
    <div className="flex-1 overflow-y-auto px-2 sm:px-4 py-3 space-y-3 sm:space-y-4">
      {skeletonMessages.map((_, idx) => (
        <div
          key={idx}
          className={`flex items-end gap-2 sm:gap-3 ${
            idx % 2 === 0 ? "justify-start" : "justify-end"
          }`}
        >
          {idx % 2 === 0 && (
            <div className="h-7 w-7 sm:h-9 sm:w-9 md:h-10 md:w-10 rounded-full skeleton" />
          )}

          <div className="flex flex-col space-y-1 sm:space-y-2 w-full max-w-[90%] sm:max-w-[75%] lg:max-w-[65%]">
            <div className="skeleton h-3 w-12 sm:w-16" />
            <div
              className={`skeleton rounded-xl h-11 sm:h-14 ${
                idx % 2 === 0 ? "w-[85%]" : "w-[75%] ml-auto"
              }`}
            />
          </div>

          {idx % 2 !== 0 && (
            <div className="h-7 w-7 sm:h-9 sm:w-9 md:h-10 md:w-10 rounded-full skeleton" />
          )}
        </div>
      ))}
    </div>
  );
};

export default MessageSkeleton;