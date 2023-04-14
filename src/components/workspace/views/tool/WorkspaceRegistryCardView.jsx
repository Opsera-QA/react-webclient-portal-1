import React from "react";
import PropTypes from "prop-types";
import CardView from "components/common/card/CardView";
import VerticalCardViewBase from "components/common/card_view/VerticalCardViewBase";
import WorkspaceToolCard from "components/workspace/cards/WorkspaceToolCard";
import VanitySetCardView from "components/common/card/VanitySetCardView";

export default function WorkspaceRegistryCardView(
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
    <VanitySetCardView
      isLoading={isLoading}
      loadData={loadData}
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
};