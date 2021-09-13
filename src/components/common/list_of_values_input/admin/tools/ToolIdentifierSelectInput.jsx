import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";
import toolManagementActions from "components/admin/tools/tool-management-actions";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import axios from "axios";

function ToolIdentifierSelectInput({ fieldName, dataObject, setDataFunction, setDataObject, disabled, textField, valueField, enabledInToolRegistry, status, clearDataFunction, clearDataDetails}) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [toolIdentifiers, setToolIdentifiers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
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
      await loadTools(cancelSource);
    }
    catch (error) {
      if (isMounted?.current === true) {
        console.error(error);
        toastContext.showLoadingErrorDialog(error);
      }
    }
    finally {
      if (isMounted?.current === true ) {
        setIsLoading(false);
      }
    }
  };

  const loadTools = async (cancelSource = cancelTokenSource) => {
    let response = await toolManagementActions.getToolIdentifiersV2(getAccessToken, cancelSource, status, enabledInToolRegistry);
    const newToolIdentifiers = response?.data;

    if (Array.isArray(newToolIdentifiers) && newToolIdentifiers.length > 0) {
      setToolIdentifiers(newToolIdentifiers);
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
      clearDataFunction={clearDataFunction}
      clearDataDetails={clearDataDetails}
      textField={textField}
      placeholderText={"Select a Tool Identifier"}
      disabled={disabled || isLoading}
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