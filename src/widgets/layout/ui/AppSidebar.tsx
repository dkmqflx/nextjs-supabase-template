'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { navItems } from '@/shared/constants/navItesm';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/shared/ui/sidebar';
import { ChevronDown } from 'lucide-react';

const AppSidebar = () => {
  const pathname = usePathname() ?? '/';

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">Template</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <React.Fragment key={item.url}>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname === item.url || pathname.startsWith(item.url + '/')}>
                      {!!item.url ? (
                        <Link href={item.url} className="flex w-full items-center justify-between">
                          {item.title}
                          {item.items && <ChevronDown className="h-4 w-4" />}
                        </Link>
                      ) : (
                        <div className="flex w-full items-center justify-between">{item.title}</div>
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  {item.items && (
                    <div className="ml-4">
                      {item.items.map((subItem) => (
                        <SidebarMenuItem key={subItem.url}>
                          <SidebarMenuButton asChild isActive={pathname === subItem.url}>
                            <Link href={subItem.url}>{subItem.title}</Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </div>
                  )}
                </React.Fragment>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
