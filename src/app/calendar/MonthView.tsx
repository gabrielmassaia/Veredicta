export function MonthView({ events }: { events: any[] }) {
  const days = Array.from({ length: 35 }, (_, i) => i + 1); // Mock 35 days grid

  return (
    <div className="grid grid-cols-7 gap-px bg-border rounded-lg overflow-hidden border border-border">
      {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(day => (
        <div key={day} className="bg-muted/30 p-2 text-center text-xs font-semibold text-muted-foreground uppercase">
          {day}
        </div>
      ))}
      {days.map((day, idx) => {
        // Mock dates logic: start at 28 prev month, end at...
        // Simplified for MVP visual
        const isCurrentMonth = idx > 2 && idx < 33;
        const dayNum = idx > 2 && idx < 33 ? idx - 2 : (idx <= 2 ? 28 + idx : idx - 32);
        
        return (
          <div key={idx} className={`bg-card min-h-[100px] p-2 ${isCurrentMonth ? 'text-foreground' : 'text-muted-foreground bg-muted/10'}`}>
            <span className={`text-sm ${dayNum === 5 && isCurrentMonth ? 'bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center -ml-1.5 -mt-1.5' : ''}`}>
              {dayNum}
            </span>
            
            {/* Mock Events placement */}
            {isCurrentMonth && dayNum === 12 && (
              <div className="mt-1 text-[10px] bg-blue-500/20 text-blue-500 rounded px-1 py-0.5 truncate">
                Reunião Cliente
              </div>
            )}
            {isCurrentMonth && dayNum === 15 && (
               <div className="mt-1 text-[10px] bg-purple-500/20 text-purple-500 rounded px-1 py-0.5 truncate">
                Audiência
              </div>
            )}
             {isCurrentMonth && dayNum === 22 && (
               <div className="mt-1 text-[10px] bg-green-500/20 text-green-500 rounded px-1 py-0.5 truncate">
                Almoço
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
