import React from "react";
import PropTypes from "prop-types";
import AWSRepositoryInput from "components/common/list_of_values_input/tools/aws/AWSRepositoryInput";

function DockerPushAwsRepoInput({dataObject, setDataObject, disabled}) {
  const setRepo = (fieldName, selectedOption) => {
    let newDataObject = {...dataObject};
    newDataObject.setData("ecrRepoName", selectedOption);
    setDataObject({...newDataObject});
  };
  const clearDataFunction = () => {
    let newDataObject = {...dataObject};
    newDataObject.setData("ecrRepoName", "");
    setDataObject({...newDataObject});
  };
  return (
    <AWSRepositoryInput
      fieldName={"ecrRepoName"}
      awsToolId={dataObject.getData("awsToolConfigId")}
      dataObject={dataObject}
      setDataFunction={setRepo}
      setDataObject={setDataObject}
      clearDataFunction={clearDataFunction}
      disabled={disabled}
    />
  );
}

DockerPushAwsRepoInput.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
};

export default DockerPushAwsRepoInput;