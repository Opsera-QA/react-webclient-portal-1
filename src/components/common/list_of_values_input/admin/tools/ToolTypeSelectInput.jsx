import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import axios from "axios";
import {AuthContext} from "contexts/AuthContext";
import {toolCategoryActions} from "components/admin/tools/tool_category/toolCategory.actions";

function ToolTypeSelectInput(
  {
    fieldName,
    model,
    setModel,
    setDataFunction,
    disabled,
    textField,
    valueField,
    includeInactive,
  }) {
  const { getAccessToken } = useContext(AuthContext);
  const [toolTypes, setToolTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;
    setError(undefined);

    loadData(source).catch((error) => {
      if (isMounted?.current === true) {
        setError(error);
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
      await loadToolTypes(cancelSource);
    }
    catch (error) {
      if (isMounted?.current === true) {
        setError(error);
      }
    }
    finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const loadToolTypes = async (cancelSource = cancelTokenSource) => {
    const response = await toolCategoryActions.getToolTypesV2(
      getAccessToken,
      cancelSource,
      includeInactive,
      );

    const toolTypes = response?.data?.data;

    if (isMounted.current === true && Array.isArray(toolTypes)) {
      setToolTypes(toolTypes);
    }
  };

  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      setDataFunction={setDataFunction}
      selectOptions={toolTypes}
      busy={isLoading}
      valueField={valueField}
      textField={textField}
      disabled={disabled}
      error={error}
    />
  );
}

ToolTypeSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  setDataFunction: PropTypes.func,
  disabled: PropTypes.bool,
  textField: PropTypes.string,
  valueField: PropTypes.string,
  includeInactive: PropTypes.bool,
};

ToolTypeSelectInput.defaultProps = {
  valueField: "identifier",
  textField: "name",
};

export default ToolTypeSelectInput;