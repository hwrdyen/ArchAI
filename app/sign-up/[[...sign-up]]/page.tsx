import { SignUp } from "@clerk/nextjs";
import { Sparkles, Users, FileText } from "lucide-react";

function FeatureItem({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-4">
      <div className="flex-shrink-0 h-9 w-9 rounded-xl bg-accent-dim flex items-center justify-center text-brand">
        {icon}
      </div>
      <div>
        <p className="text-copy-primary text-sm font-medium">{title}</p>
        <p className="text-copy-muted text-sm mt-0.5 leading-snug">{description}</p>
      </div>
    </div>
  );
}

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-base flex">
      <div className="hidden lg:flex flex-col w-1/2 bg-surface border-r border-surface-border">
        <div className="px-10 pt-10">
          <div className="flex items-center gap-2.5">
            <div className="h-7 w-7 rounded-lg bg-brand flex-shrink-0" />
            <span className="text-copy-primary font-semibold text-sm tracking-tight">
              Arch AI
            </span>
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-center px-10">
          <h1 className="text-4xl font-bold text-copy-primary leading-tight tracking-tight">
            Design systems at the
            <br />
            speed of thought.
          </h1>
          <p className="mt-4 text-copy-secondary text-base leading-relaxed">
            Describe your architecture in plain English. Arch AI maps it to a
            shared canvas your whole team can refine in real time.
          </p>

          <div className="mt-10 space-y-6">
            <FeatureItem
              icon={<Sparkles className="h-4 w-4" />}
              title="AI Architecture Generation"
              description="Describe your system, AI maps it to nodes and edges on a live canvas."
            />
            <FeatureItem
              icon={<Users className="h-4 w-4" />}
              title="Real-time Collaboration"
              description="Live cursors, presence indicators, and shared node editing across your team."
            />
            <FeatureItem
              icon={<FileText className="h-4 w-4" />}
              title="Instant Spec Generation"
              description="Export a complete Markdown technical spec directly from the canvas graph."
            />
          </div>
        </div>

        <div className="px-10 pb-10">
          <p className="text-copy-faint text-sm">
            © 2026 Arch AI. All rights reserved.
          </p>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-8">
        <SignUp />
      </div>
    </div>
  );
}
