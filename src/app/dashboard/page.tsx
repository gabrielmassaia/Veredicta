'use client';

import { 
  Users, 
  Search, 
  Settings, 
  ChevronDown,
  Instagram,
  MessageCircle,
  MoreHorizontal
} from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header Filter Bar */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-card border border-border p-2 rounded-xl shadow-sm">
        <div className="flex bg-muted/50 rounded-lg p-1">
          {['Hoje', 'Ontem', 'Semana', 'Mês'].map((filter, idx) => (
            <button 
              key={filter} 
              className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${idx === 3 ? 'bg-card shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            >
              {filter}
            </button>
          ))}
          <div className="px-4 py-1.5 text-sm font-medium text-foreground bg-blue-600/20 text-blue-400 rounded-md ml-1">
            01/07/2025 - 30/09/2025
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <button className="flex items-center space-x-2 px-4 py-2 bg-muted/50 hover:bg-muted border border-border rounded-lg text-sm font-medium transition-colors">
              <span>Selecionar usuário</span>
              <ChevronDown className="w-4 h-4 ml-2 opacity-50" />
            </button>
          </div>
          <button className="flex items-center px-4 py-2 hover:bg-muted rounded-lg border border-transparent hover:border-border transition-colors text-sm text-muted-foreground">
            <Settings className="w-4 h-4 mr-2" />
            Configurações
          </button>
        </div>
      </div>

      {/* Main KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Big Card */}
        <div className="md:col-span-1 lg:col-span-1 bg-card border border-border rounded-xl p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-50">
             <MoreHorizontal className="w-5 h-5 text-muted-foreground" />
          </div>
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Total de Leads</p>
          <div className="flex items-baseline mb-4">
            <span className="text-4xl font-black text-foreground">+1255</span>
            <span className="ml-2 text-xs font-bold text-green-500 bg-green-500/10 px-1.5 py-0.5 rounded">NOVO</span>
          </div>
          <div className="text-xs text-muted-foreground mt-4 pt-4 border-t border-border">
             <span className="text-red-400 font-medium">Perda</span> • 0 leads (R$ 0)
          </div>
        </div>

        {/* Funnel Flow Cards */}
        {[
          { title: 'LEADS DE ENTRADA', count: 0, val: 'R$0', diff: 0, color: 'text-gray-400' },
          { title: 'CONTATO INICIAL', count: 686, val: 'R$0', diff: '+20', diffVal: 'R$0', color: 'text-blue-400', isPositive: true },
          { title: 'QUALIFICADO', count: 448, val: 'R$0', diff: '-83', diffVal: '-R$3.600', color: 'text-yellow-400', isPositive: false },
        ].map((card, idx) => (
          <div key={idx} className="bg-card border border-border rounded-xl p-0 overflow-hidden flex flex-col">
            <div className="p-4 border-b border-border bg-muted/20">
              <h3 className="text-[10px] font-bold text-muted-foreground uppercase">{card.title}</h3>
              <p className="text-xs text-muted-foreground">{card.count} leads, {card.val}</p>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center p-6">
               <span className={`text-5xl font-light ${card.isPositive === true ? 'text-foreground' : card.isPositive === false ? 'text-red-400' : 'text-slate-600'}`}>
                 {card.diff || 0}
               </span>
               <span className="text-xs font-bold text-muted-foreground mt-1">{card.diffVal || 'R$0'}</span>
            </div>
            <div className="p-2 text-center border-t border-border bg-muted/20">
               <span className="text-[10px] font-bold text-muted-foreground">539 leads, R$1.500</span>
            </div>
          </div>
        ))}

         {/* Second Row */}
         {[
          { title: 'ENVIOU EXTRATO', count: 0, val: 'R$0', diff: 0, diffVal: 'R$0' },
          { title: 'FOLLOW-UP 1', count: 102, val: 'R$0', diff: '-18', diffVal: 'R$0', isPositive: false },
        ].map((card, idx) => (
          <div key={`r2-${idx}`} className="bg-card border border-border rounded-xl p-0 overflow-hidden flex flex-col">
            <div className="p-4 border-b border-border bg-muted/20">
              <h3 className="text-[10px] font-bold text-muted-foreground uppercase">{card.title}</h3>
              <p className="text-xs text-muted-foreground">{card.count} leads, {card.val}</p>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center p-6">
               <span className={`text-5xl font-light ${card.isPositive === false ? 'text-red-400' : 'text-slate-600'}`}>
                 {card.diff || 0}
               </span>
               <span className="text-xs font-bold text-muted-foreground mt-1">{card.diffVal || 'R$0'}</span>
            </div>
          </div>
        ))}

        {/* Big Value Cards */}
        <div className="col-span-1 bg-gradient-to-br from-slate-900 to-black border border-border rounded-xl p-6 relative">
          <p className="text-xs font-bold text-gray-400 uppercase">LEADS GANHOS</p>
          <p className="text-4xl font-bold text-white mt-2">247</p>
          <p className="text-sm text-green-400 font-medium">R$280.700</p>
          <div className="w-10 h-1 bg-green-500 mt-4 rounded-full"></div>
        </div>

        <div className="col-span-1 bg-card border border-border rounded-xl p-6">
           <div className="flex justify-between items-center mb-4">
             <h3 className="text-xs font-bold text-muted-foreground uppercase">Mensagens Recebidas</h3>
             <span className="text-2xl font-bold text-green-500">0</span>
           </div>
           
           <div className="space-y-4 mt-6">
             <div className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-pink-500 mr-2"></div>
                  <span className="text-muted-foreground">Instagram</span>
                </div>
                <span className="font-mono text-green-500">0</span>
             </div>
             <div className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-muted-foreground">WhatsApp Lite</span>
                </div>
                <span className="font-mono text-green-500">0</span>
             </div>
             <div className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                  <span className="text-muted-foreground">Bate-papo online</span>
                </div>
                <span className="font-mono text-green-500">0</span>
             </div>
           </div>
        </div>

      </div>
    </div>
  );
}
