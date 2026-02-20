import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Paperclip, Send, Settings, Save } from 'lucide-react';
import React from 'react';

export default function DashboardPage() {
  return (
    <div className="grid h-[calc(100vh-6rem)] grid-cols-1 gap-6 lg:grid-cols-4">
      <div className="flex flex-col lg:col-span-3">
        <div className="flex-1 space-y-6 overflow-auto rounded-lg border p-4">
          <ChatMessage author="AI">
            Hello! I am an AI assistant from zeroLLM. How can I help you today?
          </ChatMessage>
          <ChatMessage author="User">
            Can you explain what a Large Language Model is in simple terms?
          </ChatMessage>
          <ChatMessage author="AI">
            Of course! Imagine a very, very smart student who has read almost every book, article, and website in the world. This student is so good at understanding language that you can ask them a question, and they can write a detailed answer, summarize a long story, or even write a poem for you. That's essentially what a Large Language Model (LLM) is. It's an AI trained on a massive amount of text data to understand and generate human-like text.
          </ChatMessage>
        </div>
        <div className="mt-4">
          <Card>
            <CardContent className="p-4">
              <div className="relative">
                <Textarea
                  placeholder="Type your message here..."
                  className="min-h-[100px] resize-none pr-28"
                />
                <div className="absolute bottom-2 right-2 flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <Paperclip className="h-5 w-5" />
                  </Button>
                  <Button size="icon">
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="hidden lg:block">
        <Card className="h-full">
          <CardHeader className='flex-row items-center justify-between'>
            <h3 className="font-headline text-lg font-semibold">
              Configuration
            </h3>
            <Button variant="ghost" size="icon">
              <Save className="h-5 w-5" />
              <span className="sr-only">Save Preset</span>
            </Button>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="model">Model</Label>
              <Select defaultValue="gpt-4-omni">
                <SelectTrigger id="model">
                  <SelectValue placeholder="Select a model" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gpt-4-omni">GPT-4 Omni</SelectItem>
                  <SelectItem value="claude-3-opus">Claude 3 Opus</SelectItem>
                  <SelectItem value="llama-3-70b">Llama 3 70B</SelectItem>
                  <SelectItem value="gemma-2-9b">Gemma 2 9B</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-4">
              <Label htmlFor="temperature">Temperature: 0.7</Label>
              <Slider
                id="temperature"
                defaultValue={[0.7]}
                max={1}
                step={0.1}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="max-tokens">Max Tokens</Label>
              <Input id="max-tokens" placeholder="e.g. 2048" defaultValue="4096" />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="streaming">Streaming</Label>
              <Switch id="streaming" defaultChecked />
            </div>
          </CardContent>
          <CardFooter className="flex-col items-start gap-4">
            <Label className='text-muted-foreground'>System Prompt</Label>
             <Textarea
                placeholder="You are a helpful assistant."
                className="h-32 resize-none"
             />
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

function ChatMessage({
  author,
  children,
}: {
  author: 'AI' | 'User';
  children: React.ReactNode;
}) {
  const isAI = author === 'AI';
  return (
    <div className={`flex items-start gap-3 ${!isAI && 'justify-end'}`}>
      {isAI && (
        <Avatar className="h-9 w-9 border">
          <AvatarFallback>AI</AvatarFallback>
        </Avatar>
      )}
      <div
        className={`max-w-xl rounded-lg p-3 ${
          isAI
            ? 'bg-secondary'
            : 'bg-primary text-primary-foreground'
        }`}
      >
        <p className="text-sm leading-relaxed">{children}</p>
      </div>
      {!isAI && (
        <Avatar className="h-9 w-9 border">
          <AvatarImage src="https://picsum.photos/seed/10/100/100" alt="User Avatar" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
