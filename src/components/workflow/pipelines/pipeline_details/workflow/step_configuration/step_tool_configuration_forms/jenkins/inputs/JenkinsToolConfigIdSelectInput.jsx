import React, { useContext } from "react";
import PropTypes from "prop-types";
import PipelineToolInput from "components/common/list_of_values_input/workflow/pipelines/PipelineToolInput";
import { DialogToastContext } from "contexts/DialogToastContext";

function JenkinsToolConfigIdSelectInput({ dataObject, setDataObject, disabled, setJenkinsList }) {
  const toastContext = useContext(DialogToastContext);

  const setDataFunction = (fieldName, selectedOption) => {
    // TODO: We should be checking for configuration when pulling files and only presenting options that are accessible.
    //  I would suggest showing them in the dropdown with (configuration needed) or (not configured) appended and disabled as selectable options
    //  I think it already removes not configured options this with the configuration needed set to true prop.
    if (!selectedOption?.configuration || !selectedOption?.id) {
      toastContext.showErrorDialog(
        "Connection information missing for this tool!  This Jenkins tool does not have connection details defined in its Tool Registry record.  Please go into Tool Registry and add connection information in order for Opsera to work with this tool."
      );
      return;
    }

    if (selectedOption.id && selectedOption.configuration) {
      let newDataObject = {...dataObject};
      newDataObject.setData("toolConfigId", selectedOption.id);
      newDataObject.setData("jenkinsUrl", selectedOption?.configuration?.jenkinsUrl);
      newDataObject.setData("jUserId", selectedOption?.configuration?.jUserId);
      newDataObject.setData("jenkinsPort", selectedOption?.configuration?.jenkinsPort);
      newDataObject.setData("autoScaleEnable", selectedOption?.configuration?.autoScaleEnable);
      newDataObject.setData("gitToolId", "");
      newDataObject.setData("repoId", "");
      newDataObject.setData("gitUrl", "");
      newDataObject.setData("sshUrl", "");
      newDataObject.setData("service", "");
      newDataObject.setData("gitCredential", "");
      newDataObject.setData("gitUserName", "");
      newDataObject.setData("repository", "");
      newDataObject.setData("workspace", "");
      newDataObject.setData("workspaceName", "");
      newDataObject.setData("branch", "");
      newDataObject.setData("toolJobId", "");
      newDataObject.setData("toolJobType", "");
      newDataObject.setData("rollbackBranchName", "");
      newDataObject.setData("stepIdXML", "");
      newDataObject.setData("sfdcDestToolId", "");
      newDataObject.setData("destAccountUsername", "");
      newDataObject.setData("sfdcToolId", "");
      newDataObject.setData("accountUsername", "");
      newDataObject.setData("projectId", "");
      newDataObject.setData("defaultBranch", "");

      setDataObject({...newDataObject});
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
      setDataFunction={setDataFunction}
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
