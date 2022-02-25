import React from "react";
import PropTypes from "prop-types";
import RepositorySelectInput from "components/common/list_of_values_input/tools/repositories/RepositorySelectInput";

function ArgoCdStepGitRepositorySelectInput({className, fieldName, model, setModel, disabled}) {
  const setDataFunction = (fieldName, selectedOption) => {
    let newModel = model;
    let repoName = selectedOption?.name;
    if (model?.getData("type") === "gitlab") {
      let re = /\.com:(.*)\.git/;
      let matches = re.exec(selectedOption?.sshUrl);
      if (matches.length === 0) {
        let errorMessage = "Error fetching gitlab workspace";
        // toastContext.showErrorDialog(errorMessage);
        return;
      }
      repoName = matches[1];
    }
    const repoId = selectedOption?.id || selectedOption?.repositoryId || "";
    const gitUrl = selectedOption?.httpUrl || selectedOption?.remoteUrl || "";
    newModel.setData("gitRepository", repoName);
    newModel.setData("gitRepositoryID", repoId);
    newModel.setData("gitUrl", gitUrl);
    newModel.setData("sshUrl", selectedOption?.sshUrl || "");
    setModel({ ...newModel });
  };

  return (
    <RepositorySelectInput
      gitToolId={model?.getData("gitToolId")}
      workspace={model?.getData("bitbucketWorkspace")}
      service={model?.getData("type")}
      fieldName={fieldName}
      configurationRequired={true}
      dataObject={model}
      setDataObject={setModel}
      setDataFunction={setDataFunction}
      disabled={disabled}
      className={className}
    />
  );
}

ArgoCdStepGitRepositorySelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  fieldName: PropTypes.string,
};

ArgoCdStepGitRepositorySelectInput.defaultProps = {
  fieldName: "gitRepository",
};

export default ArgoCdStepGitRepositorySelectInput;