import React from "react";
import PropTypes from "prop-types";
import PipelineCard from "components/workflow/pipelines/PipelineCard";
import VanitySetCardView from "components/common/card/VanitySetCardView";
import VerticalCardViewBase from "components/common/card_view/VerticalCardViewBase";

function PipelineCardView({ pipelines, pipelineFilterModel, loadData, isLoading, subscribedPipelineIds }) {
  const getPipelineCard = (pipeline) => {
    return (
      <PipelineCard
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

PipelineCardView.propTypes = {
  pipelines: PropTypes.array,
  pipelineFilterModel: PropTypes.object,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool,
  subscribedPipelineIds: PropTypes.array,
};

export default PipelineCardView;