import { PageHeader } from "@/components/dashboard/page-parts";
import { AssistantWorkspace } from "@/features/assistant/components/assistant-workspace";

export default function AssistantPage() {
  return (
    <div className="space-y-4">
      <PageHeader
        eyebrow="Assistant"
        title="Ask your inventory"
        description="Plain-language questions against live stock, sales and the forecast model. Answers cite the record they used and never change data."
      />
      <AssistantWorkspace />
    </div>
  );
}
