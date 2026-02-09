import { Users } from "lucide-react";

const SidebarSkeleton = () => {
  const skeletonContacts = Array.from({ length: 8 });

  return (
    <aside
      className="h-full min-h-0 w-16 sm:w-20 lg:w-72
      border-r border-base-300
      flex flex-col bg-base-100
      transition-[width] duration-200 ease-in-out"
    >
      {/* HEADER */}
      <div className="border-b border-base-300 w-full p-3 sm:p-4 shrink-0">
        <div className="flex items-center justify-center lg:justify-start gap-2 min-w-0">
          <Users className="h-5 w-5 sm:h-6 sm:w-6 shrink-0" />
          <span className="hidden lg:block font-medium truncate">
            Contacts
          </span>
        </div>
      </div>

      {/* CONTACT SKELETON LIST */}
      <div className="flex-1 min-h-0 overflow-y-auto py-2 overscroll-contain">
        {skeletonContacts.map((_, idx) => (
          <div
            key={idx}
            className="flex items-center gap-3 px-2 sm:px-3 py-2 w-full"
          >
            {/* AVATAR */}
            <div className="mx-auto lg:mx-0 shrink-0">
              <div className="skeleton h-10 w-10 sm:h-11 sm:w-11 rounded-full" />
            </div>

            {/* TEXT */}
            <div className="hidden lg:block flex-1 min-w-0 space-y-2">
              <div className="skeleton h-4 w-36 max-w-full" />
              <div className="skeleton h-3 w-20 max-w-full" />
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default SidebarSkeleton;
