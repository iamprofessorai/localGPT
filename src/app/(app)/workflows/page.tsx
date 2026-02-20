import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { WorkflowForm } from './_components/workflow-form';
import { Bot, FileJson, Mail, Send } from 'lucide-react';

export default function WorkflowsPage() {
  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <h2 className="mb-4 font-headline text-xl font-semibold">
          Run a Workflow: Text Summarizer & Keyword Extractor
        </h2>
        <WorkflowForm />
      </div>
      <div className="lg:col-span-1">
        <h2 className="mb-4 font-headline text-xl font-semibold">
          Visual Builder
        </h2>
        <Card className="bg-card/50">
          <CardHeader>
            <CardTitle>Workflow Preview</CardTitle>
            <CardDescription>
              A visual representation of a drag-and-drop builder.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col items-center gap-2">
              <WorkflowNode icon={Mail} title="Trigger: New Email" />
              <div className="h-6 w-px bg-border" />
              <WorkflowNode icon={Bot} title="Model Call: Summarize" />
              <div className="h-6 w-px bg-border" />
              <WorkflowNode icon={FileJson} title="Extract JSON: Keywords" />
              <div className="h-6 w-px bg-border" />
              <WorkflowNode icon={Send} title="Action: Send to Slack" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function WorkflowNode({ icon: Icon, title }: { icon: React.ElementType, title: string }) {
  return (
    <div className="flex w-full items-center gap-4 rounded-lg border bg-background p-3 shadow-sm">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
        <Icon className="h-5 w-5 text-secondary-foreground" />
      </div>
      <span className="font-medium">{title}</span>
    </div>
  );
}
