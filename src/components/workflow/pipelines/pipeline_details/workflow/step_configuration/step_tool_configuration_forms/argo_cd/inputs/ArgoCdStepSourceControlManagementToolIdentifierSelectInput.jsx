import React from "react";
import PropTypes from "prop-types";
import SourceControlManagementToolIdentifierSelectInput
  from "components/common/list_of_values_input/tools/source_control/SourceControlManagementToolIdentifierSelectInput";
import {isMongoDbId} from "components/common/helpers/mongo/mongoDb.helpers";

function ArgoCdStepSourceControlManagementToolIdentifierSelectInput({ fieldName, model, setModel, disabled }) {
  const setDataFunction = (fieldName, option) => {
    const newModel = model;
    newModel.setData("type", option?.value);
    newModel.setData("gitToolId", "");
    newModel.setData("gitRepository", "");
    newModel.setData("gitRepositoryID", "");
    newModel.setData("defaultBranch", "");
    newModel.setData("gitFilePath", "");
    newModel.setData("gitWorkspace", "");
    newModel.setData("bitbucketWorkspace", "");
    newModel.setData("bitbucketWorkspaceName", "");
    setModel({...newModel});
  };

  return (
    <SourceControlManagementToolIdentifierSelectInput
      fieldName={fieldName}
      model={model}
      setModel={setModel}
      setDataObject={setModel}
      setDataFunction={setDataFunction}
      disabled={disabled || isMongoDbId(model?.getData("dockerStepID")) !== true}
    />
  );
}

ArgoCdStepSourceControlManagementToolIdentifierSelectInput.propTypes = {
  currentPipelineId: PropTypes.string,
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool
};

ArgoCdStepSourceControlManagementToolIdentifierSelectInput.defaultProps = {
  fieldName: "type",
};

export default ArgoCdStepSourceControlManagementToolIdentifierSelectInput;