import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {AuthContext} from "contexts/AuthContext";
import {toolIdentifierActions} from "components/admin/tools/identifiers/toolIdentifier.actions";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import axios from "axios";

function ToolIdentifierSelectInput({ fieldName, dataObject, setDataFunction, setDataObject, disabled, textField, valueField, enabledInToolRegistry, status, clearDataFunction, clearDataDetails}) {
  const { getAccessToken } = useContext(AuthContext);
  const [toolIdentifiers, setToolIdentifiers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(undefined);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    setToolIdentifiers([]);
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
      setError(undefined);
      await loadTools(cancelSource);
    }
    catch (error) {
      if (isMounted?.current === true) {
        setError(error);
      }
    }
    finally {
      if (isMounted?.current === true ) {
        setIsLoading(false);
      }
    }
  };

  const loadTools = async (cancelSource = cancelTokenSource) => {
    let response = await toolIdentifierActions.getToolIdentifiersV2(getAccessToken, cancelSource, status, enabledInToolRegistry);
    const identifiers = response?.data?.data;

    if (Array.isArray(identifiers)) {
      setToolIdentifiers(identifiers);
    }
  };

  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={dataObject}
      setDataObject={setDataObject}
      setDataFunction={setDataFunction}
      selectOptions={toolIdentifiers}
      groupBy={"tool_type_name"}
      busy={isLoading}
      valueField={valueField}
      requireClearDataConfirmation={true}
      lenientClearValueButton={true}
      error={error}
      clearDataFunction={clearDataFunction}
      clearDataDetails={clearDataDetails}
      textField={textField}
      placeholderText={"Select a Tool Identifier"}
      disabled={disabled}
    />
  );
}

ToolIdentifierSelectInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  setDataFunction: PropTypes.func,
  disabled: PropTypes.bool,
  enabledInToolRegistry: PropTypes.bool,
  textField: PropTypes.string,
  valueField: PropTypes.string,
  status: PropTypes.string,
  clearDataFunction: PropTypes.func,
  clearDataDetails: PropTypes.any,
};

ToolIdentifierSelectInput.defaultProps = {
  valueField: "identifier",
  textField: "name"
};

export default ToolIdentifierSelectInput;