import React from "react";
import PropTypes from "prop-types";
import AwsS3BucketNameSelectInput from "components/common/list_of_values_input/tools/aws/AwsS3BucketNameSelectInput";

function HelmS3BucketSelectInput({dataObject, setDataObject, disabled}) {
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
     <AwsS3BucketNameSelectInput
       fieldName={"bucketName"}
       awsToolId={dataObject.getData("awsToolConfigId")}
       model={dataObject}
       setDataFunction={setBucketName}
       setModel={setDataObject}
       clearDataFunction={clearDataFunction}
       disabled={disabled}
     />
  );
}

HelmS3BucketSelectInput.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
};

export default HelmS3BucketSelectInput;
