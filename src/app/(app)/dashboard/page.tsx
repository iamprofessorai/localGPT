'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Paperclip, Send, Settings, BarChart, Bot, Workflow } from 'lucide-react';
import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import { costData, navItems } from '@/lib/data';
import { ChartTooltipContent } from '@/components/ui/chart';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

const agents = [
  { name: 'Research Assistant', status: 'active' },
  { name: 'Code Generator', status: 'active' },
  { name: 'Email Sorter', status: 'inactive' },
];


export default function DashboardPage() {
  return (
    <div className="grid h-full grid-cols-1 gap-6 lg:grid-cols-3">
      <div className="flex flex-col gap-6 lg:col-span-2">
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Chat</CardTitle>
          </CardHeader>
          <CardContent className="flex h-[calc(100%-80px)] flex-col">
            <div className="flex-1 space-y-6 overflow-auto rounded-lg border p-4">
              <ChatMessage author="AI">
                Hello! How can I help you today?
              </ChatMessage>
              <ChatMessage author="User">
                Can you explain what a Large Language Model is in simple terms?
              </ChatMessage>
            </div>
            <div className="relative mt-4">
              <Textarea
                placeholder="Type your message here..."
                className="min-h-[80px] resize-none pr-28"
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

      <div className="space-y-6 lg:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle>Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={150}>
              <LineChart data={costData.slice(0, 4)}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="hsl(var(--border))"
                  vertical={false}
                />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} width={30} />
                <Tooltip
                  cursor={{ fill: 'hsl(var(--secondary))' }}
                  content={<ChartTooltipContent />}
                />
                <Line
                  type="monotone"
                  dataKey="cost"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Active Agents</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {agents.map((agent) => (
              <div key={agent.name} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Bot className="h-5 w-5 text-muted-foreground" />
                  <span className="font-medium">{agent.name}</span>
                </div>
                <Badge
                  variant={agent.status === 'active' ? 'default' : 'secondary'}
                  className={
                    agent.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300' : ''
                  }
                >
                  {agent.status}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
         <Card>
          <CardHeader>
            <CardTitle>Quick Access</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
             {navItems.slice(1, 5).map((item) => (
                <Link key={item.title} href={item.href} className="flex flex-col items-center gap-2 rounded-lg border p-4 text-center hover:bg-accent">
                    <item.icon className="h-6 w-6 text-primary" />
                    <span className="text-sm font-medium">{item.title}</span>
                </Link>
             ))}
          </CardContent>
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
        className={`max-w-md rounded-lg p-3 ${
          isAI ? 'bg-secondary' : 'bg-primary text-primary-foreground'
        }`}
      >
        <p className="text-sm leading-relaxed">{children}</p>
      </div>
      {!isAI && (
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
