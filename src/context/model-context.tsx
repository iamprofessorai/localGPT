'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

type ProviderType = 'local' | 'gemini';

interface ModelContextType {
  provider: ProviderType;
  setProvider: (provider: ProviderType) => void;
  endpoint: string;
  setEndpoint: (endpoint: string) => void;
  selectedModel: string;
  setSelectedModel: (model: string) => void;
  isConnected: boolean;
  setIsConnected: (isConnected: boolean) => void;
  isConnecting: boolean;
  setIsConnecting: (isConnecting: boolean) => void;
}

const ModelContext = createContext<ModelContextType | undefined>(undefined);

export function ModelProvider({ children }: { children: ReactNode }) {
  const [provider, setProvider] = useState<ProviderType>('local');
  const [endpoint, setEndpoint] = useState('http://localhost:11434');
  const [selectedModel, setSelectedModel] = useState('gemma-2-9b');
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  const value = {
    provider,
    setProvider,
    endpoint,
    setEndpoint,
    selectedModel,
    setSelectedModel,
    isConnected,
    setIsConnected,
    isConnecting,
    setIsConnecting,
  };

  return <ModelContext.Provider value={value}>{children}</ModelContext.Provider>;
}

export function useModel() {
  const context = useContext(ModelContext);
  if (context === undefined) {
    throw new Error('useModel must be used within a ModelProvider');
  }
  return context;
}
