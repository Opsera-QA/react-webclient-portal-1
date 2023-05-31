import React from "react";
import PropTypes from "prop-types";
import VanitySetCardView from "components/common/card/VanitySetCardView";
import VerticalCardViewBase from "components/common/card_view/VerticalCardViewBase";
import PlatformPipelineTemplateCard
  from "temp-library-components/cards/templates/pipelines/platform/PlatformPipelineTemplateCard";

export default function PlatformPipelineTemplateCardView(
  {
    pipelineTemplates,
    pipelineTemplateFilterModel,
    loadData,
    isLoading,
    activeTemplates,
    error,
    selectTemplateFunction,
    cardTooltip,
  }) {
  const getPipelineCard = (template) => {
    return (
      <PlatformPipelineTemplateCard
        template={template}
        activeTemplates={activeTemplates}
        selectTemplateFunction={selectTemplateFunction}
        tooltip={cardTooltip}
      />
    );
  };

  return (
    <VanitySetCardView
      isLoading={isLoading}
      loadData={loadData}
      paginationModel={pipelineTemplateFilterModel}
      cards={
        <VerticalCardViewBase
          isLoading={isLoading}
          data={pipelineTemplates}
          getCardFunction={getPipelineCard}
        />
      }
    />
  );
}

PlatformPipelineTemplateCardView.propTypes = {
  pipelineTemplates: PropTypes.array,
  pipelineTemplateFilterModel: PropTypes.object,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool,
  activeTemplates: PropTypes.array,
  error: PropTypes.any,
  selectTemplateFunction: PropTypes.func,
  cardTooltip: PropTypes.string,
};