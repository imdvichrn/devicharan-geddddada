export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface StructuredAction {
  label: string;
  url: string;
  isInternal: boolean;
  category?: 'project' | 'contact' | 'cv' | 'social' | 'navigation';
}

export interface LanguageContext {
  detectedLanguage?: string;
  isMultilingual?: boolean;
}

export interface ConversationContext {
  messages: ChatMessage[];
  userPrompt: string;
  conversationHistory: ChatMessage[];
  systemInstruction: string;
  knowledgeBase: string;
  languageContext?: LanguageContext;
  taskType?: 'general' | 'fast' | 'complex';
  enableSearch?: boolean;
}

export interface StreamCallbacks {
  onChunk: (chunk: string) => void | Promise<void>;
  onDone: () => void | Promise<void>;
  onError: (err: any) => void | Promise<void>;
}

export interface AIProvider {
  readonly name: string;
  isAvailable(): Promise<boolean> | boolean;
  generate(context: ConversationContext): Promise<string>;
  stream(context: ConversationContext, callbacks: StreamCallbacks): Promise<boolean>;
}

export interface EngineProcessOptions {
  taskType?: 'general' | 'fast' | 'complex';
  modelPreference?: 'general' | 'fast' | 'complex';
  enableSearch?: boolean;
}
