import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Globe, Server } from 'lucide-react';

interface ProviderInput {
  id: string;
  label: string;
  type: string;
  defaultValue?: string;
  placeholder?: string;
}

function ProviderTabContent({
  provider,
  enabled,
  inputs,
  description,
}: {
  provider: string;
  enabled: boolean;
  inputs: ProviderInput[];
  description?: string;
}) {
  return (
    <TabsContent value={provider} className="mt-6">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h3 className="text-lg font-semibold capitalize">{provider === 'custom' ? 'Custom REST' : provider}</h3>
            <Switch defaultChecked={enabled} aria-label={`Enable ${provider}`} />
          </div>
        </div>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
        <div className="space-y-4">
          {inputs.map((input) => (
            <div key={input.id} className="space-y-2">
              <Label htmlFor={input.id}>{input.label}</Label>
              <Input
                id={input.id}
                type={input.type}
                defaultValue={input.defaultValue}
                placeholder={input.placeholder}
              />
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Test Connection</Button>
          <Button>Save</Button>
        </div>
      </div>
    </TabsContent>
  );
}

export default function SettingsPage() {
  return (
    <Tabs defaultValue="providers" className="w-full">
      <TabsList className="grid w-full grid-cols-3 max-w-md">
        <TabsTrigger value="general">General</TabsTrigger>
        <TabsTrigger value="providers">Providers</TabsTrigger>
        <TabsTrigger value="appearance">Appearance</TabsTrigger>
      </TabsList>
      <TabsContent value="general" className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>General Settings</CardTitle>
            <CardDescription>
              Manage general application settings.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
                <Label htmlFor="org-name">Organization Name</Label>
                <Input id="org-name" defaultValue="My Workspace" />
            </div>
            <div className="space-y-2">
                <Label htmlFor="default-model">Default Model</Label>
                <Input id="default-model" defaultValue="GPT-4 Omni" />
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="providers" className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>LLM Provider Management</CardTitle>
            <CardDescription>
              Add, configure, and test connections to your LLM providers.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="openai" className="w-full pt-4">
              <TabsList className="grid w-full grid-cols-4 max-w-lg">
                <TabsTrigger value="openai">
                  <Globe className="mr-2 h-4 w-4" />
                  OpenAI
                </TabsTrigger>
                <TabsTrigger value="groq">
                  <Globe className="mr-2 h-4 w-4" />
                  Groq
                </TabsTrigger>
                <TabsTrigger value="ollama">
                  <Server className="mr-2 h-4 w-4" />
                  Ollama
                </TabsTrigger>
                <TabsTrigger value="custom">
                  <Server className="mr-2 h-4 w-4" />
                  Custom
                </TabsTrigger>
              </TabsList>
              <ProviderTabContent
                provider="openai"
                enabled={true}
                inputs={[{ id: 'openai-key', label: 'API Key', type: 'password', defaultValue: '••••••••••••••••••••' }]}
              />
              <ProviderTabContent
                provider="groq"
                enabled={false}
                inputs={[{ id: 'groq-key', label: 'API Key', type: 'password', defaultValue: '••••••••••••••••••••' }]}
              />
              <ProviderTabContent
                provider="ollama"
                enabled={true}
                inputs={[{ id: 'ollama-url', label: 'Server URL', type: 'text', defaultValue: 'http://localhost:11434' }]}
              />
              <ProviderTabContent
                provider="custom"
                enabled={false}
                inputs={[
                  { id: 'custom-url', label: 'Endpoint URL', type: 'text', placeholder: 'https://.../v1/chat/completions' },
                  { id: 'custom-key', label: 'API Key (Optional)', type: 'password' },
                ]}
                description="Connect to any OpenAI-compatible REST endpoint."
              />
            </Tabs>
          </CardContent>
        </Card>
      </TabsContent>
       <TabsContent value="appearance" className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Appearance</CardTitle>
            <CardDescription>
              Customize the look and feel of the application.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
                <Label>Theme</Label>
                <p className='text-sm text-muted-foreground'>Currently in Dark Mode.</p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}