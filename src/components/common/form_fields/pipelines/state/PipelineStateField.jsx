import React, {useState} from "react";
import PropTypes from "prop-types";
import Label from "../../Label";
import FailedPipelineState from "./FailedPipelineState";
import RunningPipelineState from "./RunningPipelineState";
import PausedPipelineState from "./PausedPipelineState";
import SuccessPipelineState from "./SuccessPipelineState";
import StoppedPipelineState from "./StoppedPipelineState";

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

  return (<div className="d-flex"><Label field={field} /><span>{getPipelineStateField(dataObject.getData(fieldName))}</span></div>);
}

PipelineStateField.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
};

export default PipelineStateField;