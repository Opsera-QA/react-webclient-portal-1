import React, {useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import OctopusStepActions
  from "../../../../../../../../workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/octopus/octopus-step-actions";
import { AuthContext } from "../../../../../../../../../contexts/AuthContext";

function NexusRepoSelectInput({ fieldName, dataObject, setDataObject, disabled, textField, valueField, tool_prop}) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [nexusRepos, setNexusRepos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [placeholder, setPlaceholder] = useState("Select a Nexus Repository")


  useEffect(() => {
    if (!disabled && tool_prop && tool_prop.length > 0) {
      loadData();
    }
  }, [tool_prop]);

  const loadData = async () => {
    try {
      setIsLoading(true)
      await loadTypes();
    }
    catch (error) {
      toastContext.showLoadingErrorDialog(error);
    }
    finally {
      setIsLoading(false);
    }
  };

  const loadTypes = async () => {
    try {
      const res = await OctopusStepActions.getNexusRepos(dataObject.getData("nexusToolId"), getAccessToken)
      if (res && res.status === 200) {
        setNexusRepos(res.data)
        return
      }
      setNexusRepos([]);
    } catch (error) {
      setNexusRepos([]);
      let newDataObject = dataObject;
      newDataObject.setData("nexusRepository", "");
      setDataObject({ ...newDataObject });
      setPlaceholder("No Nexus Repositories Found")
      console.error(error);
      toastContext.showServiceUnavailableDialog();
    }
  };

  const handleDTOChange = async (fieldName, value) => {
    if (fieldName === "nexusRepository") {
      let newDataObject = dataObject;
      newDataObject.setData("nexusRepository", value.name);
      setDataObject({ ...newDataObject });
      return;
    }
  }

  return (
    <div>
      <SelectInputBase
        fieldName={fieldName}
        dataObject={dataObject}
        setDataObject={setDataObject}
        setDataFunction={handleDTOChange}
        selectOptions={nexusRepos}
        busy={isLoading}
        valueField={valueField}
        textField={textField}
        placeholderText={placeholder}
        disabled={disabled || isLoading || (!isLoading && (nexusRepos == null || nexusRepos.length === 0))}
      />
    </div>
  );
}

NexusRepoSelectInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  textField: PropTypes.string,
  valueField: PropTypes.string,
  tool_prop: PropTypes.string
};

NexusRepoSelectInput.defaultProps = {
  valueField: "name",
  textField: "name"
};

export default NexusRepoSelectInput;