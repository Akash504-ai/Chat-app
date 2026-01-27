import { Users } from "lucide-react";

const SidebarSkeleton = () => {
  const skeletonContacts = Array.from({ length: 8 });

  return (
    <aside
      className="h-full w-20 lg:w-72 border-r border-base-300
      flex flex-col transition-all duration-200 bg-base-100"
    >
      {/* Header */}
      <div className="border-b border-base-300 w-full p-4">
        <div className="flex items-center gap-2 justify-center lg:justify-start">
          <Users className="h-6 w-6" />
          <span className="hidden lg:block font-medium">Contacts</span>
        </div>
      </div>

      {/* Skeleton Contacts */}
      <div className="flex-1 overflow-y-auto py-2">
        {skeletonContacts.map((_, idx) => (
          <div
            key={idx}
            className="flex items-center gap-3 px-3 py-2"
          >
            <div className="mx-auto lg:mx-0">
              <div className="skeleton h-11 w-11 rounded-full" />
            </div>

            <div className="hidden lg:block flex-1 space-y-2">
              <div className="skeleton h-4 w-36" />
              <div className="skeleton h-3 w-20" />
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default SidebarSkeleton;