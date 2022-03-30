import React from "react";
import PropTypes from "prop-types";
import PipelineSummaryCardContainer
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/PipelineSummaryCardContainer";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import PipelineLinkButton from "components/common/buttons/pipeline/PipelineLinkButton";
import PipelineTaskStateField from "components/common/fields/workflow/pipelines/PipelineTaskStateField";
import DateFieldBase from "components/common/fields/date/DateFieldBase";
import DescriptionField from "components/common/fields/text/DescriptionField";

function ChildPipelineTaskSummaryCard({ pipelineData }) {
  return (
    <PipelineSummaryCardContainer pipelineData={pipelineData}>
      <div className="d-flex justify-content-between">
        <TextFieldBase dataObject={pipelineData} fieldName={"runNumber"}/>
        <PipelineTaskStateField dataObject={pipelineData} fieldName={"state"}/>
      </div>
      <div className="mb-1">
        <DescriptionField dataObject={pipelineData} fieldName={"description"}/>
      </div>
      <div className="d-flex justify-content-between align-items-end">
        <DateFieldBase dataObject={pipelineData} fieldName={"createdAt"}/>
        <DateFieldBase dataObject={pipelineData} fieldName={"updatedAt"}/>
        <PipelineLinkButton pipelineId={pipelineData.getData("_id")} loadPipelineInNewWindow={true}/>
      </div>
    </PipelineSummaryCardContainer>
  );
}

ChildPipelineTaskSummaryCard.propTypes = {
  pipelineData: PropTypes.object,
  runCount: PropTypes.string,
  status: PropTypes.string
};


export default ChildPipelineTaskSummaryCard;
