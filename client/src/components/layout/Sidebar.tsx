const Sidebar = ({ children }: { children: React.ReactNode }) => {
  return (
    <aside
      aria-label="User filters"
      className="relative z-10 w-full max-h-[40vh] shrink-0 overflow-y-auto border-border md:max-h-none md:w-[30%] md:overflow-visible md:border-r md:pr-4"
    >
      {children}
    </aside>
  );
};

export default Sidebar;
