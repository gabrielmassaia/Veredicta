'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, Calendar, Home, Menu, UserCircle } from 'lucide-react';
import { useState } from 'react';
import { ThemeToggle } from './ThemeToggle';

export function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const getTitle = () => {
    if (pathname === '/') return 'Início';
    if (pathname === '/dashboard') return 'Painel';
    if (pathname.startsWith('/leads')) return 'Leads';
    if (pathname === '/calendar') return 'Calendário';
    return 'Advocacia CRM';
  };

  const navItems = [
    { href: '/', label: 'Início', icon: Home },
    { href: '/dashboard', label: 'Painel', icon: LayoutDashboard },
    { href: '/leads', label: 'Leads', icon: Users },
    { href: '/calendar', label: 'Calendário', icon: Calendar },
  ];

  if (pathname === '/login') {
    return <main>{children}</main>;
  }

  return (
    <div className="flex h-screen bg-background text-foreground font-sans overflow-hidden">
      {/* Sidebar - Desktop Only */}
      <aside className={`
        hidden lg:flex flex-col fixed inset-y-0 left-0 z-50 transform transition-all duration-300 ease-in-out shadow-xl border-r
        bg-white border-gray-200 text-slate-700
        dark:bg-[#0f111a] dark:border-slate-800 dark:text-white
        
        /* Desktop: static, default 20 width (icons), hover to 64 */
        static w-20 hover:w-64 group/sidebar
      `}>
        <div className="flex items-center justify-center h-16 border-b bg-gray-50/50 border-gray-200 dark:bg-[#0b0d14] dark:border-slate-800/50 transition-colors px-4 overflow-hidden whitespace-nowrap">
          <div className="flex items-center space-x-2 min-w-max">
            <div className="w-8 h-8 min-w-[2rem] bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white shadow-lg shadow-blue-500/20">
              A
            </div>
            <h1 className={`
              text-lg font-bold tracking-wide text-gray-900 dark:text-gray-100 
              transition-opacity duration-300 whitespace-nowrap
              opacity-0 group-hover/sidebar:opacity-100
            `}>
              ADVOCACIA
            </h1>
          </div>
        </div>
        
        <nav className="mt-6 px-3 space-y-2 flex-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  flex items-center px-3 py-3 rounded-xl transition-all duration-200 relative group
                  ${isActive 
                    ? 'bg-blue-50 text-blue-700 dark:bg-blue-600 dark:text-white shadow-sm' 
                    : 'text-slate-500 hover:bg-gray-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/50 dark:hover:text-slate-100'
                  }
                `}
                title={item.label}
              >
                <item.icon className={`w-6 h-6 min-w-[1.5rem] transition-colors ${isActive ? 'text-blue-700 dark:text-white' : 'text-slate-400 group-hover:text-slate-600 dark:text-slate-500 dark:group-hover:text-slate-200'}`} />
                <span className={`
                  ml-3 font-medium text-sm whitespace-nowrap transition-opacity duration-300
                  opacity-0 group-hover/sidebar:opacity-100
                `}>
                  {item.label}
                </span>
                
                {/* Active Indicator */}
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-blue-600 rounded-r-full block"></div>
                )}
              </Link>
            );
          })}
        </nav>
        
        <div className="p-4 border-t bg-gray-50/50 border-gray-200 dark:bg-[#0b0d14] dark:border-slate-800/50 transition-colors overflow-hidden whitespace-nowrap">
          <div className="flex items-center text-slate-400 min-w-max">
            <div className="w-10 h-10 min-w-[2.5rem] rounded-full bg-white border border-gray-200 flex items-center justify-center dark:bg-slate-800 dark:border-slate-700">
               <UserCircle className="w-6 h-6 text-slate-400 dark:text-slate-300" />
            </div>
            <div className={`
              ml-3 text-sm transition-opacity duration-300 whitespace-nowrap
              opacity-0 group-hover/sidebar:opacity-100
            `}>
              <p className="text-gray-900 font-medium truncate dark:text-slate-200">Dr. Advogado</p>
              <p className="text-gray-500 text-xs dark:text-slate-500">OAB/SP 123.456</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-white dark:bg-[#0f111a] border-t border-gray-200 dark:border-slate-800 z-50 flex items-center justify-around px-2 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
        {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  flex flex-col items-center justify-center w-16 h-full space-y-1
                  ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-500 dark:text-slate-400'}
                `}
              >
                <div className={`p-1.5 rounded-xl transition-colors ${isActive ? 'bg-blue-50 dark:bg-blue-900/20' : ''}`}>
                  <item.icon className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-medium">{item.label}</span>
              </Link>
            );
        })}
        {/* Mobile Profile Link */}
        <div className="flex flex-col items-center justify-center w-16 h-full space-y-1 text-slate-500 dark:text-slate-400">
           <div className="p-1.5">
             <UserCircle className="w-6 h-6" />
           </div>
           <span className="text-[10px] font-medium">Perfil</span>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 bg-background transition-colors duration-300">

        {/* Header */}
        <header className="bg-card border-b border-border h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8 shadow-sm">
          <div className="flex items-center">
            <h2 className="text-xl font-bold text-foreground tracking-tight">{getTitle()}</h2>
          </div>
          
          <div className="flex items-center space-x-4">
             <div className="hidden md:flex items-center px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-xs font-semibold rounded-full border border-blue-100 dark:border-blue-800">
               <span className="w-2 h-2 rounded-full bg-blue-500 mr-2 animate-pulse"></span>
               Sistema Online
             </div>
             <ThemeToggle />
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8 bg-background custom-scrollbar">
          <div className="max-w-7xl mx-auto h-full">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
