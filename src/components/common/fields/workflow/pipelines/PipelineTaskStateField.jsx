import React, {useState} from "react";
import PropTypes from "prop-types";
import {getPipelineStatusIcon2} from "components/common/table/table-column-helpers";
import FieldLabel from "components/common/fields/FieldLabel";
import FieldContainer from "components/common/fields/FieldContainer";

function PipelineTaskStateField({ fieldName, dataObject }) {
  const [field] = useState(dataObject.getFieldById(fieldName));

  const getPipelineStateField = (pipelineState) => {
    return <span>{getPipelineStatusIcon2(pipelineState)}<span className="ml-1 mt-1">{pipelineState}</span></span>
  };

  return (
    <FieldContainer>
      <FieldLabel field={field} /><span>{getPipelineStateField(dataObject.getData(fieldName))}</span>
    </FieldContainer>
  );
}

PipelineTaskStateField.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
};

export default PipelineTaskStateField;