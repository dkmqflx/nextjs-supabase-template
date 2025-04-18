import { SidebarProvider } from '@/shared/ui/sidebar';
import { AppSidebar, Header } from '@/widgets/layout';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <Header />
        {children}
      </main>
    </SidebarProvider>
  );
}
