export interface Stage {
  id: string;
  title: string;
  order: number;
  requiredFields: string[];
}

export interface Lead {
  id: string;
  name: string;
  cpf?: string;
  phone?: string;
  niche: string;
  stageId: string;
  createdAt: string;
  updatedAt: string;
  notes?: string;
}

export interface Message {
  id: string;
  leadId: string;
  from: 'client' | 'agent' | 'bot';
  text: string;
  createdAt: string;
}

export interface Event {
  id: string;
  leadId?: string;
  title: string;
  start: string; // ISO string
  end: string;   // ISO string
  notes?: string;
}
