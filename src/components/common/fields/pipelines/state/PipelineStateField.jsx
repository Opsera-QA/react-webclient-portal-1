import React, {useState} from "react";
import PropTypes from "prop-types";
import FieldLabel from "components/common/fields/FieldLabel";
import FailedPipelineState from "components/common/fields/pipelines/state/FailedPipelineState";
import RunningPipelineState from "components/common/fields/pipelines/state/RunningPipelineState";
import PausedPipelineState from "components/common/fields/pipelines/state/PausedPipelineState";
import SuccessPipelineState from "components/common/fields/pipelines/state/SuccessPipelineState";
import StoppedPipelineState from "components/common/fields/pipelines/state/StoppedPipelineState";

function PipelineStateField({ fieldName, dataObject }) {
  const [field] = useState(dataObject.getFieldById(fieldName));

  const getPipelineStateField = (pipelineState) => {
    switch (pipelineState) {
      case "failed":
        return (<FailedPipelineState />);
      case "running":
        return (<RunningPipelineState />);
      case "paused":
        return (<PausedPipelineState />);
      case "success":
        return (<SuccessPipelineState />);
      default:
        return (<StoppedPipelineState />);
    }
  };

  return (<div className="d-flex"><FieldLabel field={field} /><span>{getPipelineStateField(dataObject.getData(fieldName))}</span></div>);
}

PipelineStateField.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
};

export default PipelineStateField;