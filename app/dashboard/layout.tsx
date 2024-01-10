const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col gap-4">
      <nav className="bg-black text-white">This is nav bar</nav>
      {children}
    </div>
  );
};

export default DashboardLayout;
