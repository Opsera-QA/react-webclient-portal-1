import React from "react";
import PropTypes from "prop-types";
import AwsS3BucketNameSelectInput from "components/common/list_of_values_input/tools/aws/AwsS3BucketNameSelectInput";

function HelmS3BucketSelectInput({model, setModel, disabled}) {
  const setBucketName = (fieldName, selectedOption) => {
    let newModel = {...model};
    newModel.setData("bucketName", selectedOption);
    setModel({...newModel});
  };
  const clearDataFunction = () => {
    let newModel = {...model};
    newModel.setData("bucketName", "");
    setModel({...newModel});
  };
  return (
     <AwsS3BucketNameSelectInput
       fieldName={"bucketName"}
       awsToolId={model.getData("awsToolConfigId")}
       model={model}
       setDataFunction={setBucketName}
       setModel={setModel}
       clearDataFunction={clearDataFunction}
       disabled={disabled}
     />
  );
}

HelmS3BucketSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
};

export default HelmS3BucketSelectInput;
