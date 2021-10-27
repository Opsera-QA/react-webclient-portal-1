import React from "react";
import PropTypes from "prop-types";
import RoleRestrictedJenkinsAccountSelectInput
  from "components/common/list_of_values_input/tools/jenkins/RoleRestrictedJenkinsAccountSelectInput";

function CoverityStepJenkinsAccountSelectInput({dataObject, setDataObject, disabled, className}) {
  return (
     <RoleRestrictedJenkinsAccountSelectInput
       fieldName={"coverityCredntialId"}
       jenkinsToolId={dataObject?.getData("toolConfigId")}
       className={className}
       requireConfiguration={true}
       dataObject={dataObject}
       setDataObject={setDataObject}
       disabled={disabled}
     />
  );
}

CoverityStepJenkinsAccountSelectInput.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string
};

export default CoverityStepJenkinsAccountSelectInput;