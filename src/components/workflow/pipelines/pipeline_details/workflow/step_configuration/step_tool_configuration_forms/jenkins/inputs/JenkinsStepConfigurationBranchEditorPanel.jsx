import React, { useState,useEffect } from "react";
import PropTypes from "prop-types";
import GitBranchInput from "components/common/list_of_values_input/tools/git/GitBranchInput";
import GitUpstreamBranchInput from "components/common/list_of_values_input/tools/git/GitUpstreamBranchInput";
import GitBranchManualRollBackBranchInput from "components/common/list_of_values_input/tools/git/GitBranchManualRollBackBranchInput";
import CheckboxInputBase from "components/common/inputs/boolean/CheckboxInputBase";

const disallowedJobTypes = [
  "SFDC VALIDATE PACKAGE XML",
  "SFDC UNIT TESTING",
  "SFDC DEPLOY"
];

function JenkinsStepConfigurationBranchEditorPanel(
  {
    fieldName,
    dataObject,
    setDataObject,
    disabled,
    gitToolId,
    jobType,
    service,
    workspace,
    repoId,
  }) {
  const toolJobType = dataObject.getData("toolJobType");

  // TODO: Is this necessary?
  useEffect(() => {
    if (toolJobType && toolJobType.includes("SFDC")) {
      let newDataObject = { ...dataObject };
      newDataObject.setData("buildType", "ant");
      setDataObject({ ...newDataObject });
    }
  }, [toolJobType]);

  const getDynamicFields = () => {
    if (jobType === "SFDC BACK UP") {
      return (
        <GitBranchManualRollBackBranchInput
          dataObject={dataObject}
          setDataObject={setDataObject}
        />
      );
    }
    else if (jobType === "SFDC PUSH ARTIFACTS") {
      return (
        <GitUpstreamBranchInput
          dataObject={dataObject}
          setDataObject={setDataObject}
          service={service}
          gitToolId={gitToolId}
          workspace={workspace}
          repoId={repoId}
          clearDataFunction={clearDataFunction}
        />
      );
    }
    else {
      return (
        <GitBranchInput
          fieldName={fieldName}
          service={service}
          gitToolId={gitToolId}
          workspace={workspace}
          repoId={repoId}
          dataObject={dataObject}
          setDataFunction={setDataFunction}
          setDataObject={setDataObject}
          disabled={disabled}
          clearDataFunction={clearDataFunction}
        />
      );
    }
  };

  // TODO: Make new component and move these inside.
  const setDataFunction = (fieldName, selectedOption) => {
    let newDataObject = { ...dataObject };
    newDataObject.setData("branch", selectedOption);
    newDataObject.setData("defaultBranch", selectedOption);
    newDataObject.setData("gitBranch", selectedOption);
    setDataObject({ ...newDataObject });
  };

  const clearDataFunction = () => {
    let newDataObject = { ...dataObject };
    newDataObject.setData("branch", "");
    newDataObject.setData("defaultBranch", "");
    newDataObject.setData("gitBranch", "");
    setDataObject({ ...newDataObject });
  };

  // TODO: Rework
  const valid = () => {
    return (
         service != null && service !== ""
      && gitToolId != null && gitToolId !== ""
      && repoId != null && repoId !== ""
      && !disallowedJobTypes.includes(jobType)
      && !dataObject.getData("isOrgToOrg")
    );
  };


  if (!valid()) {
    return null;
  }

  return (
    <>
      {getDynamicFields()}
      <CheckboxInputBase
        fieldName={"workspaceDeleteFlag"}
        model={dataObject}
        setModel={setDataObject}
        disabled={disabled}
      />
    </>
  );
}

JenkinsStepConfigurationBranchEditorPanel.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  jenkinsList: PropTypes.any,
  repoId: PropTypes.string,
  service: PropTypes.string,
  gitToolId: PropTypes.string,
  jobType: PropTypes.string,
  workspace: PropTypes.string,
};

JenkinsStepConfigurationBranchEditorPanel.defaultProps = {
  fieldName: "gitBranch",
};

export default JenkinsStepConfigurationBranchEditorPanel;
