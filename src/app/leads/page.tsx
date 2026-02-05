'use client';

import { leads as initialLeads, stages } from '@/lib/mock';
import Link from 'next/link';
import { 
  Search, 
  Filter, 
  Plus, 
  MoreHorizontal, 
  Phone,
  MessageCircle,
  AlertCircle
} from 'lucide-react';

export default function LeadsPage() {
  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      {/* Header Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold text-foreground">Leads</h1>
          <div className="hidden md:flex items-center px-3 py-1 bg-muted rounded-full text-xs font-medium text-muted-foreground border border-border">
            <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
            Ativos: {initialLeads.length}
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Buscar lead..." 
              className="w-full pl-9 pr-4 py-2 bg-card border border-border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder-muted-foreground transition-all"
            />
          </div>
          
          <button className="p-2 bg-card border border-border rounded-lg hover:bg-muted transition-colors text-muted-foreground">
            <Filter className="w-5 h-5" />
          </button>

          <button className="flex items-center bg-blue-600 hover:bg-blue-500 text-white font-medium py-2 px-4 rounded-lg text-sm transition-all shadow-lg shadow-blue-900/20">
            <Plus className="w-4 h-4 mr-2" />
            Novo Lead
          </button>
        </div>
      </div>

      {/* Kanban Board Container */}
      <div className="flex-1 overflow-x-auto pb-4 custom-scrollbar">
        <div className="flex space-x-4 min-w-max h-full px-1">
          {stages.map((stage) => {
            const stageLeads = initialLeads.filter((l) => l.stageId === stage.id);
            const totalValue = stageLeads.length * 1500; // Mock calculation

            return (
              <div key={stage.id} className="w-80 flex flex-col h-full">
                {/* Column Header */}
                <div className="flex flex-col mb-3 bg-card border border-border rounded-t-xl border-b-4 border-b-blue-500 overflow-hidden">
                   <div className="p-3">
                      <div className="flex justify-between items-center mb-1">
                        <h3 className="font-bold text-foreground text-sm uppercase tracking-wide">{stage.title}</h3>
                        <MoreHorizontal className="w-4 h-4 text-muted-foreground cursor-pointer hover:text-foreground" />
                      </div>
                      <div className="flex justify-between items-end">
                         <span className="text-xs text-muted-foreground">{stageLeads.length} leads</span>
                         <span className="text-xs font-semibold text-foreground">R$ {totalValue.toLocaleString('pt-BR')}</span>
                      </div>
                   </div>
                </div>

                {/* Cards Container */}
                <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
                  {stageLeads.map((lead) => {
                     const missing = stage.requiredFields.filter(field => !lead[field as keyof typeof lead]);
                     const hasMissing = missing.length > 0;

                    return (
                      <Link href={`/leads/${lead.id}`} key={lead.id} className="block group">
                        <div className="bg-card p-4 rounded-xl shadow-sm border border-border group-hover:border-blue-500/50 transition-all cursor-pointer relative">
                          
                          {/* Top Tags/Date */}
                          <div className="flex justify-between items-start mb-3">
                             <span className="text-[10px] font-bold text-muted-foreground bg-muted px-2 py-0.5 rounded">
                               #{lead.id}
                             </span>
                             <span className="text-[10px] text-muted-foreground">
                               {new Date(lead.updatedAt).toLocaleDateString('pt-BR')}
                             </span>
                          </div>

                          {/* Avatar & Name */}
                          <div className="flex items-center mb-3">
                             <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
                                {lead.name.charAt(0)}
                             </div>
                             <div className="ml-3">
                                <h4 className="font-bold text-foreground text-sm leading-tight">{lead.name}</h4>
                                <p className="text-xs text-muted-foreground mt-0.5">{lead.niche}</p>
                             </div>
                          </div>
                          
                          {/* Actions / Status */}
                          <div className="flex items-center justify-between pt-3 border-t border-border mt-2">
                             <div className="flex space-x-2">
                               {lead.phone && <Phone className="w-4 h-4 text-muted-foreground hover:text-green-500 transition-colors" />}
                               <MessageCircle className="w-4 h-4 text-muted-foreground hover:text-blue-500 transition-colors" />
                             </div>
                             
                             {hasMissing ? (
                               <div className="flex items-center text-red-400 text-xs font-medium bg-red-500/10 px-2 py-1 rounded">
                                 <AlertCircle className="w-3 h-3 mr-1" />
                                 Dados
                               </div>
                             ) : (
                               <div className="w-2 h-2 rounded-full bg-green-500"></div>
                             )}
                          </div>

                        </div>
                      </Link>
                    );
                  })}
                  
                  {/* Empty State */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                     <button className="w-full py-2 border border-dashed border-border rounded-lg text-sm text-muted-foreground hover:text-foreground hover:border-slate-400 transition-all">
                       + Adicionar rápido
                     </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
