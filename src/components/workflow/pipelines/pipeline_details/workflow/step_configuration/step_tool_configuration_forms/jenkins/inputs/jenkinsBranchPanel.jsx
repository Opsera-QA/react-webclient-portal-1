import React, { useState } from "react";
import PropTypes from "prop-types";
import GitBranchInput from "components/common/list_of_values_input/tools/git/GitBranchInput";
import GitUpstreamBranchInput from "components/common/list_of_values_input/tools/git/GitUpstreamBranchInput";
import GitBranchManualRollBackBranchInput from "components/common/list_of_values_input/tools/git/GitBranchManualRollBackBranchInput";
import { Form } from "react-bootstrap";

function JenkinsBranchPanel({ fieldName, dataObject, setDataObject, disabled, jenkinsList }) {
  const [branchList, setBranchList] = useState([]);

  const service = dataObject.getData("service");
  const gitToolId = dataObject.getData("gitToolId");
  const repoId = dataObject.getData("repoId");
  const jobType = dataObject.getData("jobType");
  const excludeArrs = [
    "SFDC VALIDATE PACKAGE XML",
    "SFDC UNIT TESTING",
    "SFDC DEPLOY",
    "SFDC BACK UP",
    "SFDC PUSH ARTIFACTS",
  ];
  const isOrgToOrg = dataObject.getData("isOrgToOrg");
  const jenkinsUrl = dataObject.getData("jenkinsUrl");
  const workspaceDeleteFlag = dataObject.getData("workspaceDeleteFlag");

  const handleDTOChange = (fieldName, selectedOption) => {
    let newDataObject = { ...dataObject };
    newDataObject.setData("branch", selectedOption.value);
    newDataObject.setData("defaultBranch", selectedOption.value);
    newDataObject.setData("gitBranch", selectedOption.value);
    setDataObject({ ...newDataObject });
  };
  const clearDataFunction = (fieldName) => {
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
      jenkinsUrl &&
      jenkinsList.length > 0 &&
      jobType &&
      jobType.length > 0 &&
      service &&
      gitToolId &&
      repoId &&
      !excludeArrs.includes(jobType) &&
      !isOrgToOrg
    );
  };
  if (!valid()) {
    return null;
  }

  return (
    <>
      <GitBranchInput
        fieldName={"branch"}
        service={dataObject.getData("service")}
        gitToolId={dataObject.getData("gitToolId")}
        workspace={dataObject.getData("workspace")}
        repoId={dataObject.getData("repoId")}
        dataObject={dataObject}
        setDataFunction={handleDTOChange}
        setDataObject={setDataObject}
        disabled={disabled}
        setBranchList={setBranchList}
        clearDataFunction={clearDataFunction}
      />
      <Form.Group controlId="workspaceDeleteFlag">
        <Form.Check
          inline
          type="checkbox"
          label={"Delete workspace before building"}
          id={`workspaceDeleteFlag`}
          checked={workspaceDeleteFlag}
          onChange={(e) => handleWorkspaceDeleteFlagChange(e.target.checked)}
        />
        <Form.Text className="text-muted">Deletes the Jenkins workspace before building.</Form.Text>
      </Form.Group>
      {jobType === "SFDC BACK UP" && (
        <GitBranchManualRollBackBranchInput dataObject={dataObject} setDataObject={setDataObject} />
      )}
      {jobType === "SFDC PUSH ARTIFACTS" && (
        <GitUpstreamBranchInput
          dataObject={dataObject}
          setDataObject={setDataObject}
          options={branchList}
          handleDTOChange={handleDTOChange}
          clearDataFunction={clearDataFunction}
        />
      )}
    </>
  );
}

JenkinsBranchPanel.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  jenkinsList: PropTypes.any,
};

JenkinsBranchPanel.defaultProps = {
  fieldName: "branch",
};

export default JenkinsBranchPanel;
