'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Paperclip, Send, Loader2, AlertTriangle } from 'lucide-react';
import React, { useState, useRef, useEffect } from 'react';
import { useModel } from '@/context/model-context';
import { continueChat } from '@/ai/flows/chat';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface Message {
  role: 'user' | 'model' | 'error';
  content: string;
}

export default function DashboardPage() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', content: 'Hello! How can I help you today? Select a model provider and connect from the header to get started.' },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { provider, isConnected, endpoint, selectedModel } = useModel();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    if (!isConnected) {
      toast({
        variant: 'destructive',
        title: 'Not Connected',
        description: 'Please connect to a model provider first.',
      });
      return;
    }

    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      let aiResponse = '';
      if (provider === 'gemini') {
        const history = messages.filter(m => m.role !== 'error').map(({role, content}) => ({role, content}));
        aiResponse = await continueChat({ history, prompt: input });
      } else { // local provider
        const response = await fetch(`${endpoint}/v1/chat/completions`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            model: selectedModel,
            messages: [...messages.filter(m => m.role !== 'error'), userMessage].map(m => ({role: m.role, content: m.content})),
            stream: false,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData?.error?.message || `Request failed with status ${response.status}`);
        }
        
        const data = await response.json();
        aiResponse = data.choices[0].message.content;
      }
      setMessages((prev) => [...prev, { role: 'model', content: aiResponse }]);

    } catch (error: any) {
      const errorMessage = error.message || 'An unexpected error occurred.';
      setMessages((prev) => [...prev, { role: 'error', content: errorMessage }]);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="flex h-[calc(100vh-8rem)] flex-col">
      <Card className="flex-1 flex flex-col">
        <CardHeader>
          <CardTitle>Chat</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col gap-4 overflow-hidden">
          <div className="flex-1 space-y-4 overflow-y-auto rounded-lg border p-4">
            {messages.map((message, index) => (
              <ChatMessage key={index} author={message.role}>
                {message.content}
              </ChatMessage>
            ))}
             <div ref={messagesEndRef} />
          </div>
          <form onSubmit={handleSubmit} className="relative">
            <Textarea
              placeholder="Type your message here..."
              className="min-h-[80px] resize-none pr-28"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e as any);
                }
              }}
              disabled={isLoading}
            />
            <div className="absolute bottom-2 right-2 flex items-center gap-2">
              <Button variant="ghost" size="icon" type="button" disabled={isLoading}>
                <Paperclip className="h-5 w-5" />
              </Button>
              <Button size="icon" type="submit" disabled={isLoading || !input.trim()}>
                {isLoading ? <Loader2 className="animate-spin" /> : <Send className="h-5 w-5" />}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

function ChatMessage({
  author,
  children,
}: {
  author: 'model' | 'user' | 'error';
  children: React.ReactNode;
}) {
  const isUser = author === 'user';
  const isError = author === 'error';

  return (
    <div className={cn('flex items-start gap-3', isUser && 'justify-end')}>
      {!isUser && (
        <Avatar className="h-9 w-9 border">
          <AvatarFallback>{isError ? <AlertTriangle className="text-destructive" /> : 'AI'}</AvatarFallback>
        </Avatar>
      )}
      <div
        className={cn(
          'max-w-md rounded-lg p-3 text-sm leading-relaxed',
          isUser && 'bg-primary text-primary-foreground',
          !isUser && !isError && 'bg-secondary',
          isError && 'bg-destructive/10 border border-destructive/20 text-destructive'
        )}
      >
       {children}
      </div>
      {isUser && (
        <Avatar className="h-9 w-9 border">
          <AvatarImage
            src="https://picsum.photos/seed/10/100/100"
            alt="User Avatar"
          />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
