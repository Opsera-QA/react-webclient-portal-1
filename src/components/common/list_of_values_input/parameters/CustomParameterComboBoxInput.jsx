import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import axios from "axios";
import parametersActions from "components/inventory/parameters/parameters-actions";
import {AuthContext} from "contexts/AuthContext";
import ComboBoxInputBase from "components/common/inputs/combo_box/ComboBoxInputBase";

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
    requireVaultSavedParameters,
    setDataFunction,
  }) {
  const { getAccessToken } = useContext(AuthContext);
  const [customParameters, setCustomParameters] = useState([]);
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
      await loadParameters(cancelSource);
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

  const loadParameters = async (cancelSource = cancelTokenSource) => {
    const response = await parametersActions.getParameters(getAccessToken, cancelSource);
    const regions = response?.data?.data;

    if (isMounted?.current === true && Array.isArray(regions)) {
      setCustomParameters(regions);
    }
  };

  return (
    <ComboBoxInputBase
      className={className}
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
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
  requireVaultSavedParameters: PropTypes.bool,
  setDataFunction: PropTypes.func,
};

CustomParameterComboBoxInput.defaultProps = {
  valueField: "_id",
  textField: "name",
};

export default CustomParameterComboBoxInput;