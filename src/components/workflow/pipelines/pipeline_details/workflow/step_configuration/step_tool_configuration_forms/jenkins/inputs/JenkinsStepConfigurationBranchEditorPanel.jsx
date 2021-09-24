import React, { useState,useEffect } from "react";
import PropTypes from "prop-types";
import GitBranchInput from "components/common/list_of_values_input/tools/git/GitBranchInput";
import GitUpstreamBranchInput from "components/common/list_of_values_input/tools/git/GitUpstreamBranchInput";
import GitBranchManualRollBackBranchInput from "components/common/list_of_values_input/tools/git/GitBranchManualRollBackBranchInput";
import { Form } from "react-bootstrap";

const excludeArrs = [
  "SFDC VALIDATE PACKAGE XML",
  "SFDC UNIT TESTING",
  "SFDC DEPLOY"
];

function JenkinsStepConfigurationBranchEditorPanel({ fieldName, dataObject, setDataObject, disabled, jenkinsList }) {
  const [branchList, setBranchList] = useState([]);
  const toolJobType = dataObject.getData("toolJobType");
  useEffect(() => {
    if (toolJobType && toolJobType.includes("SFDC")) {
      let newDataObject = { ...dataObject };
      newDataObject.setData("buildType", "ant");
      setDataObject({ ...newDataObject });

      
    }
  }, [toolJobType]);

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

  const handleWorkspaceDeleteFlagChange = (value) => {
    let newDataObject = { ...dataObject };
    newDataObject.setData("workspaceDeleteFlag", value);
    setDataObject({ ...newDataObject });
  };

  const valid = () => {
    return (
      dataObject.getData("service") &&
      dataObject.getData("gitToolId") &&
      dataObject.getData("repoId") &&     
      !excludeArrs.some(item=>item==dataObject.getData("jobType")) &&
      !dataObject.getData("isOrgToOrg")
      
    );
  };

  const getDynamicFields = () => {
    if (dataObject.getData("jobType") === "SFDC BACK UP") {
      return (
        <GitBranchManualRollBackBranchInput dataObject={dataObject} setDataObject={setDataObject}/>
      );
    }

    if (dataObject.getData("jobType") === "SFDC PUSH ARTIFACTS") {
      return (
        <GitUpstreamBranchInput
          dataObject={dataObject}
          setDataObject={setDataObject}
          options={branchList}
          handleDTOChange={setDataFunction}
          clearDataFunction={clearDataFunction}
        />
      );
    }
  };
  if (dataObject === null || !valid()) {
    return null;
  }

  return (
    <>
      <GitBranchInput
        fieldName={fieldName}
        service={dataObject.getData("service")}
        gitToolId={dataObject.getData("gitToolId")}
        workspace={dataObject.getData("workspace")}
        repoId={dataObject.getData("repoId")}
        dataObject={dataObject}
        setDataFunction={setDataFunction}
        setDataObject={setDataObject}
        disabled={disabled}
        setBranchList={setBranchList}
        clearDataFunction={clearDataFunction}
        visible ={!(dataObject.getData("jobType") === "SFDC BACK UP")}
      />
      {getDynamicFields()}
      <Form.Group controlId="workspaceDeleteFlag">
        <Form.Check
          inline
          type="checkbox"
          label={"Delete the Workspace before building."}
          id={`workspaceDeleteFlag`}
          checked={dataObject.getData("workspaceDeleteFlag")}
          onChange={(e) => handleWorkspaceDeleteFlagChange(e.target.checked)}
        />
      </Form.Group>
    </>
  );
}

JenkinsStepConfigurationBranchEditorPanel.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  jenkinsList: PropTypes.any,
};

JenkinsStepConfigurationBranchEditorPanel.defaultProps = {
  fieldName: "branch",
};

export default JenkinsStepConfigurationBranchEditorPanel;
