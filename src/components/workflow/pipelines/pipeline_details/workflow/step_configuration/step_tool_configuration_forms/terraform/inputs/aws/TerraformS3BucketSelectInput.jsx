import React from "react";
import PropTypes from "prop-types";
import AWSBucketNameSelectionInput from "components/common/list_of_values_input/tools/aws/AWSBucketNameSelectionInput";

function TerraformS3BucketSelectInput({dataObject, setDataObject, disabled}) {
  const setBucketName = (fieldName, selectedOption) => {
    let newDataObject = {...dataObject};
    newDataObject.setData("bucketName", selectedOption);
    setDataObject({...newDataObject});
  };
  const clearDataFunction = () => {
    let newDataObject = {...dataObject};
    newDataObject.setData("bucketName", "");
    setDataObject({...newDataObject});
  };
  return (
     <AWSBucketNameSelectionInput
       fieldName={"bucketName"}
       awsToolId={dataObject.getData("awsToolConfigId")}
       dataObject={dataObject}
       setDataFunction={setBucketName}
       setDataObject={setDataObject}
       clearDataFunction={clearDataFunction}
       disabled={disabled}
     />
  );
}

TerraformS3BucketSelectInput.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
};

export default TerraformS3BucketSelectInput;
