import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import OctopusStepActions
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/octopus/octopus-step-actions";
import { AuthContext } from "contexts/AuthContext";
import axios from "axios";

function OctopusTomcatSelectInput({ fieldName, dataObject, setDataObject, disabled, textField, valueField, platformType}) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [tomcatManagers, setTomcatManagers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [placeholder, setPlaceholder] = useState("Select a Tomcat Instance");
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);

    isMounted.current = true;
    setTomcatManagers([]);
    loadData(source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [platformType]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await loadTomcatManagerList(cancelSource);
    }
    catch (error) {
      if (isMounted?.current === true) {
        setPlaceholder("Error Pulling Tomcat Instances");
        console.error(error);
        toastContext.showLoadingErrorDialog(error);
      }
    }
    finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const loadTomcatManagerList = async (cancelSource = cancelTokenSource) => {
    const response = await OctopusStepActions.getTomcatManagerListV2(getAccessToken, cancelSource, dataObject.getData("octopusToolId"),dataObject.getData("spaceId"));
    const data = response?.data;

    if (isMounted?.current === true && Array.isArray(data)) {
      setTomcatManagers(data);
    }
  };

  const setDataFunction = (fieldName, value) => {
    let newDataObject = dataObject;
    newDataObject.setData(fieldName, value.id);
    newDataObject.setData("tomcatManagerDetails", value);
    setDataObject({ ...newDataObject });
  };

  const clearDataFunction = () => {    
    let newDataObject = dataObject;
    newDataObject.setData(fieldName, "");
    newDataObject.setData("tomcatManagerDetails", "");
    setDataObject({ ...newDataObject });
  };

  return (    
    <SelectInputBase
      fieldName={fieldName}
      dataObject={dataObject}
      setDataObject={setDataObject}
      setDataFunction={setDataFunction}
      clearDataFunction={clearDataFunction}
      selectOptions={tomcatManagers}
      busy={isLoading}
      valueField={valueField}
      textField={textField}
      placeholderText={placeholder}
      disabled={disabled || isLoading}
    />    
  );
}

OctopusTomcatSelectInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  textField: PropTypes.string,
  valueField: PropTypes.string,
  platformType: PropTypes.string
};

OctopusTomcatSelectInput.defaultProps = {
  valueField: "id",
  textField: "name"
};

export default OctopusTomcatSelectInput;