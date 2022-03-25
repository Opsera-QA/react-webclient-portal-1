import React, { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import SelectInputBase from "../../../../../common/inputs/select/SelectInputBase";
import { AuthContext } from "../../../../../../contexts/AuthContext";
import axios from "axios";
import { toolCategoryActions } from "../../../../../admin/tools/categories/toolCategory.actions";

function StepConfigurationTypeSelectInput({ dataObject, setDataObject, disabled, fieldName, textField, valueField }) {
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
    } catch (error) {
      if (isMounted?.current === true) {
        setError(error);
      }
    } finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const loadToolTypes = async (cancelSource = cancelTokenSource) => {
    const response = await toolCategoryActions.getToolTypesV2(getAccessToken, cancelSource, false);

    const toolTypes = response?.data?.data;

    if (isMounted.current === true && Array.isArray(toolTypes)) {
      setToolTypes(toolTypes);
    }
  };

  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={dataObject}
      setDataObject={setDataObject}
      selectOptions={toolTypes}
      placeholderText={"Select a Step Type"}
      disabled={disabled}
      busy={isLoading}
      valueField={valueField}
      textField={textField}
      error={error}
    />
  );
}

StepConfigurationTypeSelectInput.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  fieldName: PropTypes.string,
  textField: PropTypes.string,
  valueField: PropTypes.string,
};

StepConfigurationTypeSelectInput.defaultProps = {
  fieldName: "type",
  valueField: "identifier",
  textField: "name",
};

export default StepConfigurationTypeSelectInput;
