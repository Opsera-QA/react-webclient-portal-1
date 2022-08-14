import React from "react";
import PropTypes from "prop-types";
import RegistryToolCard from "components/common/fields/inventory/RegistryToolCard";
import CardView from "components/common/card/CardView";
import VerticalCardViewBase from "components/common/card_view/VerticalCardViewBase";
import ToolModel from "components/inventory/tools/tool.model";

export default function WorkspaceRegistryCardView(
  {
    tools,
    toolMetadata,
    loadData,
    isLoading,
  }) {
  const getRegistryToolCard = (tool) => {
    return (
      <RegistryToolCard
        toolData={new ToolModel({ ...tool }, toolMetadata, false)}
      />
    );
  };

  if (toolMetadata == null) {
    return null;
  }

  return (
    <CardView
      isLoading={isLoading}
      loadData={loadData}
      nextGeneration={true}
      cards={
        <VerticalCardViewBase
          data={tools}
          getCardFunction={getRegistryToolCard}
        />
      }
    />
  );
}

WorkspaceRegistryCardView.propTypes = {
  tools: PropTypes.array,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool,
  toolMetadata: PropTypes.object,
};