'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import { LanguageSwitch } from '@/features/layout';
import { ThemeToggle } from '@/features/theme/ui/ThemeToggle';
import { navItems } from '@/shared/constants/navItesm';
import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/shared/ui/sheet';
import { Menu } from 'lucide-react';

const Header = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const handleItemClick = () => {
    setOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>

          <SheetContent side="left" className="w-[240px] p-4" aria-describedby={undefined}>
            <SheetHeader>
              <SheetTitle>Navigation</SheetTitle>
            </SheetHeader>
            {navItems.map((item) => (
              <div key={item.url} className="mb-2">
                <Link href={item.url} onClick={handleItemClick}>
                  <div className={cn(pathname === item.url && 'font-bold', 'flex gap-2')}>{item.title}</div>
                </Link>
              </div>
            ))}
          </SheetContent>
        </Sheet>

        <div className="flex flex-1 items-center justify-end pr-2">
          <LanguageSwitch />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
