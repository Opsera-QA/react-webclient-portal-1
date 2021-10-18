import React, {useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import OctopusStepActions
  from "../../../../../../../../workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/octopus/octopus-step-actions";
import { AuthContext } from "../../../../../../../../../contexts/AuthContext";
import MultiSelectInputBase from "components/common/inputs/multi_select/MultiSelectInputBase";

function EnvironmentNameSelectInput({ fieldName, dataObject, setDataObject, disabled, textField, valueField, tool_prop}) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [environmentNames, setEnvironmentNames] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [placeholder, setPlaceholder] = useState("Select an Environment");


  useEffect(() => {
    if (!disabled) {
      setEnvironmentNames([]);
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
      const res = await OctopusStepActions.getEnvironments(dataObject.getData("toolId"),dataObject.getData("spaceId"), getAccessToken);
      if (res && res.status === 200) {
        setEnvironmentNames(res.data);
        return;
      }
      setEnvironmentNames([]);
    } catch (error) {
      setPlaceholder("No Environments Found");
      console.error(error);
      toastContext.showServiceUnavailableDialog();
    }
  };

  return (
    <div>
      <MultiSelectInputBase
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

EnvironmentNameSelectInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  textField: PropTypes.string,
  valueField: PropTypes.string,
  tool_prop: PropTypes.string
};

EnvironmentNameSelectInput.defaultProps = {
  valueField: "id",
  textField: "name"
};

export default EnvironmentNameSelectInput;