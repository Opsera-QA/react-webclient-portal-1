import React from "react";
import PropTypes from "prop-types";
import AWSBucketNameSelectionInput from "components/common/list_of_values_input/tools/aws/AWSBucketNameSelectionInput";

function EBSBucketInput({dataObject, setDataObject, disabled}) {
  return (
     <AWSBucketNameSelectionInput
       fieldName={"bucketName"}
       awsToolId={dataObject.getData("awsToolConfigId")}
       dataObject={dataObject}
       setDataObject={setDataObject}
       disabled={disabled}
     />
  );
}

EBSBucketInput.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
};

export default EBSBucketInput;