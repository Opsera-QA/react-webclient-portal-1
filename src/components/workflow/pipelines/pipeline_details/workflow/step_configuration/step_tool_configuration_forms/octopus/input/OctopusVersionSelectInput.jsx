import React, {useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import OctopusStepActions
  from "../../../../../../../../workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/octopus/octopus-step-actions";
import { AuthContext } from "../../../../../../../../../contexts/AuthContext";

function OctopusVersionSelectInput({ fieldName, dataObject, setDataObject, disabled, textField, valueField, tool_prop, pipelineId}) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [versions, setOctopusVersions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [placeholder, setPlaceholder] = useState("Select a Version");


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
      const res = await OctopusStepActions.getVersions(dataObject.getData("octopusToolId"),dataObject.getData("spaceId"),dataObject.getData("octopusFeedId"),dataObject.getData("ecrPushStepId"),pipelineId, getAccessToken);
      if (res && res.status === 200) {
        setOctopusVersions(res.data);
        return;
      }
      setPlaceholder("No Versions Found");
      setOctopusVersions([]);
    } catch (error) {
      setPlaceholder("No Versions Found");
      console.error(error);
      toastContext.showServiceUnavailableDialog();
    }
  };

  const handleDTOChange = async (fieldName, value) => {
      let newDataObject = dataObject;
      newDataObject.setData("octopusVersion", value);
      setDataObject({ ...newDataObject });
      return;
  };

  return (
    <div>
      <SelectInputBase
        fieldName={fieldName}
        setDataFunction={handleDTOChange}
        dataObject={dataObject}
        setDataObject={setDataObject}
        selectOptions={versions}
        busy={isLoading}
        placeholderText={placeholder}
        disabled={disabled || isLoading || (!isLoading && (versions == null || versions.length === 0))}
      />
    </div>
  );
}

OctopusVersionSelectInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  textField: PropTypes.string,
  valueField: PropTypes.string,
  tool_prop: PropTypes.string,
  pipelineId: PropTypes.string
};

OctopusVersionSelectInput.defaultProps = {
  valueField: "versions",
  textField: "name"
};

export default OctopusVersionSelectInput;