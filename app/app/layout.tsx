export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="bg-gradient-to-br from-l_f_s to-l_f_f min-h-screen ">
      {children}
    </main>
  );
}
