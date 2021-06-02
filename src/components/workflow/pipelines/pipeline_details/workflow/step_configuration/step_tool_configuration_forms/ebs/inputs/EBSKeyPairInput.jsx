import React from "react";
import PropTypes from "prop-types";
import AWSKeyPairSelectionInput from "components/common/list_of_values_input/tools/aws/AWSKeyPairSelectionInput";

function EBSKeyPairInput({dataObject, setDataObject, disabled}) {
  return (
     <AWSKeyPairSelectionInput
       fieldName={"ec2KeyName"}
       awsToolId={dataObject.getData("awsToolConfigId")}
       dataObject={dataObject}
       setDataObject={setDataObject}
       disabled={disabled}
     />
  );
}

EBSKeyPairInput.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
};

export default EBSKeyPairInput;