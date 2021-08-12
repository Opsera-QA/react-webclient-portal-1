import React, {useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import OctopusStepActions
  from "../../../../../../../../workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/octopus/octopus-step-actions";
import { AuthContext } from "../../../../../../../../../contexts/AuthContext";

function OctopusPlatformTypeSelectInput({ fieldName, dataObject, setDataObject, disabled, textField, valueField, tool_prop}) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [platformType, setOctopusPlatformTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [placeholder, setPlaceholder] = useState("Select a Platform Type");


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
      const res = await OctopusStepActions.getPlatformTypes(dataObject.getData("octopusToolId"),dataObject.getData("spaceId"), getAccessToken);
      if (res && res.status === 200) {
        setOctopusPlatformTypes(res.data);
        return;
      }
      setOctopusPlatformTypes([]);
    } catch (error) {
      setPlaceholder("No Platform Type Found");
      console.error(error);
      toastContext.showServiceUnavailableDialog();
    }
  };

  const handleDTOChange = async (fieldName, value) => {
    if (fieldName === "octopusPlatformType") {
      let newDataObject = dataObject;
      newDataObject.setData("octopusPlatformType", value);
      newDataObject.setData("namespace", "");
      newDataObject.setData("octopusFeedId", "");
      newDataObject.setData("octopusDeploymentType", "");
      newDataObject.setData("octopusVersion", "");
      newDataObject.setData("packageId", "");
      newDataObject.setData("scriptSource", "");
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
        selectOptions={platformType}
        busy={isLoading}
        // valueField={valueField}
        // textField={textField}
        placeholderText={placeholder}
        disabled={disabled || isLoading || (!isLoading && (platformType == null || platformType.length === 0))}
      />
    </div>
  );
}

OctopusPlatformTypeSelectInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  textField: PropTypes.string,
  valueField: PropTypes.string,
  tool_prop: PropTypes.string
};

OctopusPlatformTypeSelectInput.defaultProps = {
  valueField: "id",
  textField: "name"
};

export default OctopusPlatformTypeSelectInput;