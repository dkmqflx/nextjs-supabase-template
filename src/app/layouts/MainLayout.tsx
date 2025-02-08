import { SidebarProvider } from '@/shared/ui/sidebar';
import { Header } from '@/widgets/layout/ui/Header';
import { AppSidebar } from '@/widgets/sidebar';

type MainLayoutProps = {
  children: React.ReactNode;
};

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <main className="flex-1">
        <Header />
        <SidebarProvider>
          <AppSidebar />
          {children}
        </SidebarProvider>
      </main>
    </div>
  );
}
