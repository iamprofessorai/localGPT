import {
  BarChart,
  Bot,
  LayoutDashboard,
  LineChart,
  Settings,
  TerminalSquare,
  Workflow,
} from 'lucide-react';
import type { NavItem } from './types';

export const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Playground',
    href: '/playground',
    icon: TerminalSquare,
  },
  {
    title: 'Workflows',
    href: '/workflows',
    icon: Workflow,
  },
  {
    title: 'Agents',
    href: '/agents',
    icon: Bot,
  },
  {
    title: 'Analytics',
    href: '/analytics',
    icon: BarChart,
  },
  {
    title: 'Settings',
    href: '/settings',
    icon: Settings,
  },
];

export const usageData = [
  { provider: 'OpenAI', tokens: 120345, date: '2023-01' },
  { provider: 'Ollama', tokens: 80567, date: '2023-01' },
  { provider: 'Groq', tokens: 250123, date: '2023-01' },
  { provider: 'OpenAI', tokens: 150456, date: '2023-02' },
  { provider: 'Ollama', tokens: 110890, date: '2023-02' },
  { provider: 'Groq', tokens: 300567, date: '2023-02' },
  { provider: 'OpenAI', tokens: 180789, date: '2023-03' },
  { provider: 'Ollama', tokens: 95432, date: '2023-03' },
  { provider: 'Groq', tokens: 320890, date: '2023-03' },
  { provider: 'OpenAI', tokens: 210123, date: '2023-04' },
  { provider: 'Ollama', tokens: 130678, date: '2023-04' },
  { provider: 'Groq', tokens: 350123, date: '2023-04' },
];

export const costData = [
  { month: 'Jan', cost: 120.34 },
  { month: 'Feb', cost: 150.45 },
  { month: 'Mar', cost: 180.78 },
  { month: 'Apr', cost: 210.12 },
  { month: 'May', cost: 230.56 },
  { month: 'Jun', cost: 250.90 },
];

export const latencyData = [
    { model: 'GPT-4', avgLatency: 1200 },
    { model: 'Llama3', avgLatency: 450 },
    { model: 'Mixtral', avgLatency: 600 },
    { model: 'Groq-Llama3', avgLatency: 150 },
];
