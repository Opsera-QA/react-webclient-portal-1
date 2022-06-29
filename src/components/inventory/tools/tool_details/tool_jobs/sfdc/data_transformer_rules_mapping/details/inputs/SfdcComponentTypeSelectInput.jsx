import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import axios from "axios";
import {DialogToastContext} from "contexts/DialogToastContext";
import { AuthContext } from "contexts/AuthContext";
import sfdcDataTransformerRulesActions from "../../sfdc-data-transformer-rules-actions";

function SfdcComponentTypeSelectInput({ fieldName, model, setModel, disabled, textField, valueField, toolId, operation}) {
  const toastContext = useContext(DialogToastContext);
  const [componentTypes, setComponentTypes] = useState([]);
  const [transformedComponentTypes, setTransformedComponentTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const { getAccessToken } = useContext(AuthContext);
  const [placeholder, setPlaceholderText] = useState("Select Component Type");


  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    if (!disabled) {
      loadData(source).catch((error) => {
        if (isMounted?.current === true) {
          throw error;
        }
      });
    }

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [toolId]);

  useEffect(() => {
    if (!disabled) {
      const newModel = {...model};    
      newModel.setDefaultValue("componentType");
      setModel(newModel);
      transformComponentTypes(componentTypes);
    }    
  }, [operation]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await loadComponentTypes(cancelSource);
    }
    catch (error) {
      toastContext.showLoadingErrorDialog(error);
    }
    finally {
      setIsLoading(false);
    }
  };

  const loadComponentTypes = async (cancelSource = cancelTokenSource) => {
    try {
      const res = await sfdcDataTransformerRulesActions.getComponentTypes(getAccessToken, cancelSource, toolId);
      
      const componentTypes = res?.data?.data;

      if(Array.isArray(componentTypes)) {
        transformComponentTypes(componentTypes);
        setComponentTypes(componentTypes);
        return;
      }
      setComponentTypes([]);
      if (!isLoading && (componentTypes == null || componentTypes.length === 0)) {
        setPlaceholderText("No Component Types found");
      }
    } catch (error) {
      if (!isLoading && (componentTypes == null || componentTypes.length === 0)) {
        setPlaceholderText("Component Types information is missing or unavailable!");
      }
      console.error(error);
      toastContext.showLoadingErrorDialog(error);
    }
  };

  const transformComponentTypes = (inputComponentTypes) => {
    if (operation === "exclude") {
      let newComponentTypes = [...inputComponentTypes];
      setTransformedComponentTypes(newComponentTypes.filter(comp => comp.xml));
      return;
    } else if (operation === "search_and_replace") {
      let newComponentTypes = [...inputComponentTypes];
      newComponentTypes.unshift({name: "All", value: "All"});
      setTransformedComponentTypes([...newComponentTypes]);
      return;
    }

    setTransformedComponentTypes([...inputComponentTypes]);

  };

  const setDataFunction = (fieldName, selectedOption) => {    
    let newModel = {...model};
    newModel.setData("componentType", selectedOption?.name);
    newModel.setData("isXml", selectedOption?.xml);
    setModel({...newModel});
  };

  return (
      <SelectInputBase
        fieldName={fieldName}
        dataObject={model}
        setDataObject={setModel}
        selectOptions={transformedComponentTypes}
        busy={isLoading}
        valueField={valueField}
        textField={textField}
        placeholderText={placeholder}
        disabled={disabled || isLoading}
        setDataFunction={setDataFunction}
      />
  );
}

SfdcComponentTypeSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  textField: PropTypes.string,
  valueField: PropTypes.string,
  toolId: PropTypes.string,
  operation: PropTypes.string,
};

SfdcComponentTypeSelectInput.defaultProps = {
  valueField: "name",
  textField: "name",
  fieldName: "componentType",
  disabled: false
};

export default SfdcComponentTypeSelectInput;
