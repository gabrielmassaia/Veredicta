'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, Calendar, Home, Menu, UserCircle } from 'lucide-react';
import { useState } from 'react';

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
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Desktop & Tablet */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-20 lg:w-64 transform transition-all duration-300 ease-in-out shadow-xl border-r
        bg-white border-gray-200 text-slate-700
        dark:bg-[#0f111a] dark:border-slate-800 dark:text-white
        lg:static lg:inset-auto hover:w-64 group/sidebar
        ${isSidebarOpen ? 'translate-x-0 w-64' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex items-center justify-center h-16 border-b bg-gray-50/50 border-gray-200 dark:bg-[#0b0d14] dark:border-slate-800/50 transition-colors">
          <div className="flex items-center space-x-2 overflow-hidden px-4">
            <div className="w-8 h-8 min-w-[2rem] bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white shadow-lg shadow-blue-500/20">
              A
            </div>
            <h1 className="text-lg font-bold tracking-wide text-gray-900 dark:text-gray-100 opacity-0 lg:opacity-100 group-hover/sidebar:opacity-100 transition-opacity duration-300 whitespace-nowrap">
              ADVOCACIA
            </h1>
          </div>
        </div>
        
        <nav className="mt-6 px-3 space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsSidebarOpen(false)}
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
                <span className={`ml-3 font-medium text-sm whitespace-nowrap opacity-0 lg:opacity-100 group-hover/sidebar:opacity-100 transition-opacity duration-300`}>
                  {item.label}
                </span>
                
                {/* Active Indicator for collapsed state */}
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-blue-600 rounded-r-full lg:hidden block"></div>
                )}
              </Link>
            );
          })}
        </nav>
        
        <div className="absolute bottom-0 w-full p-4 border-t bg-gray-50/50 border-gray-200 dark:bg-[#0b0d14] dark:border-slate-800/50 transition-colors">
          <div className="flex items-center text-slate-400 overflow-hidden">
            <div className="w-10 h-10 min-w-[2.5rem] rounded-full bg-white border border-gray-200 flex items-center justify-center dark:bg-slate-800 dark:border-slate-700">
               <UserCircle className="w-6 h-6 text-slate-400 dark:text-slate-300" />
            </div>
            <div className="ml-3 text-sm opacity-0 lg:opacity-100 group-hover/sidebar:opacity-100 transition-opacity duration-300 whitespace-nowrap">
              <p className="text-gray-900 font-medium truncate dark:text-slate-200">Dr. Advogado</p>
              <p className="text-gray-500 text-xs dark:text-slate-500">OAB/SP 123.456</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 bg-background transition-colors duration-300">
        {/* Header */}
        <header className="bg-card border-b border-border h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8 shadow-sm">
          <div className="flex items-center">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 -ml-2 rounded-md text-slate-500 hover:text-slate-700 hover:bg-slate-100 focus:outline-none dark:hover:bg-slate-800 dark:hover:text-slate-200"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h2 className="text-xl font-bold text-foreground ml-2 lg:ml-0 tracking-tight">{getTitle()}</h2>
          </div>
          
          <div className="flex items-center space-x-4">
             <div className="hidden md:flex items-center px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-xs font-semibold rounded-full border border-blue-100 dark:border-blue-800">
               <span className="w-2 h-2 rounded-full bg-blue-500 mr-2 animate-pulse"></span>
               Sistema Online
             </div>
             {/* Future: Notifications, Dark mode toggle button could go here */}
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
