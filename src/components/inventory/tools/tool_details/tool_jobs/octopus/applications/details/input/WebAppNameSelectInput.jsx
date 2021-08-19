import React, {useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import OctopusStepActions
  from "../../../../../../../../workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/octopus/octopus-step-actions";
import { AuthContext } from "../../../../../../../../../contexts/AuthContext";

function WebAppNameSelectInput({ fieldName, dataObject, setDataObject, disabled, textField, valueField, tool_prop}) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [webAppNames, setWebAppNames] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [placeholder, setPlaceholder] = useState("Select a Web App");


  useEffect(() => {
    if (!disabled) {
      loadData();
    }
  }, [tool_prop]);

  const loadData = async () => {
    try {
      setIsLoading(true);
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
      const res = await OctopusStepActions.getWebAppNames(dataObject.getData("toolId"), dataObject.getData("spaceId"), dataObject.getData("accountId"), getAccessToken);
      if (res && res.status === 200) {
        setWebAppNames(res.data);
        return;
      }
      setWebAppNames([]);
    } catch (error) {
      setPlaceholder("No Web Apps Found");
      console.error(error);
      toastContext.showServiceUnavailableDialog();
    }
  };

  const handleDTOChange = async (fieldName, value) => {
    if (fieldName === "webAppName") {
      let newDataObject = dataObject;
      newDataObject.setData("webAppName", value.name);
      newDataObject.setData("resourceGroupName", value.resourceGroup);
      setDataObject({ ...newDataObject });
      return;
    }
  };

  if (dataObject?.getData("communicationStyle").length === 0 || dataObject?.getData("communicationStyle") !== "AzureWebApp") {
    return null;
  }

  return (
    <div>
      <SelectInputBase
        fieldName={fieldName}
        dataObject={dataObject}
        setDataObject={setDataObject}
        setDataFunction={handleDTOChange}
        selectOptions={webAppNames}
        busy={isLoading}
        valueField={valueField}
        textField={textField}
        placeholderText={placeholder}
        disabled={disabled || isLoading || (!isLoading && (webAppNames == null || webAppNames.length === 0))}
      />
    </div>
  );
}

WebAppNameSelectInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  textField: PropTypes.string,
  valueField: PropTypes.string,
  tool_prop: PropTypes.string
};

WebAppNameSelectInput.defaultProps = {
  valueField: "name",
  textField: "name"
};

export default WebAppNameSelectInput;