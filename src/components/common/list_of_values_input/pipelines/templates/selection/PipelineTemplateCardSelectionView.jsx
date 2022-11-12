import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import pipelineActions from "components/workflow/pipeline-actions";
import useComponentStateReference from "hooks/useComponentStateReference";
import LoadingDialog from "components/common/status_notifications/loading";
import NoDataMessageField from "components/common/fields/text/standalone/NoDataMessageField";
import PipelineTemplateCard
  from "components/common/list_of_values_input/pipelines/templates/selection/PipelineTemplateCard";

export default function PipelineTemplateCardSelectionView(
  {
    pipelineTemplates,
    selectedPipelineTemplate,
    setDataFunction,
    isLoading,
    className,
  }) {
  const getCards = () => {
    if (!Array.isArray(pipelineTemplates) || pipelineTemplates.length === 0) {
      if (isLoading) {
        return (
          <LoadingDialog size={"sm"} message={"Loading Data"} />
        );
      }

      return (
        <NoDataMessageField message={"No Pipeline Templates found"} />
      );
    }

    return (
      pipelineTemplates.map((pipelineTemplate, index) => {
        return (
          <div key={index}>
            <PipelineTemplateCard
              pipelineTemplate={pipelineTemplate}
              selectedPipelineTemplate={selectedPipelineTemplate}
              selectCardFunction={setDataFunction}
              // disabled={pipelineTemplate}
            />
          </div>
        );
      })
    );
  };

  if (setDataFunction == null) {
    return null;
  }

  return (
    <div className={className}>
      {getCards()}
    </div>
  );
}

PipelineTemplateCardSelectionView.propTypes = {
  setDataFunction: PropTypes.func,
  pipelineTemplates: PropTypes.array,
  selectedPipelineTemplate: PropTypes.object,
  className: PropTypes.string,
  isLoading: PropTypes.bool,
};


