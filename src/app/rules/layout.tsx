import Sidebar from "@/components/sidebar";

export default function RulesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto flex max-w-7xl">
      <Sidebar />
      <div className="min-w-0 flex-1 px-4 py-8 md:px-8 lg:px-12">
        {children}
      </div>
    </div>
  );
}
