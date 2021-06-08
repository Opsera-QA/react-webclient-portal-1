import React, { useContext } from "react";
import PropTypes from "prop-types";
import PipelineToolInput from "components/common/list_of_values_input/workflow/pipelines/PipelineToolInput";
import { DialogToastContext } from "contexts/DialogToastContext";

function JenkinsToolConfigIdSelectInput({
  dataObject,
  setDataObject,
  disabled,
  setJenkinsList,
}) {
  const toastContext = useContext(DialogToastContext);

  const handleDTOChange = (fieldName, selectedOption) => {
    if (!selectedOption.configuration) {
      toastContext.showErrorDialog(
        "Connection information missing for this tool!  This Jenkins tool does not have connection details defined in its Tool Registry record.  Please go into Tool Registry and add connection information in order for Opsera to work with this tool."
      );
    } else if (selectedOption.id && selectedOption.configuration) {
      let newDataObject = { ...dataObject };
      newDataObject.setData("toolConfigId", selectedOption.id);
      newDataObject.setData("jenkinsUrl", selectedOption.configuration.jenkinsUrl);
      newDataObject.setData("jUserId", selectedOption.configuration.jUserId);
      newDataObject.setData("jenkinsPort", selectedOption.configuration.jenkinsPort);
      newDataObject.setData("autoScaleEnable", selectedOption.configuration.autoScaleEnable);
      const arr = [
        "gitToolId",
        "repoId",
        "gitUrl",
        "sshUrl",
        "service",
        "gitCredential",
        "gitUserName",
        "repository",
        "workspace",
        "workspaceName",
        "branch",
        "toolJobId",
        "toolJobType",
        "rollbackBranchName",
        "stepIdXML",
        "sfdcDestToolId",
        "destAccountUsername",
        "sfdcToolId",
        "accountUsername",
        "projectId",
        "defaultBranch",
      ];
      arr.forEach((field) => {
        newDataObject.setData(field, "");
      });
      setDataObject({ ...newDataObject });
    }
    
  };
  return (
    <PipelineToolInput
      toolType={"jenkins"}
      toolFriendlyName={"Jenkins"}
      fieldName={"toolConfigId"}
      configurationRequired={true}
      dataObject={dataObject}
      setDataObject={setDataObject}
      setDataFunction={handleDTOChange}
      disabled={disabled}
      setJenkinsList={setJenkinsList}
    />
  );
}

JenkinsToolConfigIdSelectInput.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  setJenkinsList: PropTypes.func,
};

export default JenkinsToolConfigIdSelectInput;
