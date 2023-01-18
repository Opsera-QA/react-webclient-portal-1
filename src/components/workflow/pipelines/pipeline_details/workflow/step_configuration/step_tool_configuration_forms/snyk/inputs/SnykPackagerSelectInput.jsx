import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import axios from "axios";
import {AuthContext} from "contexts/AuthContext";
import snykStepActions from "../snyk-step-actions";
import {hasStringValue} from "components/common/helpers/string-helpers";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";

function SnykPackagerSelectInput(
  {
    fieldName,
    model,
    setModel,
    disabled,
    setDataFunction,
    clearDataFunction,
    language,
  }) {
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [snykPackagerList, setSnykPackagerList] = useState([]);
  const [error, setError] = useState("");
  const isMounted = useRef(false);
  const {getAccessToken} = useContext(AuthContext);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    isMounted.current = true;
    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    setSnykPackagerList([]);

    if (hasStringValue(language)) {
      loadData(source).catch((error) => {
        throw error;
      });
    }

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [language]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await loadSnykPackagers(cancelSource);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadSnykPackagers = async (cancelSource = cancelTokenSource) => {
    const response = await snykStepActions.getPackagers(
      getAccessToken,
      cancelSource,
      language,
    );
    const packagers = DataParsingHelper.parseArray(response?.data, []);
    setSnykPackagerList(packagers);
  };

  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      selectOptions={snykPackagerList}
      busy={isLoading}
      valueField={"name"}
      textField={"name"}
      disabled={disabled}
      setDataFunction={setDataFunction}
      clearDataFunction={clearDataFunction}
      singularTopic={"Package Manager or Build Tool"}
      pluralTopic={"Package Managers or Build Tools"}
      error={error}
    />
  );
}

SnykPackagerSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  setDataFunction: PropTypes.func,
  clearDataFunction: PropTypes.func,
  version: PropTypes.any,
  language: PropTypes.string,
};

export default SnykPackagerSelectInput;
