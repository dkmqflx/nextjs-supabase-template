import { SidebarProvider } from '@/shared/ui/sidebar';
import { AppSidebar } from '@/widgets/sidebar';

const MainLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      {children}
    </SidebarProvider>
  );
};

export default MainLayout;
