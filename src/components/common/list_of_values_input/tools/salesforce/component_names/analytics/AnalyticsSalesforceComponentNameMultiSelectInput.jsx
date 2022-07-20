import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import MultiSelectInputBase from "components/common/inputs/multi_select/MultiSelectInputBase";
import useComponentStateReference from "hooks/useComponentStateReference";
import { insightsLookupActions } from "components/insights/lookup/insightsLookup.actions";

function AnalyticsSalesforceComponentNameMultiSelectInput(
  {
    fieldName,
    model,
    setModel,
    disabled,
    formatDataFunction,
    textField,
    valueField,
    setDataFunction,
    clearDataFunction
  }) {
  const [salesforceComponentNames, setSalesforceComponentNames] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(undefined);
  const { isMounted, cancelTokenSource, getAccessToken } = useComponentStateReference();

  useEffect(() => {
    setSalesforceComponentNames([]);

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
      await loadComponentNames();
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

  const loadComponentNames = async () => {
    const response = await insightsLookupActions.getComponentNames(getAccessToken, cancelTokenSource);
    const names = response?.data?.data?.componentNames;

    if (isMounted?.current === true && Array.isArray(names)) {
      setSalesforceComponentNames(names);
    }
  };

  return (
    <MultiSelectInputBase
      setDataFunction={setDataFunction}
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      selectOptions={salesforceComponentNames}
      formatDataFunction={formatDataFunction}
      clearDataFunction={clearDataFunction}
      busy={isLoading}
      valueField={valueField}
      textField={textField}
      disabled={disabled}
      error={error}
    />
  );
}

AnalyticsSalesforceComponentNameMultiSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  textField: PropTypes.string,
  valueField: PropTypes.string,
  formatDataFunction: PropTypes.func,
  setDataFunction: PropTypes.func,
  clearDataFunction: PropTypes.func,
};

AnalyticsSalesforceComponentNameMultiSelectInput.defaultProps = {
  valueField: "id",
  textField: "name"
};

export default AnalyticsSalesforceComponentNameMultiSelectInput;