import React, {useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import OctopusStepActions
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/octopus/octopus-step-actions";
import { AuthContext } from "contexts/AuthContext";

function OctopusTomcatSelectInput({ fieldName, dataObject, setDataObject, disabled, textField, valueField, tool_prop}) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [tomcatManagers, setTomcatManagers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [placeholder, setPlaceholder] = useState("Select a Tomcat Instance");


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
      const res = await OctopusStepActions.getTomcatManagerList(dataObject.getData("octopusToolId"),dataObject.getData("spaceId"),getAccessToken);
      if (res && res.status === 200) {
        setTomcatManagers(res.data);
        return;
      }
      setTomcatManagers([]);
    } catch (error) {
      setPlaceholder("No Tomcat Manager Instance Found");
      console.error(error);
      toastContext.showServiceUnavailableDialog();
    }
  };

  const setTomcatDetails = (fieldName, value) => {
    let newDataObject = dataObject;
    newDataObject.setData(fieldName, value.id);
    newDataObject.setData("tomcatManagerDetails", value);
    setDataObject({ ...newDataObject });
  };

  const clearTomcatDetails = () => {    
    let newDataObject = dataObject;
    newDataObject.setData(fieldName, "");
    newDataObject.setData("tomcatManagerDetails", "");
    setDataObject({ ...newDataObject });
  };

  return (
    <div>
      <SelectInputBase
        fieldName={fieldName}
        dataObject={dataObject}
        setDataObject={setDataObject}
        setDataFunction={setTomcatDetails}
        clearDataFunction={clearTomcatDetails}
        selectOptions={tomcatManagers}
        busy={isLoading}
        valueField={valueField}
        textField={textField}
        placeholderText={placeholder}
        disabled={disabled || isLoading || (!isLoading && (tomcatManagers == null || tomcatManagers.length === 0))}
      />
    </div>
  );
}

OctopusTomcatSelectInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  textField: PropTypes.string,
  valueField: PropTypes.string,
  tool_prop: PropTypes.string
};

OctopusTomcatSelectInput.defaultProps = {
  valueField: "id",
  textField: "name"
};

export default OctopusTomcatSelectInput;