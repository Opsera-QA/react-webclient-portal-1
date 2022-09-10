import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import axios from "axios";
import parametersActions from "components/inventory/parameters/parameters-actions";
import {AuthContext} from "contexts/AuthContext";
import ComboBoxInputBase from "components/common/inputs/combo_box/ComboBoxInputBase";
import useComponentStateReference from "hooks/useComponentStateReference";

function CustomParameterComboBoxInput(
  {
    fieldName,
    model,
    setModel,
    className,
    disabled,
    textField,
    valueField,
    allowCreate,
    showLabel,
    setDataFunction,
    requireVaultSavedParameters,
    requireInsensitiveParameters,
  }) {
  const [customParameters, setCustomParameters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(undefined);
  const {
    isMounted,
    cancelTokenSource,
    getAccessToken,
  } = useComponentStateReference();

  useEffect(() => {
    loadData().catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      setError(undefined);
      await loadParameters();
    }
    catch (error) {
      if (isMounted.current === true) {
        setError(error);
      }
    }
    finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const loadParameters = async () => {
    const response = await parametersActions.getParameters(
      getAccessToken,
      cancelTokenSource,
      undefined,
      requireVaultSavedParameters,
      requireInsensitiveParameters,
      );
    const parameters = response?.data?.data;

    if (isMounted?.current === true && Array.isArray(parameters)) {
      setCustomParameters(parameters);
    }
  };

  return (
    <ComboBoxInputBase
      className={className}
      fieldName={fieldName}
      model={model}
      setModel={setModel}
      selectOptions={customParameters}
      busy={isLoading}
      valueField={valueField}
      textField={textField}
      error={error}
      disabled={disabled}
      allowCreate={allowCreate}
      showLabel={showLabel}
      setDataFunction={setDataFunction}
    />
  );
}

CustomParameterComboBoxInput.propTypes = {
  className: PropTypes.string,
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  textField: PropTypes.string,
  valueField: PropTypes.string,
  allowCreate: PropTypes.bool,
  showLabel: PropTypes.bool,
  setDataFunction: PropTypes.func,
  requireVaultSavedParameters: PropTypes.bool,
  requireInsensitiveParameters: PropTypes.bool,
};

CustomParameterComboBoxInput.defaultProps = {
  valueField: "_id",
  textField: "name",
};

export default CustomParameterComboBoxInput;