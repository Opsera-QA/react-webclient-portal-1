import React from "react";
import PropTypes from "prop-types";
import PipelineSummaryCardContainer from "./PipelineSummaryCardContainer";
import PipelineLinkButton from "components/common/buttons/pipeline/PipelineLinkButton";
import TagField from "components/common/fields/multiple_items/tags/TagField";
import DateFieldBase from "components/common/fields/date/DateFieldBase";
import DescriptionField from "components/common/fields/text/DescriptionField";

function PipelineSummaryCard({ pipelineData, isLoading, loadPipelineInNewWindow, closePanelFunction }) {
  if (isLoading) {
    return <PipelineSummaryCardContainer isLoading={isLoading} />;
  }

  return (
    <PipelineSummaryCardContainer pipelineData={pipelineData} isLoading={isLoading}>
      <div className="mb-1">
        <DescriptionField dataObject={pipelineData} fieldName={"description"}/>
      </div>
      <div className="mb-2">
        <TagField dataObject={pipelineData} fieldName={"tags"} showLabel={false}/>
      </div>
      <div className="d-flex justify-content-between">
        <DateFieldBase dataObject={pipelineData} fieldName={"createdAt"}/>
        <DateFieldBase dataObject={pipelineData} fieldName={"updatedAt"}/>
        <PipelineLinkButton
          pipelineId={pipelineData.getData("_id")}
          loadPipelineInNewWindow={loadPipelineInNewWindow}
          closePanelFunction={closePanelFunction}
        />
      </div>
    </PipelineSummaryCardContainer>
  );
}

PipelineSummaryCard.propTypes = {
  pipelineData: PropTypes.object,
  isLoading: PropTypes.bool,
  loadPipelineInNewWindow: PropTypes.bool,
  closePanelFunction: PropTypes.func
};

PipelineSummaryCard.defaultProps = {
  loadPipelineInNewWindow: true
};

export default PipelineSummaryCard;
