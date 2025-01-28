import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { Suspense } from 'react';

import { SidebarProvider } from '@/shared/ui/sidebar';
import { Toaster } from '@/shared/ui/sonner';
import { AppSidebar } from '@/widgets/sidebar';

import '../globals.css';
import QueryErrorBoundary from '../providers/QueryErrorBoundary';
import QueryProvider from '../providers/QueryProvider';

const geistSans = localFont({
  src: '../fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: '../fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <QueryProvider>
          <QueryErrorBoundary>
            <Suspense>
              <SidebarProvider>
                <AppSidebar />
                {children}
                <Toaster richColors />
              </SidebarProvider>
            </Suspense>
          </QueryErrorBoundary>
        </QueryProvider>
      </body>
    </html>
  );
}
