'use client';

import { usePathname } from 'next/navigation';
import {
  Bot,
  Code2,
  History,
  LifeBuoy,
  LogOut,
  Plug,
  Server,
  Settings2,
  Sparkles,
  User,
} from 'lucide-react';
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

export function Header() {
  const pathname = usePathname();
  const segment = pathname.split('/').filter(Boolean).pop() || 'dashboard';
  const title = segment.charAt(0).toUpperCase() + segment.slice(1);

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm sm:px-6">
      <SidebarTrigger className="md:hidden" />
      <h1 className="hidden font-headline text-lg font-semibold tracking-tight sm:text-xl md:block">
        {title}
      </h1>

      <div className="flex flex-1 items-center justify-end gap-4">
        <div className="hidden items-center gap-2 lg:flex">
          <Tabs defaultValue="gemini">
            <TabsList className="h-10">
              <TabsTrigger value="local">
                <Server className="mr-2 h-4 w-4" />
                Local
              </TabsTrigger>
              <TabsTrigger value="gemini">
                <Sparkles className="mr-2 h-4 w-4" />
                Gemini
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <Input
            placeholder="http://localhost:1234"
            className="h-10 w-60"
          />
          <Select>
            <SelectTrigger className="h-10 w-[200px]">
              <SelectValue placeholder="Connect to see models" />
            </SelectTrigger>
            <SelectContent>
              {/* Models would be populated dynamically */}
            </SelectContent>
          </Select>
          <Button className="h-10">
            <Plug className="mr-2 h-4 w-4" />
            Connect
          </Button>
          <Button variant="ghost" size="icon" className="h-10 w-10">
            <History className="h-5 w-5" />
          </Button>
        </div>

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
