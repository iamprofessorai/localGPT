'use client';

import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarInset,
} from '@/components/ui/sidebar';
import { SidebarNav } from '@/components/layout/sidebar-nav';
import { Header } from '@/components/layout/header';
import { Button } from '@/components/ui/button';
import { Code2, LifeBuoy } from 'lucide-react';
import { BottomNav } from '@/components/layout/bottom-nav';
import { ModelProvider } from '@/context/model-context';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <ModelProvider>
      <SidebarProvider>
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center gap-2 px-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6 text-primary"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
              <h2 className="font-headline text-xl font-semibold tracking-tight">
                zeroLLM
              </h2>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarNav />
          </SidebarContent>
          <SidebarFooter>
            <div className="flex flex-col gap-1 p-2">
              <Button variant="ghost" className="justify-start gap-2">
                <Code2 />
                <span className="group-data-[collapsible=icon]:hidden">
                  API Docs
                </span>
              </Button>
              <Button variant="ghost" className="justify-start gap-2">
                <LifeBuoy />
                <span className="group-data-[collapsible=icon]:hidden">
                  Support
                </span>
              </Button>
            </div>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset>
          <Header />
          <main className="flex-1 p-4 pb-20 sm:p-6 md:pb-4">{children}</main>
          <BottomNav />
        </SidebarInset>
      </SidebarProvider>
    </ModelProvider>
  );
}
