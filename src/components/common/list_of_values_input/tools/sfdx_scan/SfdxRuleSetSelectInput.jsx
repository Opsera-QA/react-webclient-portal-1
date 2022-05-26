import React, { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import axios from "axios";
import { AuthContext } from "contexts/AuthContext";
import toolsActions from "components/inventory/tools/tools-actions";

function SfdxRuleSetSelectInput({
  fieldName,
  model,
  setModel,
  typeFilter,
  disabled,
  setDataFunction,
  clearDataFunction,
  valueField,
  textField,
}) {
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [pmdRules, setPmdRules] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [placeholder, setPlaceholderText] = useState(
    "Select PMD rule set",
  );
  const isMounted = useRef(false);
  const { getAccessToken } = useContext(AuthContext);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    isMounted.current = true;
    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    setErrorMessage("");
    setPmdRules([]);

    loadData(source).catch((error) => {
      throw error;
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await loadPmdRules(cancelSource);
    } catch (error) {
      setPlaceholderText("No Rules Available!");
      setErrorMessage("There was an error pulling rules");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadPmdRules = async (cancelSource = cancelTokenSource) => {
    const response = await toolsActions.getSfdxScanRules(
      getAccessToken,
      cancelTokenSource,
    );
    const rules = response?.data?.data;
    let lookup = {};
    let items = rules;
    let result = [];

    for (let i = 0; items[i]; i++) {
      let name = items[i].category;

      if (!(name in lookup)) {
        lookup[name] = 1;
        result.push(name);
      }
    }

    if (isMounted?.current === true && Array.isArray(result)) {
      setPlaceholderText("Select Rule");


      setPmdRules([...result]);

      const existingRule = model?.getData(fieldName);

      if (
          Array.isArray(result) &&
          existingRule != null &&
          existingRule !== ""
      ) {
        const existingRepositoryExists = result.includes(existingRule.toString());

        if (existingRepositoryExists == null) {
          setErrorMessage(
              "Previously saved rule is no longer available. It may have been deleted. Please select another rule from the list.",
          );
        }
      }
    }
  };

  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      groupBy={"category"}
      selectOptions={pmdRules}
      busy={isLoading}
      setDataFunction={setDataFunction}
      clearDataFunction={clearDataFunction}
      valueField={valueField}
      textField={textField}
      disabled={disabled}
      placeholder={placeholder}
      errorMessage={errorMessage}
    />
  );
}

SfdxRuleSetSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  typeFilter: PropTypes.string,
  disabled: PropTypes.bool,
  setDataFunction: PropTypes.func,
  clearDataFunction: PropTypes.func,
  valueField: PropTypes.string,
  textField: PropTypes.string,
};

SfdxRuleSetSelectInput.defaultProps = {
  valueField: "",
  textField: "",
};

export default SfdxRuleSetSelectInput;
