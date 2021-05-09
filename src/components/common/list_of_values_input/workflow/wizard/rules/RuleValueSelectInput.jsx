import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {AuthContext} from "contexts/AuthContext";
import axios from "axios";
import adminTagsActions from "components/settings/tags/admin-tags-actions";
import {capitalizeFirstLetter} from "components/common/helpers/string-helpers";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import {Multiselect} from "react-widgets";
import MultiSelectInputBase from "components/common/inputs/select/MultiSelectInputBase";

function RuleValueMultiSelectInput({ fieldName, dataObject, ruleField, setDataObject, disabled, showLabel, className}) {
  const { getAccessToken } = useContext(AuthContext);
  const [ruleValues, setRuleValues] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [errorMessage, setErrorMessage] = useState("");

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
  }, [ruleField]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await getRuleValues(cancelSource);
    }
    catch (error) {
      if (isMounted?.current === true) {
        setErrorMessage("Could not load rule values.");
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
    const response = await adminTagsActions.getAllTagsV2(getAccessToken, cancelSource);
    let ruleValues = response?.data?.data;

    if (isMounted?.current === true && Array.isArray(ruleValues) && ruleValues.length > 0) {
      // setRuleValues(ruleValues);
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
};

export default RuleValueMultiSelectInput;