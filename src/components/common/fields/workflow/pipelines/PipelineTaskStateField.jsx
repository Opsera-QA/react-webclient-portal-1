import React, {useState} from "react";
import PropTypes from "prop-types";
import {getAssociatedPipelineStatusIcon} from "components/common/table/table-column-helpers";
import FieldLabel from "components/common/fields/FieldLabel";
import FieldContainer from "components/common/fields/FieldContainer";

function PipelineTaskStateField({ fieldName, dataObject, className }) {
  const [field] = useState(dataObject.getFieldById(fieldName));

  const getPipelineStateField = (pipelineState) => {
    return <span>{getAssociatedPipelineStatusIcon(pipelineState)}<span className="ml-1 mt-1">{pipelineState}</span></span>;
  };

  if (dataObject.getData(fieldName) == null) {
    return (
      <FieldContainer>
        <span>No Pipeline State Associated With This Task</span>
      </FieldContainer>
    );
  }

  return (
    <FieldContainer className={className}>
      <FieldLabel field={field} /><span>{getPipelineStateField(dataObject.getData(fieldName))}</span>
    </FieldContainer>
  );
}

PipelineTaskStateField.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  className: PropTypes.string
};

export default PipelineTaskStateField;