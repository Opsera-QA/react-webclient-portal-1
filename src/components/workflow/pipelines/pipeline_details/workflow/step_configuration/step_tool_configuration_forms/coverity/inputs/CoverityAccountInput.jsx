import React from "react";
import PropTypes from "prop-types";
import CoverityAccountSelectInput from "components/common/list_of_values_input/tools/coverity/CoverityAccountSelectInput";

function CoverityAccountInput({dataObject, setDataObject, disabled, className}) {

  return (
     <CoverityAccountSelectInput
       fieldName={"coverityCredntialId"}
       jenkinsId={dataObject?.getData("toolConfigId")}
       className={className}
       requireConfiguration={true}
       dataObject={dataObject}
       setDataObject={setDataObject}
       disabled={disabled}
     />
  );
}

CoverityAccountInput.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string
};

export default CoverityAccountInput;