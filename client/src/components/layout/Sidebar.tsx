const Sidebar = ({ children }: { children: React.ReactNode }) => {
  return (
    <aside
      aria-label="User filters"
      className="w-full shrink-0 border-border md:w-[30%] md:border-r md:pr-4"
    >
      {children}
    </aside>
  );
};

export default Sidebar;
