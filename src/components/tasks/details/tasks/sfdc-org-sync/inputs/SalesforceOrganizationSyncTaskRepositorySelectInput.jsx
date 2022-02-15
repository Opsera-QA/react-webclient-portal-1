import React from "react";
import PropTypes from "prop-types";
import RepositorySelectInput from "components/common/list_of_values_input/tools/repositories/RepositorySelectInput";

function SalesforceOrganizationSyncTaskRepositorySelectInput({model, setModel, disabled}) {
  const setDataFunction = (fieldName, selectedOption) => {
    let newModel = {...model};
    const repoId = selectedOption?.id || selectedOption?.repositoryId || "";
    const gitUrl = selectedOption?.httpUrl || selectedOption?.remoteUrl || "";
    newModel.setData("repository", selectedOption.name);
    newModel.setData("projectId", repoId);
    newModel.setData("sshUrl", selectedOption.sshUrl || "");
    newModel.setData("gitUrl", gitUrl);
    newModel.setData("gitBranch", "");
    newModel.setData("defaultBranch", "");
    newModel.setData("sourceBranch", "");
    newModel.setData("autoApprove", false);
    newModel.setData("reviewers", []);
    newModel.setData("reviewerNames", []);
    setModel({...newModel});
  };

  const clearDataFunction = () => {
    let newModel = {...model};
    newModel.setDefaultValue("repository");
    newModel.setDefaultValue("projectId");
    newModel.setDefaultValue("sshUrl");
    newModel.setDefaultValue("gitUrl");
    newModel.setDefaultValue("gitBranch");
    newModel.setDefaultValue("defaultBranch");
    newModel.setDefaultValue("sourceBranch");
    newModel.setDefaultValue("autoApprove");
    newModel.setDefaultValue("reviewers");
    newModel.setDefaultValue("reviewerNames");
    setModel({...newModel});
  };

  return (
     <RepositorySelectInput
       fieldName={"repository"}
       service={model?.getData("service")}
       gitToolId={model?.getData("gitToolId")}
       workspace={model?.getData("workspace")}
       dataObject={model}
       setDataObject={setModel}
       setDataFunction={setDataFunction}
       clearDataFunction={clearDataFunction}
       disabled={disabled}
     />
  );
}

SalesforceOrganizationSyncTaskRepositorySelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
};

export default SalesforceOrganizationSyncTaskRepositorySelectInput;
