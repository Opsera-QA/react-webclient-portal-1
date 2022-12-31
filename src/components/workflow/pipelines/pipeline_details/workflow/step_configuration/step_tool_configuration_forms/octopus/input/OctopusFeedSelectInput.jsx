import React, {useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import OctopusStepActions
  from "../../../../../../../../workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/octopus/octopus-step-actions";
import { AuthContext } from "../../../../../../../../../contexts/AuthContext";

function OctopusFeedSelectInput({ fieldName, dataObject, setDataObject, disabled, textField, valueField, tool_prop}) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [feeds, setOctopusFeeds] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [placeholder, setPlaceholder] = useState("Select a Feed");


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
      const res = await OctopusStepActions.getFeedList(dataObject.getData("octopusToolId"),dataObject.getData("spaceId"),getAccessToken);
      if (res && res.status === 200) {
        setOctopusFeeds(res.data);
        return;
      }
      setOctopusFeeds([]);
    } catch (error) {
      setPlaceholder("No Feeds Found");
      console.error(error);
      toastContext.showServiceUnavailableDialog();
    }
  };

  if (dataObject?.getData("octopusPlatformType") && dataObject?.getData("octopusPlatformType") === "Kubernetes") {
    return null;
  }

  if (dataObject?.getData("scriptSource") && dataObject?.getData("scriptSource") === "inline") {
    return null;
  }

  return (
    <div>
      <SelectInputBase
        fieldName={fieldName}
        dataObject={dataObject}
        setDataObject={setDataObject}
        selectOptions={feeds}
        busy={isLoading}
        valueField={valueField}
        textField={textField}
        placeholderText={placeholder}
        disabled={disabled || isLoading || (!isLoading && (feeds == null || feeds.length === 0))}
      />
    </div>
  );
}

OctopusFeedSelectInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  textField: PropTypes.string,
  valueField: PropTypes.string,
  tool_prop: PropTypes.string
};

OctopusFeedSelectInput.defaultProps = {
  valueField: "id",
  textField: "name"
};

export default OctopusFeedSelectInput;