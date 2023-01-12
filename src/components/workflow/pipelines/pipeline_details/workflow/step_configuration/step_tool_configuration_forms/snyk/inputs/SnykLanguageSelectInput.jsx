import React, { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import axios from "axios";
import { AuthContext } from "contexts/AuthContext";
import toolsActions from "components/inventory/tools/tools-actions";
import snykStepActions from "../snyk-step-actions";

function SnykLanguageSelectInput({
  fieldName,
  model,
  setModel,
  disabled,
  setDataFunction,
  clearDataFunction,
  toolConfigId,
}) {
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [snykLanguageList, setSnykLanguageList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [placeholder, setPlaceholderText] = useState("Select Snyk Product");
  const isMounted = useRef(false);
  const { getAccessToken } = useContext(AuthContext);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    isMounted.current = true;
    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    setSnykLanguageList([]);

    loadData(source).catch((error) => {
      throw error;
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [toolConfigId]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await loadSnykLanguages(getAccessToken, cancelSource);
    } catch (error) {
      setPlaceholderText("Language Selection not Available");
      setErrorMessage("There was an error pulling Snyk languages");
    } finally {
      setIsLoading(false);
    }
  };

  const loadSnykLanguages = async (cancelSource = cancelTokenSource) => {
    const response = await snykStepActions.getLanguages(
      getAccessToken,
      cancelSource,
    );
    const snykLanguages = response?.data;
    setSnykLanguageList(snykLanguages);
  };

  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      selectOptions={snykLanguageList}
      busy={isLoading}
      valueField={"name"}
      textField={""}
      disabled={disabled}
      setDataFunction={setDataFunction}
      clearDataFunction={clearDataFunction}
      placeholder={placeholder}
      errorMessage={errorMessage}
    />
  );
}

SnykLanguageSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  setDataFunction: PropTypes.func,
  clearDataFunction: PropTypes.func,
  toolConfigId: PropTypes.any,
};

export default SnykLanguageSelectInput;
