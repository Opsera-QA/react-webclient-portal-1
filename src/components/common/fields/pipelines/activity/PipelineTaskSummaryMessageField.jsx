import React from "react";
import PropTypes from "prop-types";
import TextFieldBase from "components/common/fields/text/TextFieldBase";

function PipelineTaskSummaryMessageField({ fieldName, dataObject }) {
  return (
    <div className="m-3 p-3 text-muted italic pipeline-task-message">
      <TextFieldBase dataObject={dataObject} fieldName={fieldName}/>
    </div>
  );
}

PipelineTaskSummaryMessageField.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
};

export default PipelineTaskSummaryMessageField;