import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";
import MultiSelectInputBase from "components/common/inputs/multi_select/MultiSelectInputBase";
import axios from "axios";
import {toolIdentifierActions} from "components/admin/tools/identifiers/toolIdentifier.actions";

function ToolIdentifierMultiSelectInput(
  {
    fieldName,
    model,
    setModel,
    setDataFunction,
    disabled,
    textField,
    valueField,
    toolRegistryFilter,
  }) {
  const toastContext = useContext(DialogToastContext);
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
      await loadToolIdentifiers(cancelSource);
    }
    catch (error) {
      toastContext.showLoadingErrorDialog(error);
    }
    finally {
      setIsLoading(false);
    }
  };

  const loadToolIdentifiers = async (cancelSource = cancelTokenSource) => {
    const response = await toolIdentifierActions.getToolIdentifiersV2(
      getAccessToken,
      cancelSource,
      undefined,
      toolRegistryFilter,
      );

    const identifiers = response?.data?.data;

    if (isMounted?.current === true && Array.isArray(identifiers)) {
      setToolIdentifiers(identifiers);
    }
  };

  return (
    <MultiSelectInputBase
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      setDataFunction={setDataFunction}
      selectOptions={toolIdentifiers}
      groupBy={"tool_type_identifier"}
      busy={isLoading}
      valueField={valueField}
      textField={textField}
      error={error}
      disabled={disabled}
    />
  );
}

ToolIdentifierMultiSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  setDataFunction: PropTypes.func,
  disabled: PropTypes.bool,
  toolRegistryFilter: PropTypes.bool,
  textField: PropTypes.string,
  valueField: PropTypes.string
};

ToolIdentifierMultiSelectInput.defaultProps = {
  valueField: "identifier",
  textField: "name"
};

export default ToolIdentifierMultiSelectInput;