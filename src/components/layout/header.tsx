'use client';

import { usePathname } from 'next/navigation';
import {
  Bot,
  Code2,
  LifeBuoy,
  LogOut,
  Settings2,
  User,
  Globe,
  Plug,
  History,
  Loader2,
  XCircle,
} from 'lucide-react';
import React from 'react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { useModel } from '@/context/model-context';

export function Header() {
  const pathname = usePathname();
  const segment = pathname.split('/').filter(Boolean).pop() || 'dashboard';
  const title = segment.charAt(0).toUpperCase() + segment.slice(1);
  const { toast } = useToast();

  const {
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
  } = useModel();

  async function handleConnect() {
    if (!endpoint && provider === 'local') {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Please enter a valid endpoint URL.',
      });
      return;
    }

    setIsConnecting(true);
    setIsConnected(false);

    if (provider === 'gemini') {
      // For Gemini, we assume connection is handled by Genkit backend
      // So we can just show it as connected.
      setTimeout(() => {
        setIsConnected(true);
        toast({
          title: 'Success',
          description: 'Gemini provider selected. Ready to chat.',
        });
        setIsConnecting(false);
      }, 500);
      return;
    }

    // Actual connection for 'local'
    try {
      // Use /v1/models as a health check for OpenAI-compatible servers
      const modelsUrl = new URL('/v1/models', endpoint).toString();
      const response = await fetch(modelsUrl);

      if (response.ok) {
        setIsConnected(true);
        toast({
          title: 'Success',
          description: `Successfully connected to ${endpoint}.`,
        });
      } else {
        throw new Error(`Server responded with status: ${response.status}`);
      }
    } catch (error) {
      console.error('Connection failed:', error);
      toast({
        variant: 'destructive',
        title: 'Connection Failed',
        description:
          'Could not connect. Ensure the server is running and CORS is enabled.',
      });
      setIsConnected(false);
    } finally {
      setIsConnecting(false);
    }
  }

  function handleDisconnect() {
    setIsConnected(false);
    toast({
      title: 'Disconnected',
      description: 'Connection has been closed.',
    });
  }

  function handleProviderChange(value: string) {
    setProvider(value as 'local' | 'gemini');
    setIsConnected(false); // Disconnect when switching provider
    setSelectedModel(value === 'local' ? 'gemma-2-9b' : 'gemini-2.5-flash');
  }

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between gap-4 border-b bg-background/80 px-4 backdrop-blur-sm sm:px-6">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="md:hidden" />
        <h1 className="hidden font-headline text-lg font-semibold tracking-tight sm:text-xl md:block">
          {title}
        </h1>
      </div>

      {/* Model Connection UI */}
      <div className="hidden flex-1 items-center justify-center gap-2 md:flex">
        <Tabs
          value={provider}
          onValueChange={handleProviderChange}
          className="w-auto"
        >
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="local">Local</TabsTrigger>
            <TabsTrigger value="gemini">Gemini</TabsTrigger>
          </TabsList>
        </Tabs>

        {provider === 'local' && (
          <div className="relative">
            <Globe
              className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              placeholder="http://localhost:11434"
              className="w-64 pl-9"
              value={endpoint}
              onChange={(e) => setEndpoint(e.target.value)}
              disabled={isConnecting || isConnected}
            />
          </div>
        )}

        <Select
          value={selectedModel}
          onValueChange={setSelectedModel}
          disabled={isConnecting || (provider === 'local' && !isConnected)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a model" />
          </SelectTrigger>
          <SelectContent>
            {provider === 'local' ? (
              <>
                <SelectItem value="gemma-2-9b">Gemma 2 9B</SelectItem>
                <SelectItem value="llama-3-70b">Llama 3 70B</SelectItem>
                <SelectItem value="phi3-mini">Phi-3 Mini</SelectItem>
                <SelectItem value="mistral-7b">Mistral 7B</SelectItem>
              </>
            ) : (
              <>
                <SelectItem value="gemini-2.5-flash">
                  Gemini 2.5 Flash
                </SelectItem>
                <SelectItem value="gemini-2.5-pro">Gemini 2.5 Pro</SelectItem>
              </>
            )}
          </SelectContent>
        </Select>

        <Button
          onClick={isConnected ? handleDisconnect : handleConnect}
          disabled={isConnecting}
          className={cn(
            'w-[130px] bg-purple-600 text-white hover:bg-purple-700',
            isConnected &&
              provider === 'local' &&
              'bg-green-600 hover:bg-green-700',
            isConnected &&
              provider === 'gemini' &&
              'bg-blue-600 hover:bg-blue-700'
          )}
        >
          {isConnecting ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : isConnected ? (
            <XCircle className="mr-2 h-4 w-4" />
          ) : (
            <Plug className="mr-2 h-4 w-4" />
          )}
          {isConnecting ? 'Connecting' : isConnected ? 'Disconnect' : 'Connect'}
        </Button>
        <Button variant="outline" size="icon">
          <History className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-9 w-9 rounded-full">
              <Avatar className="h-9 w-9">
                <AvatarImage
                  src="https://picsum.photos/seed/10/100/100"
                  alt="User Avatar"
                  data-ai-hint="user avatar"
                />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">User</p>
                <p className="text-xs leading-none text-muted-foreground">
                  user@example.com
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bot className="mr-2 h-4 w-4" />
                <span>My Agents</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings2 className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Code2 className="mr-2 h-4 w-4" />
              <span>API</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <LifeBuoy className="mr-2 h-4 w-4" />
              <span>Support</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
