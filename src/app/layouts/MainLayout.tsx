import { SidebarProvider } from '@/shared/ui/sidebar';
import { AppSidebar, Header } from '@/widgets/layout';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="flex-1">
        <Header />
        <main className="max-w-screen-xl">{children}</main>
      </div>
    </SidebarProvider>
  );
}
