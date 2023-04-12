import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import MultiSelectInputBase from "components/common/inputs/multi_select/MultiSelectInputBase";
import useComponentStateReference from "hooks/useComponentStateReference";

function SalesforceComponentNameMultiSelectInput(
  {
    fieldName,
    model,
    setModel,
    formatDataFunction,
    textField,
    valueField,
    setDataFunction,
    clearDataFunction,
    className,
    data,
    placeholderText,
  }) {
  const [salesforceComponentNames, setSalesforceComponentNames] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(undefined);
  const {isMounted, cancelTokenSource, getAccessToken} =
    useComponentStateReference();

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

  const loadComponentNames = async () => {
    setSalesforceComponentNames(data);
  };

  const disabled = model.getArrayData('selectedComponentFilterData').length === 0;
  console.log("disabled", disabled);

  return (
    <MultiSelectInputBase
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      selectOptions={salesforceComponentNames}
      busy={isLoading}
      valueField={valueField}
      error={error}
      textField={textField}
      placeholderText={placeholderText}
      disabled={disabled || isLoading}
      pluralTopic={"Filters"}
    />
  );
}

SalesforceComponentNameMultiSelectInput.propTypes = {
  className: PropTypes.string,
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  textField: PropTypes.string,
  valueField: PropTypes.string,
  formatDataFunction: PropTypes.func,
  setDataFunction: PropTypes.func,
  clearDataFunction: PropTypes.func,
  data: PropTypes.any,
  placeholderText: PropTypes.string,
};

SalesforceComponentNameMultiSelectInput.defaultProps = {
  textField: "name",
};

export default SalesforceComponentNameMultiSelectInput;
