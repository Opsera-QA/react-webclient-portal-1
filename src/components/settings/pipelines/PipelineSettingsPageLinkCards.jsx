import React from "react";
import PipelineInstructionsPageLinkCard
  from "components/settings/pipelines/instructions/PipelineInstructionsPageLinkCard";
import TagManagementPageLinkCard from "components/settings/tags/TagManagementPageLinkCard";

export default function PipelineSettingsPageLinkCards() {
  return (
    <div>
      <PipelineInstructionsPageLinkCard />
      <TagManagementPageLinkCard />
    </div>
  );
}
