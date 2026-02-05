'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { 
  getLeadById, 
  getMessagesByLead, 
  getStageById, 
  stages, 
  leads as allLeads 
} from '@/lib/mock';
import type { Lead, Message } from '@/lib/types';
import { 
  ArrowLeft, 
  Send, 
  CheckCircle, 
  AlertTriangle, 
  Calendar, 
  User,
  Search,
  Filter,
  MoreVertical,
  Phone,
  Mic,
  Paperclip,
  Smile,
  Check,
  CheckCheck,
  Play,
  Pause
} from 'lucide-react';
import Link from 'next/link';

export default function LeadDetailPage() {
  const params = useParams();
  const router = useRouter();
  const leadId = params.leadId as string;

  const [lead, setLead] = useState<Lead | undefined>();
  const [leadList, setLeadList] = useState<Lead[]>(allLeads);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'details' | 'notes'>('details');

  // Load Data
  useEffect(() => {
    if (leadId) {
      const foundLead = getLeadById(leadId);
      if (foundLead) {
        setLead(foundLead);
        setMessages(getMessagesByLead(leadId));
      } else {
         // Fallback if not found mock
      }
      setLoading(false);
    }
  }, [leadId]);

  if (loading) return <div className="p-8 text-foreground">Carregando interface...</div>;
  if (!lead) return <div className="p-8 text-foreground">Lead não encontrado.</div>;

  const currentStage = getStageById(lead.stageId);
  const nextStage = stages.find(s => s.order === (currentStage?.order || 0) + 1);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    
    const msg: Message = {
      id: Date.now().toString(),
      leadId: lead.id,
      from: 'agent',
      text: newMessage,
      createdAt: new Date().toISOString()
    };
    
    setMessages([...messages, msg]);
    setNewMessage('');
  };

  const handleMoveStage = () => {
    if (!nextStage) return;
    setLead({ ...lead, stageId: nextStage.id });
    
    // System msg
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      leadId: lead.id,
      from: 'bot',
      text: `Lead movido para etapa: ${nextStage.title}`,
      createdAt: new Date().toISOString()
    }]);
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] -m-4 sm:-m-6 lg:-m-8 bg-background">
      
      {/* LEFT SIDEBAR: INBOX LIST (Hidden on mobile if chat open) */}
      <div className="w-full md:w-80 border-r border-border bg-card flex flex-col hidden md:flex">
        <div className="p-4 border-b border-border bg-muted/30">
           <div className="relative mb-3">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
             <input 
               type="text" 
               placeholder="Buscar conversas..." 
               className="w-full pl-9 pr-4 py-2 bg-background border border-border rounded-lg text-sm focus:ring-1 focus:ring-blue-500 focus:outline-none"
             />
           </div>
           <div className="flex justify-between items-center text-xs text-muted-foreground">
              <span>Conversas abertas</span>
              <span className="bg-blue-500/10 text-blue-500 px-1.5 py-0.5 rounded font-bold">{leadList.length}</span>
           </div>
        </div>
        
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {leadList.map((l) => (
             <div 
               key={l.id} 
               onClick={() => router.push(`/leads/${l.id}`)}
               className={`p-4 border-b border-border hover:bg-muted/50 cursor-pointer transition-colors ${l.id === leadId ? 'bg-blue-500/5 hover:bg-blue-500/5 border-l-4 border-l-blue-500' : 'border-l-4 border-l-transparent'}`}
             >
                <div className="flex justify-between mb-1">
                   <h4 className={`text-sm font-bold ${l.id === leadId ? 'text-foreground' : 'text-muted-foreground'}`}>{l.name}</h4>
                   <span className="text-[10px] text-muted-foreground">18:22</span>
                </div>
                <div className="flex justify-between items-center">
                   <p className="text-xs text-muted-foreground truncate max-w-[180px]">Última interação do cliente...</p>
                   {l.stageId === 'new' && <span className="w-2 h-2 bg-blue-500 rounded-full"></span>}
                </div>
             </div>
          ))}
        </div>
      </div>

      {/* CENTER: CHAT INTERFACE */}
      <div className="flex-1 flex flex-col min-w-0 bg-slate-900/50 relative">
        <div className="bg-card px-4 py-3 border-b border-border flex justify-between items-center shadow-sm z-10">
           <div className="flex items-center">
              <Link href="/leads" className="md:hidden mr-3 text-muted-foreground">
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-white font-bold mr-3 shadow-sm">
                 {lead.name.charAt(0)}
              </div>
              <div>
                 <h2 className="font-bold text-foreground text-sm">{lead.name}</h2>
                 <div className="flex items-center text-xs text-blue-500">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5 animate-pulse"></span>
                    Online agora
                 </div>
              </div>
           </div>
           
           <div className="flex items-center space-x-4 text-muted-foreground">
              <Phone className="w-5 h-5 hover:text-foreground cursor-pointer" />
              <Search className="w-5 h-5 hover:text-foreground cursor-pointer" />
              <MoreVertical className="w-5 h-5 hover:text-foreground cursor-pointer" />
           </div>
        </div>

        {/* Messages Layout */}
        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar space-y-4 bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')] bg-repeat bg-[length:400px]">
           {messages.map((msg) => {
             const isMe = msg.from === 'agent';
             const isBot = msg.from === 'bot';
             
             return (
               <div key={msg.id} className={`flex w-full ${isMe ? 'justify-end' : 'justify-start'}`}>
                  <div className={`
                    relative max-w-[85%] md:max-w-[70%] text-sm rounded-lg p-3 shadow-sm
                    ${isBot 
                       ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 text-center w-full max-w-lg mx-auto border border-yellow-200 dark:border-yellow-800' 
                       : isMe 
                         ? 'bg-blue-600 text-white rounded-tr-none' 
                         : 'bg-white dark:bg-slate-800 text-foreground rounded-tl-none border border-border'}
                  `}>
                    {!isBot && isMe && <span className="absolute top-0 right-0 -mr-2 -mt-0 w-0 h-0 border-[6px] border-transparent border-t-blue-600 border-l-blue-600 transform rotate-45"></span>}
                    
                    {isBot && <p className="text-xs font-bold mb-1 opacity-70 uppercase tracking-wider">🤖 Sales Bot</p>}
                    
                    <p className="leading-relaxed">{msg.text}</p>
                    
                    <div className={`flex items-center justify-end mt-1 text-[10px] space-x-1 ${isMe ? 'text-blue-100' : 'text-muted-foreground'}`}>
                       <span>{new Date(msg.createdAt).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}</span>
                       {isMe && <CheckCheck className="w-3 h-3" />}
                    </div>
                  </div>
               </div>
             );
           })}
           
           {/* Mock Audio Message */}
           <div className="flex w-full justify-start">
              <div className="bg-white dark:bg-slate-800 text-foreground rounded-lg rounded-tl-none border border-border p-3 shadow-sm flex items-center min-w-[280px]">
                 <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3 text-white">
                    <Play className="w-4 h-4 ml-0.5" />
                 </div>
                 <div className="flex-1">
                    <div className="h-1 bg-slate-200 dark:bg-slate-700 rounded-full w-full mb-1 overflow-hidden">
                       <div className="h-full bg-blue-500 w-1/3"></div>
                    </div>
                    <div className="flex justify-between text-[10px] text-muted-foreground">
                       <span>0:14</span>
                       <span>0:42</span>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* Input Area */}
        <div className="bg-card border-t border-border p-3">
           <form onSubmit={handleSendMessage} className="flex items-end gap-2">
              <button type="button" className="p-2 text-muted-foreground hover:text-foreground transition-colors">
                <Smile className="w-6 h-6" />
              </button>
              <button type="button" className="p-2 text-muted-foreground hover:text-foreground transition-colors">
                <Paperclip className="w-6 h-6" />
              </button>
              
              <div className="flex-1 bg-background border border-border rounded-xl flex items-center px-4 py-2 focus-within:ring-1 focus-within:ring-blue-500 transition-all">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Mensagem..."
                  className="flex-1 bg-transparent border-none focus:ring-0 text-foreground placeholder-muted-foreground"
                />
              </div>

              {newMessage.trim() ? (
                <button type="submit" className="p-3 bg-blue-600 hover:bg-blue-500 text-white rounded-full shadow-lg transition-transform hover:scale-105">
                  <Send className="w-5 h-5 ml-0.5" />
                </button>
              ) : (
                <button type="button" className="p-3 bg-card border border-border text-muted-foreground rounded-full hover:bg-muted transition-colors">
                  <Mic className="w-5 h-5" />
                </button>
              )}
           </form>
        </div>
      </div>

      {/* RIGHT SIDEBAR: CRM DETAILS */}
      <div className="w-full md:w-80 lg:w-96 bg-card border-l border-border flex flex-col hidden lg:flex">
         {/* Tabs */}
         <div className="flex border-b border-border">
            <button 
              onClick={() => setActiveTab('details')}
              className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'details' ? 'border-blue-500 text-foreground' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
            >
              Principal
            </button>
            <button 
              onClick={() => setActiveTab('notes')}
               className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'notes' ? 'border-blue-500 text-foreground' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
            >
              Notas & Tarefas
            </button>
         </div>

         <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
            {/* Lead Header */}
            <div className="text-center">
               <div className="w-20 h-20 mx-auto bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg mb-3">
                 {lead.name.charAt(0)}
               </div>
               <h2 className="text-xl font-bold text-foreground">{lead.name}</h2>
               <div className="flex justify-center mt-2">
                 <span className="px-3 py-1 bg-blue-500/10 text-blue-500 rounded-full text-xs font-bold border border-blue-500/20 uppercase tracking-wide">
                   {currentStage?.title}
                 </span>
               </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3">
               <button className="flex flex-col items-center justify-center p-3 border border-border rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
                  <Phone className="w-5 h-5 mb-1" />
                  <span className="text-xs">Ligar</span>
               </button>
               <button className="flex flex-col items-center justify-center p-3 border border-border rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
                  <Calendar className="w-5 h-5 mb-1" />
                  <span className="text-xs">Agendar</span>
               </button>
            </div>
            
             {/* Deal Value */}
            <div className="bg-muted/30 p-4 rounded-xl border border-border">
               <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold mb-1">Valor Potencial</p>
               <div className="flex items-center justify-between">
                  <span className="text-2xl font-light text-foreground">R$ 4.500</span>
                  <button className="text-xs text-blue-500 hover:underline">Editar</button>
               </div>
            </div>

            {/* Fields */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-muted-foreground uppercase border-b border-border pb-2">Informações</h3>
              
              <div>
                 <label className="text-xs text-muted-foreground block mb-1">Telefone / WhatsApp</label>
                 <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground">{lead.phone || '-'}</span>
                    <Phone className="w-3 h-3 text-muted-foreground" />
                 </div>
              </div>

               <div>
                 <label className="text-xs text-muted-foreground block mb-1">CPF</label>
                 <span className="text-sm text-foreground">{lead.cpf || '-'}</span>
              </div>

               <div>
                 <label className="text-xs text-muted-foreground block mb-1">Nicho</label>
                 <div className="flex items-center gap-2">
                    <span className="text-sm text-foreground bg-purple-500/10 text-purple-500 px-2 py-0.5 rounded">{lead.niche}</span>
                 </div>
              </div>
            </div>

            {/* Stage Mover */}
            {nextStage && (
               <div className="mt-8 pt-4 border-t border-border">
                  <button 
                    onClick={handleMoveStage}
                    className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-3 rounded-lg shadow-lg shadow-green-900/20 transition-all flex items-center justify-center"
                  >
                    Mover para {nextStage.title}
                    <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
                  </button>
               </div>
            )}
         </div>
      </div>

    </div>
  );
}
