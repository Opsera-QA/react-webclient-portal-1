import React, {useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import OctopusStepActions
  from "../../../../../../../../workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/octopus/octopus-step-actions";
import { AuthContext } from "../../../../../../../../../contexts/AuthContext";

// TODO: Clean up, make generic, and put in /common/list_of_value_inputs
function OctopusEnvironmentNameSelectInput({ fieldName, dataObject, setDataObject, disabled, textField, valueField, tool_prop}) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [environmentNames, setOctopusEnvironmentNames] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [placeholder, setPlaceholder] = useState("Select an Environment");


  useEffect(() => {
    if (!disabled) {
      setOctopusEnvironmentNames([]);
      loadData();
    }
    if (disabled && tool_prop.length > 0) {
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
      const res = await OctopusStepActions.getEnvironments(dataObject.getData("octopusToolId"),dataObject.getData("spaceId"), getAccessToken);
      if (res && res.status === 200) {
        setOctopusEnvironmentNames(res.data);
        return;
      }
      setOctopusEnvironmentNames([]);
    } catch (error) {
      setPlaceholder("No Environments Found");
      console.error(error);
      toastContext.showServiceUnavailableDialog();
    }
  };

  const handleDTOChange = async (fieldName, value) => {
    dataObject.setData("environmentName","");
    dataObject.setData("environmentId", "");
    if (fieldName === "environmentName") {
      let newDataObject = dataObject;
      newDataObject.setData("environmentName", value.name);
      newDataObject.setData("environmentId", value.id);
      setDataObject({ ...newDataObject });
      return;
    }
  };

  return (
    <div>
      <SelectInputBase
        setDataFunction={handleDTOChange}
        fieldName={fieldName}
        dataObject={dataObject}
        setDataObject={setDataObject}
        selectOptions={environmentNames ? environmentNames : []}
        busy={isLoading}
        valueField={valueField}
        textField={textField}
        placeholderText={placeholder}
        disabled={disabled || isLoading || (!isLoading && (environmentNames == null || environmentNames.length === 0))}
      />
    </div>
  );
}

OctopusEnvironmentNameSelectInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  textField: PropTypes.string,
  valueField: PropTypes.string,
  tool_prop: PropTypes.string
};

OctopusEnvironmentNameSelectInput.defaultProps = {
  valueField: "id",
  textField: "name"
};

export default OctopusEnvironmentNameSelectInput;