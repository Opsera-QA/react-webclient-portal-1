import React from "react";
import PropTypes from "prop-types";
import AWSRepositoryInput from "components/common/list_of_values_input/tools/aws/AWSRepositoryInput";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";

function ArgoCdStepAwsRepoSelectInput({model, setModel, disabled, awsToolConfigId}) {
  const setRepo = (fieldName, selectedOption) => {
    let newModel = {...model};
    newModel.setData("ecrRepoName", selectedOption);
    setModel({...newModel});
  };
  const clearDataFunction = () => {
    let newModel = {...model};
    newModel.setData("ecrRepoName", "");
    setModel({...newModel});
  };
  return (
     <AWSRepositoryInput
       fieldName={"ecrRepoName"}
       awsToolId={awsToolConfigId}
       dataObject={model}
       setDataFunction={setRepo}
       setDataObject={setModel}
       clearDataFunction={clearDataFunction}
       disabled={disabled}
     />
  );
}

ArgoCdStepAwsRepoSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  awsToolConfigId: PropTypes.string,
};

export default ArgoCdStepAwsRepoSelectInput;