import { Stage, Lead, Message, Event } from './types';

export const stages: Stage[] = [
  { id: 'new', title: 'Novos Leads', order: 1, requiredFields: ['name', 'phone'] },
  { id: 'qualification', title: 'Qualificação', order: 2, requiredFields: ['cpf', 'niche'] },
  { id: 'scheduling', title: 'Agendamento', order: 3, requiredFields: [] },
  { id: 'negotiation', title: 'Negociação', order: 4, requiredFields: [] },
  { id: 'closed', title: 'Fechado', order: 5, requiredFields: [] },
  { id: 'lost', title: 'Perdido', order: 6, requiredFields: [] },
];

export const leads: Lead[] = [
  {
    id: '1',
    name: 'João Silva',
    phone: '11999999999',
    niche: 'Trabalhista',
    stageId: 'new',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Maria Oliveira',
    cpf: '123.456.789-00',
    phone: '11988888888',
    niche: 'Trabalhista',
    stageId: 'qualification',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Carlos Pereira',
    niche: 'Trabalhista',
    stageId: 'new', // Missing phone (required for 'new' but usually captured at start, let's say it's missing)
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '4',
    name: 'Ana Santos',
    phone: '11977777777',
    cpf: '111.222.333-44',
    niche: 'Trabalhista',
    stageId: 'negotiation',
    createdAt: new Date(Date.now() - 400000000).toISOString(),
    updatedAt: new Date().toISOString(),
    notes: 'Cliente muito interessada.',
  },
  {
    id: '5',
    name: 'Roberto Costa',
    phone: '11966666666',
    niche: 'Trabalhista',
    stageId: 'scheduling',
    createdAt: new Date(Date.now() - 200000000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '6',
    name: 'Lucia Lima',
    stageId: 'new',
    niche: 'Trabalhista',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '7',
    name: 'Pedro Alves',
    phone: '21999998888',
    stageId: 'lost',
    niche: 'Trabalhista',
    createdAt: new Date(Date.now() - 1000000000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '8',
    name: 'Fernanda Rocha',
    phone: '31999997777',
    cpf: '555.666.777-88',
    stageId: 'closed',
    niche: 'Trabalhista',
    createdAt: new Date(Date.now() - 500000000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const messages: Message[] = [
  { id: 'm1', leadId: '1', from: 'bot', text: 'Olá João, bem-vindo! Qual o seu telefone?', createdAt: new Date(Date.now() - 8000000).toISOString() },
  { id: 'm2', leadId: '1', from: 'client', text: 'É 11999999999', createdAt: new Date(Date.now() - 7000000).toISOString() },
  { id: 'm3', leadId: '2', from: 'agent', text: 'Maria, precisamos do seu CPF.', createdAt: new Date(Date.now() - 90000000).toISOString() },
  { id: 'm4', leadId: '2', from: 'client', text: 'Claro, é 123.456.789-00', createdAt: new Date(Date.now() - 80000000).toISOString() },
];

export const events: Event[] = [
  {
    id: 'e1',
    leadId: '5', // Roberto
    title: 'Consulta Inicial - Roberto',
    start: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
    end: new Date(Date.now() + 90000000).toISOString(),   // Tomorrow + 1h
  },
  {
    id: 'e2',
    title: 'Reunião de Equipe',
    start: new Date().toISOString(),
    end: new Date(Date.now() + 3600000).toISOString(),
  }
];

export const getLeadById = (id: string) => leads.find(l => l.id === id);
export const getMessagesByLead = (leadId: string) => messages.filter(m => m.leadId === leadId).sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
export const getStageById = (id: string) => stages.find(s => s.id === id);
export const getEvents = () => events;
