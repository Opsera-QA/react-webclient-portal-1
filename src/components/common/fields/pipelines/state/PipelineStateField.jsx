import React, {useState} from "react";
import PropTypes from "prop-types";
import FieldLabel from "components/common/fields/FieldLabel";
import FailedPipelineStateFieldBase from "components/common/fields/pipelines/state/FailedPipelineStateFieldBase";
import RunningPipelineStateFieldBase from "components/common/fields/pipelines/state/RunningPipelineStateFieldBase";
import PausedPipelineStateFieldBase from "components/common/fields/pipelines/state/PausedPipelineStateFieldBase";
import SuccessPipelineStateFieldBase from "components/common/fields/pipelines/state/SuccessPipelineStateFieldBase";
import StoppedPipelineStateFieldBase from "components/common/fields/pipelines/state/StoppedPipelineStateFieldBase";

export const getPipelineStateFieldBase = (pipelineState) => {
  switch (pipelineState) {
    case "failed":
      return (<FailedPipelineStateFieldBase />);
    case "running":
      return (<RunningPipelineStateFieldBase />);
    case "paused":
      return (<PausedPipelineStateFieldBase />);
    case "success":
      return (<SuccessPipelineStateFieldBase />);
    default:
      return (<StoppedPipelineStateFieldBase />);
  }
};

function PipelineStateField({ fieldName, dataObject }) {
  const [field] = useState(dataObject.getFieldById(fieldName));

  return (
    <div className="d-flex">
      <FieldLabel field={field} />
      <span>{getPipelineStateFieldBase(dataObject.getData(fieldName))}</span>
    </div>
  );
}

PipelineStateField.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
};

export default PipelineStateField;