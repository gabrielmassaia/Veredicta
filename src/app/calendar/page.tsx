'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Plus } from 'lucide-react';
import { MonthView } from './MonthView';
import { WeekView } from './WeekView';

export default function CalendarPage() {
  const [view, setView] = useState<'month' | 'week' | 'day' | 'year'>('month');

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      {/* Calendar Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-foreground">Agenda</h1>
          <div className="flex items-center bg-card border border-border rounded-lg p-1">
             <button className="p-1 hover:bg-muted rounded"><ChevronLeft className="w-5 h-5 text-muted-foreground" /></button>
             <span className="px-4 font-medium text-foreground min-w-[140px] text-center">Agosto 2025</span>
             <button className="p-1 hover:bg-muted rounded"><ChevronRight className="w-5 h-5 text-muted-foreground" /></button>
          </div>
        </div>

        <div className="flex items-center gap-4">
           {/* View Switcher */}
           <div className="flex bg-muted p-1 rounded-lg">
             {['year', 'month', 'week', 'day'].map((v) => (
               <button
                 key={v}
                 onClick={() => setView(v as any)}
                 className={`
                   px-3 py-1.5 text-sm font-medium rounded capitalize transition-all
                   ${view === v ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}
                 `}
               >
                 {v === 'year' ? 'Ano' : v === 'month' ? 'Mês' : v === 'week' ? 'Semana' : 'Dia'}
               </button>
             ))}
           </div>
           
           <button className="bg-blue-600 hover:bg-blue-500 text-white font-medium py-2 px-4 rounded-lg flex items-center shadow-lg shadow-blue-900/20">
             <Plus className="w-4 h-4 mr-2" />
             Evento
           </button>
        </div>
      </div>

      {/* Calendar View Container */}
      <div className="flex-1 bg-card border border-border rounded-xl p-4 shadow-sm overflow-hidden">
         {view === 'month' && <MonthView events={[]} />}
         {view === 'week' && <WeekView />}
         
         {view === 'day' && (
           <div className="h-full flex flex-col items-center justify-center text-muted-foreground">
              <CalendarIcon className="w-12 h-12 mb-4 opacity-20" />
              <p>Visualização de Dia (Simulação)</p>
           </div>
         )}
         {view === 'year' && (
           <div className="grid grid-cols-4 gap-4 h-full overflow-auto custom-scrollbar">
              {Array.from({length: 12}, (_, i) => (
                <div key={i} className="border border-border p-2 rounded aspect-square flex items-center justify-center text-muted-foreground bg-muted/10">
                   {new Date(0, i).toLocaleString('default', { month: 'long' })}
                </div>
              ))}
           </div>
         )}
      </div>
    </div>
  );
}
