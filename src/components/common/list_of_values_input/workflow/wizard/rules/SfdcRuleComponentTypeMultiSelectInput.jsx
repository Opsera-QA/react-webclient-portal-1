import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import axios from "axios";
import {AuthContext} from "contexts/AuthContext";
import MultiSelectInputBase from "components/common/inputs/multi_select/MultiSelectInputBase";
import sfdcPipelineActions from "components/workflow/wizards/sfdc_pipeline_wizard/sfdc-pipeline-actions";

function SfdcRuleComponentTypeMultiSelectInput({fieldName, className, dataObject, setDataObject, disabled, showLabel, fetchAttribute, pipelineWizardModel}) {
  const { getAccessToken } = useContext(AuthContext);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [componentTypes, setComponentTypes] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    loadData(source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await getComponentTypes(cancelSource);
    }
    catch (error) {
      if (isMounted?.current === true) {
        setErrorMessage("Could not load component types.");
        console.error(error);
      }
    }
    finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const getComponentTypes = async (cancelSource = cancelTokenSource) => {
    const response = await sfdcPipelineActions.getSfdcComponentListValues(getAccessToken, cancelSource, pipelineWizardModel, "componentType", fetchAttribute);

    const componentTypes = response?.data;

    if (isMounted?.current === true && Array.isArray(componentTypes) && componentTypes.length > 0) {
      setComponentTypes(componentTypes);
    }
  };

  const setDataFunction = (newDataObject) => {
    newDataObject.setData("values", []);
    setDataObject({...newDataObject});
  };

  return (
    <MultiSelectInputBase
      className={className}
      fieldName={fieldName}
      dataObject={dataObject}
      setDataObject={setDataFunction}
      selectOptions={componentTypes}
      placeholderText={"All Components"}
      errorMessage={errorMessage}
      busy={isLoading}
      valueField={"id"}
      textField={"id"}
      disabled={disabled}
      showLabel={showLabel}
    />
  );
}

SfdcRuleComponentTypeMultiSelectInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  showLabel: PropTypes.bool,
  fetchAttribute: PropTypes.string,
  pipelineWizardModel: PropTypes.object
};

SfdcRuleComponentTypeMultiSelectInput.defaultProps = {
  fieldName: "componentTypes",
};

export default SfdcRuleComponentTypeMultiSelectInput;