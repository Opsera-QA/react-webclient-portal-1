import React from "react";
import PropTypes from "prop-types";
import "components/inventory/tools/tools.css";
import DateFieldBase from "../../../../common/form_fields/DateFieldBase";
import TextFieldBase from "../../../../common/form_fields/TextFieldBase";
import PipelineSummaryCardContainer from "./PipelineSummaryCardContainer";
import PipelineLinkButton from "../../../../common/buttons/pipeline/PipelineLinkButton";

function PipelineSummaryCard({ pipelineData, isLoading }) {
  if (isLoading) {
    return <PipelineSummaryCardContainer isLoading={isLoading} />;
  }

  return (
    <PipelineSummaryCardContainer pipelineData={pipelineData} isLoading={isLoading}>
      <div className="mb-2">
        <TextFieldBase dataObject={pipelineData} fieldName={"description"}/>
      </div>
      <div className="d-flex justify-content-between">
        <DateFieldBase dataObject={pipelineData} fieldName={"createdAt"}/>
        <DateFieldBase dataObject={pipelineData} fieldName={"updatedAt"}/>
        <PipelineLinkButton pipelineId={pipelineData.getData("_id")}/>
      </div>
    </PipelineSummaryCardContainer>
  );
}

PipelineSummaryCard.propTypes = {
  pipelineData: PropTypes.object,
  isLoading: PropTypes.bool
};

export default PipelineSummaryCard;
