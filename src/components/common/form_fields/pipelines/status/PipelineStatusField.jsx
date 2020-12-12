import React, {useState} from "react";
import PropTypes from "prop-types";
import Label from "../../Label";
import FailedPipelineStatus from "./FailedPipelineStatus";
import RunningPipelineStatus from "./RunningPipelineStatus";
import PausedPipelineStatus from "./PausedPipelineStatus";
import SuccessPipelineStatus from "./SuccessPipelineStatus";
import StoppedPipelineStatus from "./StoppedPipelineStatus";

function PipelineStatusField({ fieldName, dataObject }) {
  const [field] = useState(dataObject.getFieldById(fieldName));

  const getPipelineStatusField = (pipelineStatus) => {
    switch (pipelineStatus) {
      case "failed":
        return (<FailedPipelineStatus />);
      case "running":
        return (<RunningPipelineStatus />);
      case "paused":
        return (<PausedPipelineStatus />);
      case "success":
        return (<SuccessPipelineStatus />);
      default:
        return (<StoppedPipelineStatus />);
    }
  };

  return (<div className="d-flex"><Label field={field} /><span>{getPipelineStatusField(dataObject.getData(fieldName))}</span></div>);
}

PipelineStatusField.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
};

export default PipelineStatusField;