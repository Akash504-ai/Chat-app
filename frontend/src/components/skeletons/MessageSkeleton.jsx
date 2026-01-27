const MessageSkeleton = () => {
  const skeletonMessages = Array.from({ length: 6 });

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {skeletonMessages.map((_, idx) => (
        <div
          key={idx}
          className={`flex gap-3 ${idx % 2 === 0 ? "justify-start" : "justify-end"}`}
        >
          {idx % 2 === 0 && (
            <div className="h-10 w-10 rounded-full skeleton" />
          )}

          <div className="space-y-2">
            <div className="skeleton h-3 w-16" />
            <div
              className={`skeleton rounded-xl ${
                idx % 2 === 0
                  ? "w-[180px] sm:w-[260px]"
                  : "w-[160px] sm:w-[240px]"
              } h-14`}
            />
          </div>

          {idx % 2 !== 0 && (
            <div className="h-10 w-10 rounded-full skeleton" />
          )}
        </div>
      ))}
    </div>
  );
};

export default MessageSkeleton;