import React from "react";
import PropTypes from "prop-types";
import CardView from "components/common/card/CardView";
import VerticalCardViewBase from "components/common/card_view/VerticalCardViewBase";
import WorkspaceToolCard from "components/workspace/cards/WorkspaceToolCard";

export default function FreeTrialWorkspaceRegistryCardView(
  {
    tools,
    loadData,
    isLoading,
  }) {
  const getRegistryToolCard = (tool) => {
    return (
      <WorkspaceToolCard
        tool={tool}
      />
    );
  };

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

FreeTrialWorkspaceRegistryCardView.propTypes = {
  tools: PropTypes.array,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool,
};