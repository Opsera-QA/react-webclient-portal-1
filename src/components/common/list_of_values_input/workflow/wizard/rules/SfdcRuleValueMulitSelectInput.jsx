import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {AuthContext} from "contexts/AuthContext";
import axios from "axios";
import MultiSelectInputBase from "components/common/inputs/select/MultiSelectInputBase";
import sfdcPipelineActions from "components/workflow/wizards/sfdc_pipeline_wizard/sfdc-pipeline-actions";

// TODO: Rename file to match
function RuleValueMultiSelectInput({ fieldName, dataObject, ruleField, setDataObject, disabled, showLabel, className, fetchAttribute, modifiedFiles, componentTypes, pipelineWizardModel}) {
  const { getAccessToken } = useContext(AuthContext);
  const [ruleValues, setRuleValues] = useState([]);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;
    setRuleValues([]);

    loadData(source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [ruleField, modifiedFiles, componentTypes]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await getRuleValues(cancelSource);
    }
    catch (error) {
      if (isMounted?.current === true) {
        setErrorMessage(`Could not load ${ruleField} values.`);
        console.error(error);
      }
    }
    finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const getRuleValues = async (cancelSource = cancelTokenSource) => {
    if (ruleField && ruleField !== "") {
      const response = await sfdcPipelineActions.getSfdcComponentListValues(getAccessToken, cancelSource, pipelineWizardModel, ruleField, fetchAttribute, componentTypes);
      const ruleValues = response?.data;

      if (isMounted?.current === true && Array.isArray(ruleValues) && ruleValues.length > 0) {
        setRuleValues(ruleValues);
      }
    }
  };

  const getPlaceholderText = () => {
    if (errorMessage) {
      return errorMessage;
    }

    return "Select Rule Values";
  };

  return (
    <MultiSelectInputBase
      showLabel={showLabel}
      className={className}
      selectOptions={[...ruleValues]}
      dataObject={dataObject}
      setDataObject={setDataObject}
      fieldName={fieldName}
      placeholderText={"Select Rule Values"}
      textField={"id"}
      valueField={"id"}
      busy={isLoading}
      placeholder={getPlaceholderText()}
      disabled={disabled || isLoading}
    />
  );
}

RuleValueMultiSelectInput.propTypes = {
  setDataObject: PropTypes.func,
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  showLabel: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  ruleField: PropTypes.string,
  fetchAttribute: PropTypes.string,
  pipelineWizardModel: PropTypes.object,
  modifiedFiles: PropTypes.array,
  componentTypes: PropTypes.array
};

RuleValueMultiSelectInput.defaultProps = {
  fieldName: "values"
};

export default RuleValueMultiSelectInput;