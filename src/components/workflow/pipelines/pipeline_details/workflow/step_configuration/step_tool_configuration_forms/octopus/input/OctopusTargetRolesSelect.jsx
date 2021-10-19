import React, {useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import OctopusStepActions
  from "../../../../../../../../workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/octopus/octopus-step-actions";
import { AuthContext } from "../../../../../../../../../contexts/AuthContext";
import MultiSelectInputBase from "components/common/inputs/multi_select/MultiSelectInputBase";

function OctopusTargetRolesSelectInput({ fieldName, dataObject, setDataObject, disabled, textField, valueField, tool_prop}) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [targetRoles, setOctopusTargetRoless] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [placeholder, setPlaceholder] = useState("Select Target Roles");


  useEffect(() => {
    if (!disabled) {
      setOctopusTargetRoless([]);
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
      const res = await OctopusStepActions.getTargetRoles(dataObject.getData("octopusToolId"),dataObject.getData("spaceId"), getAccessToken);
      if (res && res.status === 200) {
        setOctopusTargetRoless(res.data);
        return;
      }
      setOctopusTargetRoless([]);
    } catch (error) {
      setPlaceholder("No Target Roles Found");
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
        selectOptions={targetRoles ? targetRoles : []}
        busy={isLoading}
        // valueField={valueField}
        // textField={textField}
        placeholderText={placeholder}
        disabled={disabled || isLoading || (!isLoading && (targetRoles == null || targetRoles.length === 0))}
      />
    </div>
  );
}

OctopusTargetRolesSelectInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  textField: PropTypes.string,
  valueField: PropTypes.string,
  tool_prop: PropTypes.string
};

OctopusTargetRolesSelectInput.defaultProps = {
  valueField: "id",
  textField: "name"
};

export default OctopusTargetRolesSelectInput;