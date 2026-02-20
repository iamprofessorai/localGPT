import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { CornerDownLeft, Play, Square } from 'lucide-react';
import React from 'react';
import { Badge } from '@/components/ui/badge';

export default function PlaygroundPage() {
  return (
    <div className="flex h-[calc(100vh-6rem)] flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="font-headline text-xl font-semibold">Prompt Playground</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <CornerDownLeft className="mr-2" />
            <span>Load Preset</span>
          </Button>
          <Button>
            <Play className="mr-2" />
            <span>Run Comparison</span>
          </Button>
        </div>
      </div>
      <div className="grid flex-1 grid-cols-1 gap-6 md:grid-cols-2">
        <ModelPanel modelName="Model A" defaultModel="gpt-4-omni" />
        <ModelPanel modelName="Model B" defaultModel="claude-3-opus" />
      </div>
    </div>
  );
}

function ModelPanel({ modelName, defaultModel }: { modelName: string; defaultModel: string }) {
  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-base font-medium">{modelName}</CardTitle>
          <Select defaultValue={defaultModel}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a model" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="gpt-4-omni">GPT-4 Omni</SelectItem>
              <SelectItem value="claude-3-opus">Claude 3 Opus</SelectItem>
              <SelectItem value="llama-3-70b">Llama 3 70B</SelectItem>
              <SelectItem value="gemma-2-9b">Gemma 2 9B</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
      </Card>
      <div className="flex-1 rounded-lg border">
        <Textarea
          placeholder="Enter your complex prompt here..."
          className="h-full min-h-[200px] w-full resize-none border-0 font-code focus:ring-0"
          defaultValue={`You are a code generation assistant.
Given the following user request, generate a React component using TypeScript and Tailwind CSS.

Request: "Create a simple button with a primary style."
`}
        />
      </div>
      <Card className="flex-1">
        <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-base font-medium">Output</CardTitle>
          <Button variant="ghost" size="icon">
            <Square className="h-4 w-4" />
            <span className="sr-only">Stop Generation</span>
          </Button>
        </CardHeader>
        <Separator />
        <CardContent className="p-4">
          <div className="font-code text-sm">
            <pre className="whitespace-pre-wrap">
              <code>
{`import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const Button = ({ children, className, ...props }: ButtonProps) => {
  return (
    <button
      className={\`px-4 py-2 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 \${className}\`}
      {...props}
    >
      {children}
    </button>
  );
};
`}
              </code>
            </pre>
          </div>
        </CardContent>
        <Separator />
        <div className="flex items-center justify-end gap-4 p-2 text-xs text-muted-foreground">
            <Badge variant="outline">Tokens: 152</Badge>
            <Badge variant="outline">Cost: $0.0028</Badge>
            <Badge variant="outline">Latency: 890ms</Badge>
        </div>
      </Card>
    </div>
  );
}
