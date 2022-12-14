import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import MultiSelectInputBase from "components/common/inputs/multi_select/MultiSelectInputBase";
import useComponentStateReference from "hooks/useComponentStateReference";
import { insightsLookupActions } from "components/insights/lookup/insightsLookup.actions";
import {capitalizeFirstLetter} from "../../common/helpers/string-helpers";

function LookupMultiSelectInput(
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
    const componentTypeResponse = await insightsLookupActions.getComponentTypes(getAccessToken, cancelTokenSource);
    const pipelinesResponse = await insightsLookupActions.getPipelines(getAccessToken, cancelTokenSource);
    const tasksResponse = await insightsLookupActions.getTasks(getAccessToken, cancelTokenSource);
    const orgsResponse = await insightsLookupActions.getOrgs(getAccessToken, cancelTokenSource);
    const componentNamesList = await insightsLookupActions.getComponentNames(getAccessToken, cancelTokenSource);

    const types = componentTypeResponse?.data?.data;
    const pipelines = pipelinesResponse?.data?.results;
    const tasks = tasksResponse?.data?.results;
    const orgs = orgsResponse?.data?.results;
    const names = componentNamesList?.data?.data?.componentNames;

    if (isMounted?.current === true && Array.isArray(pipelines) && Array.isArray(pipelines) && Array.isArray(tasks) && Array.isArray(orgs) && Array.isArray(types) && Array.isArray(names)) {
      const resultArray = [...types, ...pipelines, ...tasks, ...orgs, ...names];
      setSalesforceComponentNames(resultArray);
    }
  };

  return (
    <MultiSelectInputBase
      className={"px-2"}
      setDataFunction={setDataFunction}
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      selectOptions={salesforceComponentNames}
      formatDataFunction={formatDataFunction}
      clearDataFunction={clearDataFunction}
      groupBy={(filterOption) => capitalizeFirstLetter(filterOption?.type, " ", "Undefined Type")}
      textField={(data) => capitalizeFirstLetter(data["type"]) + ": " + capitalizeFirstLetter(data["name"])}
      busy={isLoading}
      valueField={valueField}
      disabled={disabled}
      error={error}
    />
  );
}

LookupMultiSelectInput.propTypes = {
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

LookupMultiSelectInput.defaultProps = {
  // valueField: "id",
  textField: "name"
};

export default LookupMultiSelectInput;