import React from "react";
import PropTypes from "prop-types";
import CustomerPipelineTemplateCard
  from "temp-library-components/cards/templates/pipelines/customer/CustomerPipelineTemplateCard";
import VanitySetCardView from "components/common/card/VanitySetCardView";
import VerticalCardViewBase from "components/common/card_view/VerticalCardViewBase";

export default function CustomerPipelineTemplateCardView(
  {
    pipelineTemplates,
    pipelineTemplateFilterModel,
    loadData,
    isLoading,
    activeTemplates,
    selectTemplateFunction,
    cardTooltip,
  }) {
  const getPipelineCard = (template) => {
    return (
      <CustomerPipelineTemplateCard
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

CustomerPipelineTemplateCardView.propTypes = {
  pipelineTemplates: PropTypes.array,
  pipelineTemplateFilterModel: PropTypes.object,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool,
  activeTemplates: PropTypes.array,
  selectTemplateFunction: PropTypes.func,
  cardTooltip: PropTypes.string,
};