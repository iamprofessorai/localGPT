import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Globe, Server } from 'lucide-react';

const providers = [
  { name: 'OpenAI', type: 'cloud', enabled: true },
  { name: 'Ollama', type: 'local', enabled: true },
  { name: 'Groq', type: 'cloud', enabled: false },
  { name: 'Custom REST', type: 'local', enabled: false },
];

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
          <CardContent className="space-y-6">
            <div className="space-y-4 rounded-lg border p-4">
                <div className='flex items-center justify-between'>
                    <Label>Auto-detect local servers</Label>
                    <Switch defaultChecked />
                </div>
                <p className='text-sm text-muted-foreground'>
                    Automatically scan your local network for providers like Ollama.
                </p>
            </div>
            {providers.map((provider) => (
              <Card key={provider.name}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                  <div className="flex items-center gap-3">
                    {provider.type === 'local' ? <Server className='h-5 w-5' /> : <Globe className='h-5 w-5' />}
                    <h3 className="font-semibold">{provider.name}</h3>
                    {provider.type === 'local' && <Badge variant="outline">Local</Badge>}
                  </div>
                  <Switch defaultChecked={provider.enabled} />
                </CardHeader>
                <CardContent className="space-y-4">
                  {provider.name === 'Ollama' && (
                    <div className="space-y-2">
                      <Label htmlFor={`${provider.name}-url`}>Server URL</Label>
                      <Input
                        id={`${provider.name}-url`}
                        defaultValue="http://localhost:11434"
                      />
                    </div>
                  )}
                  {provider.type === 'cloud' && (
                     <div className="space-y-2">
                     <Label htmlFor={`${provider.name}-key`}>API Key</Label>
                     <Input
                       id={`${provider.name}-key`}
                       type="password"
                       defaultValue="••••••••••••••••••••"
                     />
                   </div>
                  )}
                  <div className="flex gap-2">
                    <Button variant="outline">Test Connection</Button>
                    <Button>Save</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
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
