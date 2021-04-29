import React, {useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import OctopusStepActions
  from "../../../../../../../../workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/octopus/octopus-step-actions";
import { AuthContext } from "../../../../../../../../../contexts/AuthContext";
import OctopusTargetMetadata from "../../../octopus-target-metadata";

function CloudProviderSelectInput({ fieldName, dataObject, setDataObject, disabled, textField, valueField, tool_prop}) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [cloudProviders, setCloudProviders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // const [placeholder, setPlaceholder] = useState("Select a Cloud Provider (AWS or Azure)");
  const [placeholder, setPlaceholder] = useState("Select a Cloud Provider");

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
      const res = await OctopusStepActions.getCloudOptions(dataObject.getData("toolId"), dataObject.getData("spaceId"), getAccessToken);
      if (res && res.status === 200) {
        setCloudProviders(res.data);
        return;
      }
      setCloudProviders([]);
    } catch (error) {
      setPlaceholder("No configured cloud providers found");
      console.error(error);
      toastContext.showServiceUnavailableDialog();
    }
  };

  const handleDTOChange = async (fieldName, value) => {
    if (fieldName === "cloudType") {
      let newDataObject = dataObject;
      newDataObject.setData("cloudType", value);
      newDataObject.setData("communicationStyle", "");
      if(value === "TentaclePassive"){
        newDataObject.setData("communicationStyle", value);
        newDataObject.setMetaDataFields(OctopusTargetMetadata.fieldsIis);
      }
      setDataObject({ ...newDataObject });
      return;
    }
  };

  return (
    <div>
      <SelectInputBase
        fieldName={fieldName}
        dataObject={dataObject}
        setDataObject={setDataObject}
        setDataFunction={handleDTOChange}
        selectOptions={cloudProviders}
        busy={isLoading}
        valueField={valueField}
        textField={textField}
        placeholderText={placeholder}
        disabled={disabled || isLoading || (!isLoading && (cloudProviders == null || cloudProviders.length === 0))}
      />
    </div>
  );
}

CloudProviderSelectInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  textField: PropTypes.string,
  valueField: PropTypes.string,
  tool_prop: PropTypes.string
};

CloudProviderSelectInput.defaultProps = {
  valueField: "value",
  textField: "text"
};

export default CloudProviderSelectInput;