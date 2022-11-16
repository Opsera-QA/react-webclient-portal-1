import React from "react";
import PropTypes from "prop-types";
import VanitySetCardView from "components/common/card/VanitySetCardView";
import WorkspacePipelineCard from "components/workspace/cards/WorkspacePipelineCard";
import VerticalCardViewBase from "components/common/card_view/VerticalCardViewBase";

export default function FreeTrialWorkspacePipelineCardView(
  {
    pipelines,
    pipelineFilterModel,
    loadData,
    isLoading,
  }) {
  const getPipelineCard = (pipeline) => {
    return (
      <WorkspacePipelineCard
        pipeline={pipeline}
      />
    );
  };

  return (
    <VanitySetCardView
      isLoading={isLoading}
      loadData={loadData}
      paginationModel={pipelineFilterModel}
      cards={
        <VerticalCardViewBase
          getCardFunction={getPipelineCard}
          data={pipelines}
        />
      }
    />
  );
}

FreeTrialWorkspacePipelineCardView.propTypes = {
  pipelines: PropTypes.array,
  pipelineFilterModel: PropTypes.object,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool,
};