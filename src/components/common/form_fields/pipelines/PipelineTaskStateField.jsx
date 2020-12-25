import React, {useState} from "react";
import PropTypes from "prop-types";
import {getPipelineStatusIcon2} from "../../table/table-column-helpers";
import Label from "../Label";

function PipelineTaskStateField({ fieldName, dataObject }) {
  const [field] = useState(dataObject.getFieldById(fieldName));

  const getPipelineStateField = (pipelineState) => {
    return <span>{getPipelineStatusIcon2(pipelineState)}<span className="ml-1 mt-1">{pipelineState}</span></span>
  };

  return (<div className="d-flex"><Label field={field} /><span>{getPipelineStateField(dataObject.getData(fieldName))}</span></div>);
}

PipelineTaskStateField.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
};

export default PipelineTaskStateField;