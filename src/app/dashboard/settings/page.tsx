import { PageHeader } from "@/components/dashboard/page-parts";
import { SettingsPanel } from "@/features/settings/components/settings-panel";

export default function SettingsPage() {
  return (
    <div className="space-y-4">
      <PageHeader
        eyebrow="Workspace"
        title="Settings"
        description="Business details, locations, alerts and team scope. Demo changes stay in this browser session."
      />
      <SettingsPanel />
    </div>
  );
}
