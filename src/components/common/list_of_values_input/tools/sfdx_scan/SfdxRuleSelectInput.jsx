import React, { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import axios from "axios";
import { AuthContext } from "contexts/AuthContext";
import toolsActions from "components/inventory/tools/tools-actions";

function SfdxRuleSelectInput({
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
    "Select rule",
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

    if(typeFilter && typeFilter.length > 0) {
      loadData(source).catch((error) => {
        throw error;
      });
    }

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [typeFilter]);

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

    if (isMounted?.current === true && Array.isArray(rules)) {
      setPlaceholderText("Select Rule");

      const existingRule = model?.getData(fieldName);
      if (typeFilter) {
        let filteredJobs = rules.filter((rule) => {
          return rule.category === typeFilter;
        });

        if (
          Array.isArray(filteredJobs) &&
          existingRule != null &&
          existingRule !== ""
        ) {
          const existingRepositoryExists = rules.find(
            (rule) => rule[valueField] === existingRule,
          );

          if (existingRepositoryExists == null) {
            setErrorMessage(
              "Previously saved rule is no longer available. It may have been deleted. Please select another rule from the list.",
            );
          }
        }
        setPmdRules(filteredJobs);
      } else {
        setPmdRules([...rules]);

        if (
          Array.isArray(rules) &&
          existingRule != null &&
          existingRule !== ""
        ) {
          const existingRepositoryExists = rules.find(
            (rule) => rule[valueField] === existingRule,
          );

          if (existingRepositoryExists == null) {
            setErrorMessage(
              "Previously saved rule is no longer available. It may have been deleted. Please select another rule from the list.",
            );
          }
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

SfdxRuleSelectInput.propTypes = {
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

SfdxRuleSelectInput.defaultProps = {
  valueField: "name",
  textField: "name",
};

export default SfdxRuleSelectInput;
