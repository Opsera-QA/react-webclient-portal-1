import React from "react";
import PropTypes from "prop-types";
import "components/inventory/tools/tools.css";
import PipelineSummaryCardContainer
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/PipelineSummaryCardContainer";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import PipelineStateField from "components/common/form_fields/pipelines/state/PipelineStateField";
import DateFieldBase from "components/common/form_fields/DateFieldBase";
import PipelineLinkButton from "components/common/buttons/pipeline/PipelineLinkButton";

function ChildPipelineTaskSummaryCard({ pipelineData }) {
  return (
    <PipelineSummaryCardContainer pipelineData={pipelineData}>
      <div className="d-flex justify-content-between">
        <TextFieldBase dataObject={pipelineData} fieldName={"runNumber"}/>
        <PipelineStateField dataObject={pipelineData} fieldName={"state"}/>
      </div>
      <div className="mb-2">
        <TextFieldBase dataObject={pipelineData} fieldName={"description"}/>
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
