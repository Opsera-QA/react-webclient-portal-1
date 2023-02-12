import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import useComponentStateReference from "hooks/useComponentStateReference";
import parametersActions from "components/inventory/parameters/parameters-actions";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

export default function CustomParameterSelectInput(
  {
    fieldName,
    model,
    setModel,
    className,
    disabled,
    textField,
    valueField,
    showLabel,
    requireVaultSavedParameters,
    requireInsensitiveParameters,
    setDataFunction,
  }) {
  const [error, setError] = useState(undefined);
  const [parameters, setParameters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const {
    isMounted,
    cancelTokenSource,
    getAccessToken,
  } = useComponentStateReference();

  useEffect(() => {
    if (disabled !== true) {
      loadData().catch((error) => {
        if (isMounted?.current === true) {
          throw error;
        }
      });
    }
  }, []);

  const loadData = async () => {
    try {
      setError(undefined);
      setIsLoading(true);
      await loadParameters();
    } catch (error) {
      if (isMounted?.current === true) {
        setError(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const loadParameters = async (cancelSource = cancelTokenSource) => {
    const response = await parametersActions.getParameters(
      getAccessToken,
      cancelSource,
      undefined,
      requireVaultSavedParameters,
      requireInsensitiveParameters,
    );
    const parameters = DataParsingHelper.parseNestedArray(response, "data.data");

    if (isMounted?.current === true) {
      setParameters(parameters);
    }
  };

  return (
    <SelectInputBase
      className={className}
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      selectOptions={parameters}
      busy={isLoading}
      valueField={valueField}
      textField={textField}
      error={error}
      disabled={disabled}
      showLabel={showLabel}
      setDataFunction={setDataFunction}
    />
  );
}

CustomParameterSelectInput.propTypes = {
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
  requireInsensitiveParameters: PropTypes.bool,
};

CustomParameterSelectInput.defaultProps = {
  valueField: "_id",
  textField: "name",
};
