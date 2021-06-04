import React from "react";
import PropTypes from "prop-types";
import AWSKeyPairSelectionInput from "components/common/list_of_values_input/tools/aws/AWSKeyPairSelectionInput";

function EBSKeyPairInput({dataObject, setDataObject, disabled}) {
  const setKeyPair = (fieldName, selectedOption) => {
    let newDataObject = {...dataObject};
    newDataObject.setData("ec2KeyName", selectedOption);
    setDataObject({...newDataObject});
  };
  const clearDataFunction = () => {
    let newDataObject = {...dataObject};
    newDataObject.setData("ec2KeyName", "");
    setDataObject({...newDataObject});
  };
  return (
     <AWSKeyPairSelectionInput
       fieldName={"ec2KeyName"}
       awsToolId={dataObject.getData("awsToolConfigId")}
       dataObject={dataObject}
       setDataFunction={setKeyPair}
       setDataObject={setDataObject}
       clearDataFunction={clearDataFunction}
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