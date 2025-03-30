import { ThemeToggle } from '@/components/theme/theme-toggle';
import React from 'react';
import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { DynamicBreadcrumb } from '../dynamic-breadcrumb';
import { Combobox } from "../combobox";
import { dashboardConfig } from '@/config/dashboard';


export default function DashboardHeader() {
  return (
    <header className='flex h-16 shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 px-2'>
      <div className='flex items-center gap-2'>
        <SidebarTrigger/>
        <Separator orientation='vertical'/>
        <DynamicBreadcrumb />
      </div>

      <div className='ml-auto flex items-center gap-2'>
          <Combobox data={dashboardConfig.sidebarNav} className='hidden md:flex'/>
        <ThemeToggle />
      </div>
    </header>
  );
}