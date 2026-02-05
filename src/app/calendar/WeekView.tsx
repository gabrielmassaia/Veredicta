export function WeekView() {
  const hours = Array.from({ length: 13 }, (_, i) => i + 8); // 8am to 8pm

  return (
    <div className="flex flex-col h-full overflow-y-auto custom-scrollbar border border-border rounded-lg bg-card text-foreground">
      <div className="flex border-b border-border sticky top-0 bg-card z-10">
        <div className="w-16 border-r border-border"></div>
        {['Seg 12', 'Ter 13', 'Qua 14', 'Qui 15', 'Sex 16', 'Sáb 17', 'Dom 18'].map(day => (
           <div key={day} className="flex-1 text-center py-2 text-sm font-semibold border-r border-border last:border-0">
             {day}
           </div>
        ))}
      </div>
      
      {hours.map(hour => (
        <div key={hour} className="flex min-h-[60px] border-b border-border">
          <div className="w-16 text-xs text-muted-foreground text-center py-2 border-r border-border">
            {hour}:00
          </div>
          {/* Days Columns */}
          {[0,1,2,3,4,5,6].map(col => (
             <div key={col} className="flex-1 border-r border-border last:border-0 relative hover:bg-muted/10 cursor-pointer">
                {col === 2 && hour === 14 && (
                  <div className="absolute inset-1 bg-blue-500/20 border-l-2 border-blue-500 rounded p-1 text-[10px] text-blue-200">
                     <span className="font-bold">Reunião</span>
                     <br/>14:00 - 15:00
                  </div>
                )}
             </div>
          ))}
        </div>
      ))}
    </div>
  );
}
