import React from "react";
import PropTypes from "prop-types";
import "components/inventory/tools/tools.css";
import PipelineSummaryCardContainer from "../../../../../pipeline_activity/PipelineSummaryCardContainer";
import TextFieldBase from "../../../../../../../../common/form_fields/TextFieldBase";
import DateFieldBase from "../../../../../../../../common/form_fields/DateFieldBase";
import PipelineStatusField from "../../../../../../../../common/form_fields/pipelines/status/PipelineStatusField";
import PipelineLinkButton from "../../../../../../../../common/buttons/pipeline/PipelineLinkButton";

function ParallelPipelineTaskSummaryCard({ pipelineData }) {
  return (
    <PipelineSummaryCardContainer pipelineData={pipelineData}>
      <div className="d-flex justify-content-between">
        <TextFieldBase dataObject={pipelineData} fieldName={"runNumber"}/>
        <PipelineStatusField dataObject={pipelineData} fieldName={"status"}/>
      </div>
      <div className="mb-2">
        <TextFieldBase dataObject={pipelineData} fieldName={"description"}/>
      </div>
      <div className="d-flex justify-content-between align-items-end">
        <DateFieldBase dataObject={pipelineData} fieldName={"createdAt"}/>
        <DateFieldBase dataObject={pipelineData} fieldName={"updatedAt"}/>
        <PipelineLinkButton pipelineId={pipelineData.getData("_id")}/>
      </div>
    </PipelineSummaryCardContainer>
  );
}

ParallelPipelineTaskSummaryCard.propTypes = {
  pipelineData: PropTypes.object,
  runCount: PropTypes.string,
  status: PropTypes.string
};


export default ParallelPipelineTaskSummaryCard;
