'use client';

import { 
  PlayCircle, 
  MessageSquare, 
  Bot, 
  CheckCircle2, 
  Circle, 
  ArrowRight, 
  Zap,
  HelpCircle,
  FileText,
  MessageCircle,
  Users
} from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
      {/* Left Column */}
      <div className="space-y-6 lg:col-span-1">
        {/* Tutorials Section */}
        <section className="bg-card border border-border rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-foreground mb-4">Tutoriais para iniciar</h2>
          <div className="flex justify-between gap-4">
            <div className="flex flex-col items-center text-center cursor-pointer group">
              <div className="w-12 h-12 rounded-full bg-blue-600/10 flex items-center justify-center text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-all">
                <Users className="w-6 h-6" />
              </div>
              <span className="text-xs font-medium text-muted-foreground mt-2 group-hover:text-foreground">Leads</span>
            </div>
            <div className="flex flex-col items-center text-center cursor-pointer group">
              <div className="w-12 h-12 rounded-full bg-green-600/10 flex items-center justify-center text-green-500 group-hover:bg-green-600 group-hover:text-white transition-all">
                <MessageSquare className="w-6 h-6" />
              </div>
              <span className="text-xs font-medium text-muted-foreground mt-2 group-hover:text-foreground">Inbox</span>
            </div>
            <div className="flex flex-col items-center text-center cursor-pointer group">
              <div className="w-12 h-12 rounded-full bg-purple-600/10 flex items-center justify-center text-purple-500 group-hover:bg-purple-600 group-hover:text-white transition-all">
                <Bot className="w-6 h-6" />
              </div>
              <span className="text-xs font-medium text-muted-foreground mt-2 group-hover:text-foreground">Bot</span>
            </div>
          </div>
        </section>

        {/* Quick Start Checklist */}
        <section className="bg-card border border-border rounded-xl p-6 shadow-sm flex-1">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold text-foreground">Checklist de Início Rápido</h2>
            <span className="text-xs font-bold text-blue-500">58%</span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 mb-6">
            <div className="bg-blue-600 h-2 rounded-full" style={{ width: '58%' }}></div>
          </div>

          <div className="space-y-4">
            {[
              { label: 'Conheça o sistema', done: true },
              { label: 'Conecte apps de chat', done: true },
              { label: 'Configure seu agente de IA', done: true },
              { label: 'Salve tempo com modelos', done: false },
              { label: 'Potencialize seu chat', done: true },
              { label: 'Crie um fluxo de trabalho', done: false },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center group cursor-pointer">
                {item.done ? (
                  <CheckCircle2 className="w-5 h-5 text-blue-500 mr-3" />
                ) : (
                  <Circle className="w-5 h-5 text-muted-foreground mr-3 group-hover:text-blue-500" />
                )}
                <span className={`text-sm ${item.done ? 'text-foreground line-through opacity-50' : 'text-foreground'}`}>
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Middle Column (Wider) */}
      <div className="lg:col-span-2 space-y-6">
        {/* Help Topics */}
        <section className="bg-card border border-border rounded-xl p-6 shadow-sm">
          <div className="flex space-x-6 border-b border-border pb-4 mb-6">
            <button className="text-sm font-semibold text-blue-500 border-b-2 border-blue-500 pb-4 -mb-4.5">Artigos</button>
            <button className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">FAQs</button>
            <button className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Vídeos</button>
          </div>

          <div className="grid gap-4">
            {[
              { icon: Zap, color: 'text-purple-500', bg: 'bg-purple-500/10', title: 'Trabalhe mais rápido com a IA ao seu lado', desc: 'Execute tarefas rotineiras com a ajuda do seu kit de ferramentas de IA' },
              { icon: MessageCircle, color: 'text-green-500', bg: 'bg-green-500/10', title: 'Como conectar o WhatsApp Business', desc: 'Conecte seu WhatsApp em poucos passos' },
              { icon: FileText, color: 'text-yellow-500', bg: 'bg-yellow-500/10', title: 'Impulsionar vendas em 5 passos', desc: 'Tenha resultados rápidos implementando 5 práticas' },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center p-4 rounded-lg hover:bg-muted/50 transition-colors border border-transparent hover:border-border cursor-pointer group">
                <div className={`w-10 h-10 rounded-lg ${item.bg} flex items-center justify-center mr-4 flex-shrink-0`}>
                  <item.icon className={`w-6 h-6 ${item.color}`} />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-foreground group-hover:text-blue-500 transition-colors">{item.title}</h4>
                  <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
        </section>

        {/* Promo/Advanced */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <div className="bg-gradient-to-br from-blue-900 to-slate-900 rounded-xl p-6 text-white border border-blue-800/50">
             <div className="flex justify-between items-start mb-4">
                <div>
                   <h3 className="font-bold text-lg">Plano Avançado</h3>
                   <p className="text-blue-200 text-xs">Dias restantes: 541</p>
                </div>
                <Users className="w-5 h-5 text-blue-300" />
             </div>
             <div className="space-y-2 mb-6 text-sm">
                <div className="flex justify-between">
                  <span className="text-blue-100/70">Leads</span>
                  <span className="font-mono">1,861 / 5,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-100/70">Espaço</span>
                  <span className="font-mono">Ilimitado</span>
                </div>
             </div>
             <button className="w-full bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold py-2 rounded-lg transition-colors">
               Gerenciar Plano
             </button>
           </div>

           <div className="bg-card border border-border rounded-xl p-6 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-foreground mb-2">Demo Pessoal</h3>
                <p className="text-sm text-muted-foreground">Agende uma demonstração personalizada com um especialista.</p>
              </div>
              <div className="mt-4 flex items-center p-3 bg-muted rounded-lg cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                 <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white font-bold mr-3">D</div>
                 <span className="text-sm font-medium">Agendar demo 1:1</span>
                 <ArrowRight className="w-4 h-4 ml-auto text-muted-foreground" />
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
